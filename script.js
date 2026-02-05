// Global state
let currentScreen = 'welcome-screen';
let currentBottomSheet = null;

// State for sale information
let saleState = {
    hasPatient: false,
    hasPrescriber: false,
    hasPrescription: false,
    hasProducts: false
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome screen directly (no splash screen)
    showScreen('welcome-screen');

    // Initialize tiles display when navigating to home screens
    // This ensures the display always reflects the current state
});

// Screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;

        // Update Créer FSE option state
        updateCreerFSEState();

        // Update tiles when showing any home screen to ensure independence
        const homeScreens = ['home-screen', 'home-with-patient-screen', 'home-with-prescriber-screen',
                             'home-with-prescription-screen', 'home-with-products-screen'];
        if (homeScreens.includes(screenId)) {
            updateTilesDisplay();
        }
    }
}

// Bottom sheet management
function showBottomSheet(sheetId) {
    const sheet = document.getElementById(sheetId);
    const overlay = document.getElementById('overlay');

    if (sheet && overlay) {
        overlay.classList.add('active');
        sheet.classList.add('active');
        currentBottomSheet = sheetId;
    }
}

function hideBottomSheet() {
    const overlay = document.getElementById('overlay');

    if (currentBottomSheet) {
        const sheet = document.getElementById(currentBottomSheet);
        if (sheet) {
            sheet.classList.remove('active');
        }
    }

    if (overlay) {
        overlay.classList.remove('active');
    }

    currentBottomSheet = null;
}

// Login function
function login(event) {
    event.preventDefault();
    showScreen('home-screen');
}

// Patient detail modal
function showPatientDetail() {
    hideBottomSheet();
    setTimeout(() => {
        const modal = document.getElementById('patient-detail-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }, 300);
}

function hidePatientDetail() {
    const modal = document.getElementById('patient-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Prescriber detail modal
function showPrescriberDetail() {
    hideBottomSheet();
    const modal = document.getElementById('prescriber-detail-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function hidePrescriberDetail() {
    const modal = document.getElementById('prescriber-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Product detail modal
function showProductDetail(name, price, stock, quantity, code) {
    const modal = document.getElementById('product-detail-modal');
    if (modal) {
        // Update modal content
        document.getElementById('product-detail-name').textContent = name || 'DOLIPRANE 1000MG CPR';
        document.getElementById('product-detail-subtitle').textContent = `${price || '50€'} | ${stock || '5 en stock'} | ${quantity || '5'} en quantité`;
        document.getElementById('product-detail-designation').textContent = name || 'DOLIPRANE 1000MG CPR';
        document.getElementById('product-detail-code').textContent = code || '3287634103889';
        document.getElementById('product-detail-price').textContent = price || '1,36€';

        modal.classList.add('active');
    }
}

function hideProductDetail() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Payment modal
let currentPaymentMethod = '';
let currentPaymentType = '';

function showPaymentModal(method, type) {
    currentPaymentMethod = method;
    currentPaymentType = type;

    const modal = document.getElementById('payment-modal');
    const title = document.getElementById('payment-modal-title');
    const input = document.getElementById('payment-amount-input');
    const icon = document.getElementById('payment-modal-icon');

    if (modal && title && input && icon) {
        title.textContent = `Paiement par ${method.toLowerCase()}`;
        input.value = '0€';

        // Update icon based on payment type
        const iconMap = {
            'cb': 'credit_card.svg',
            'especes': 'payments.svg',
            'cheque': 'universal.svg'
        };

        if (iconMap[type]) {
            icon.src = `images/${iconMap[type]}`;
        }

        modal.classList.add('active');
    }
}

function hidePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function addPayment() {
    const input = document.getElementById('payment-amount-input');
    if (!input || !currentPaymentType) {
        hidePaymentModal();
        return;
    }

    // Get the entered value
    let value = input.value.trim();

    // Parse the numeric value
    let numericValue = parseFloat(value.replace('€', '').replace(',', '.').trim());

    // Update the payment value element
    const paymentValueElement = document.getElementById(`payment-${currentPaymentType}`);
    if (paymentValueElement && !isNaN(numericValue)) {
        paymentValueElement.textContent = `${numericValue.toFixed(2).replace('.', ',')} €`;

        // Update the icon based on value
        const iconElement = document.getElementById(`icon-${currentPaymentType}`);
        if (iconElement) {
            const iconMap = {
                'cb': numericValue > 0 ? 'credit_card_couleur.svg' : 'credit_card.svg',
                'especes': numericValue > 0 ? 'payments_couleur.svg' : 'payments.svg',
                'cheque': numericValue > 0 ? 'universal_couleur.svg' : 'universal.svg'
            };

            if (iconMap[currentPaymentType]) {
                iconElement.src = `images/${iconMap[currentPaymentType]}`;
            }
        }

        // Update remaining amount
        updateRemainingAmount();
    }

    hidePaymentModal();
}

// Calculate and update remaining amount
function updateRemainingAmount() {
    // Get total patient amount
    const totalPatientElement = document.getElementById('total-patient');
    if (!totalPatientElement) return;

    const totalPatient = parseFloat(totalPatientElement.textContent.replace('€', '').replace(',', '.').trim());

    // Calculate sum of all payments
    let totalPaid = 0;
    ['cb', 'especes', 'cheque'].forEach(type => {
        const paymentElement = document.getElementById(`payment-${type}`);
        if (paymentElement) {
            const amount = parseFloat(paymentElement.textContent.replace('€', '').replace(',', '.').trim());
            if (!isNaN(amount)) {
                totalPaid += amount;
            }
        }
    });

    // Calculate remaining
    const remaining = totalPatient - totalPaid;

    // Update display
    const resteAPayerElement = document.getElementById('reste-a-payer');
    const resteAPayerRow = document.getElementById('reste-a-payer-row');

    if (resteAPayerElement && resteAPayerRow) {
        if (totalPaid > 0) {
            resteAPayerElement.textContent = `${remaining.toFixed(2).replace('.', ',')} €`;
            resteAPayerRow.style.display = 'flex';
        } else {
            resteAPayerRow.style.display = 'none';
        }
    }
}

// Keyboard functionality (basic implementation)
document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', (e) => {
            const input = document.getElementById('payment-amount-input');
            if (!input) return;

            const keyText = e.target.textContent;

            if (keyText === '⌫') {
                // Backspace
                input.value = input.value.slice(0, -1);
            } else if (keyText === 'return') {
                // Return/Enter
                addPayment();
            } else if (keyText !== '⇧' && keyText !== '🌐' && keyText !== '🎤' && keyText !== '123') {
                // Regular keys
                if (keyText === 'space') {
                    input.value += ' ';
                } else {
                    input.value += keyText;
                }
            }
        });
    });
});

// Product quantity controls
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('qty-btn')) {
        const qtyValue = e.target.parentElement.querySelector('.qty-value');
        if (!qtyValue) return;

        const currentQty = parseInt(qtyValue.textContent);

        if (e.target.textContent === '+') {
            qtyValue.textContent = currentQty + 1;
        } else if (e.target.textContent === '-' && currentQty > 0) {
            qtyValue.textContent = currentQty - 1;
        }
    }
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const patientModal = document.getElementById('patient-detail-modal');
    const productModal = document.getElementById('product-detail-modal');
    const paymentModal = document.getElementById('payment-modal');

    if (e.target === patientModal) {
        hidePatientDetail();
    }
    if (e.target === productModal) {
        hideProductDetail();
    }
    if (e.target === paymentModal) {
        hidePaymentModal();
    }
});

// Prevent default form submission
document.addEventListener('submit', (e) => {
    e.preventDefault();
});

// Toggle functionality for print options
document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.closest('.print-option')) {
        console.log('Toggle changed:', e.target.checked);
    }
});

// Simulate scanning functionality
function simulateScan() {
    console.log('Scanning...');
    // In a real app, this would trigger the camera or barcode scanner
}

// Navigation functions for easy access
window.showScreen = showScreen;
window.showBottomSheet = showBottomSheet;
window.hideBottomSheet = hideBottomSheet;
window.login = login;
window.showPatientDetail = showPatientDetail;
window.hidePatientDetail = hidePatientDetail;
window.showProductDetail = showProductDetail;
window.hideProductDetail = hideProductDetail;
window.showPaymentModal = showPaymentModal;
window.hidePaymentModal = hidePaymentModal;
window.addPayment = addPayment;
window.simulateScan = simulateScan;

// PWA-like features for mobile
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration could go here for offline support
    });
}

// Prevent pull-to-refresh on mobile (but allow normal scrolling)
let touchStartY = 0;
let touchStartElement = null;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartElement = e.target;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const touchYDelta = touchY - touchStartY;

    // Only prevent pull-to-refresh when at the top of the page
    // Check if we're inside a scrollable container
    const scrollableParent = e.target.closest('.content, .modal-body, .bottom-sheet, .scrollable, .payment-content');

    if (scrollableParent) {
        // Allow normal scrolling inside scrollable containers
        // Only block if container is at top AND user is pulling down
        if (touchYDelta > 0 && scrollableParent.scrollTop === 0) {
            e.preventDefault();
        }
    } else if (touchYDelta > 0 && window.scrollY === 0) {
        // Fallback for elements outside scrollable containers
        e.preventDefault();
    }
}, { passive: false });

// Orientation lock suggestion (can't actually lock without fullscreen API)
window.addEventListener('orientationchange', () => {
    // Alert user if they switch to landscape
    if (window.orientation === 90 || window.orientation === -90) {
        console.log('App works best in portrait mode');
    }
});

// Haptic feedback simulation
function vibrate(duration = 10) {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

// Add vibration feedback to buttons
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('tile') || e.target.classList.contains('sheet-option')) {
        vibrate(10);
    }
});

// Handle back button on Android (if running as PWA)
window.addEventListener('popstate', (e) => {
    if (currentBottomSheet) {
        hideBottomSheet();
        e.preventDefault();
    } else if (document.querySelector('.modal.active')) {
        hidePatientDetail();
        hidePrescriberDetail();
        hideProductDetail();
        hidePaymentModal();
        e.preventDefault();
    }
});

// Update Créer FSE option state based on sale state
function updateCreerFSEState() {
    const creerFSEOption = document.getElementById('creer-fse-option');
    if (!creerFSEOption) return;

    // Enable only when all information is filled
    if (saleState.hasPatient && saleState.hasPrescriber && saleState.hasPrescription && saleState.hasProducts) {
        creerFSEOption.classList.remove('disabled');
    } else {
        creerFSEOption.classList.add('disabled');
    }
}

// Handle Créer FSE click
function handleCreerFSE() {
    const creerFSEOption = document.getElementById('creer-fse-option');

    // Only proceed if not disabled
    if (!creerFSEOption.classList.contains('disabled')) {
        hideBottomSheet();
        setTimeout(() => showScreen('facturation-screen'), 300);
    }
}

// Product quantity management
function changeQuantity(productId, change) {
    const qtyElement = document.getElementById(productId);
    if (qtyElement) {
        let currentQty = parseInt(qtyElement.textContent);
        let newQty = currentQty + change;

        // Don't allow quantity to go below 0
        if (newQty < 0) {
            newQty = 0;
        }

        qtyElement.textContent = newQty;
    }
}

// Functions to update sale state
function setPatient(hasPatient) {
    saleState.hasPatient = hasPatient;
    updateHomeScreen();
    updateCreerFSEState();
}

function setPrescriber(hasPrescriber) {
    saleState.hasPrescriber = hasPrescriber;
    updateHomeScreen();
    updateCreerFSEState();
}

function setPrescription(hasPrescription) {
    saleState.hasPrescription = hasPrescription;
    updateHomeScreen();
    updateCreerFSEState();
}

function setProducts(hasProducts) {
    saleState.hasProducts = hasProducts;
    updateHomeScreen();
    updateCreerFSEState();
}

// Reset all sale state - used when completing a sale or canceling
function resetSaleState() {
    saleState.hasPatient = false;
    saleState.hasPrescriber = false;
    saleState.hasPrescription = false;
    saleState.hasProducts = false;
    updateHomeScreen();
    updateCreerFSEState();
}

// Update home screen based on state
function updateHomeScreen() {
    // Use only 2 screens: home-screen (without products) and home-with-products-screen (with products)
    let targetScreen = saleState.hasProducts ? 'home-with-products-screen' : 'home-screen';

    // Define all home screens
    const currentHomeScreens = ['home-screen', 'home-with-patient-screen', 'home-with-prescriber-screen',
                                 'home-with-prescription-screen', 'home-with-products-screen'];

    // Only switch screens if we're currently on a home screen
    if (currentHomeScreens.includes(currentScreen)) {
        showScreen(targetScreen);
    }

    // Update all tiles based on current state - this ensures independence
    updateTilesDisplay();
}

// Update tiles display based on current state
function updateTilesDisplay() {
    const currentScreenElement = document.querySelector('.screen.active');
    if (!currentScreenElement) return;

    // Update patient tiles
    const patientTiles = currentScreenElement.querySelectorAll('[data-tile="patient"]');
    patientTiles.forEach(tile => {
        if (saleState.hasPatient) {
            tile.classList.add('tile-filled');
            tile.classList.remove('tile-empty');
            const icon = tile.querySelector('.tile-icon img');
            if (icon) icon.src = 'images/patient couleur.svg';
            const title = tile.querySelector('.tile-title');
            if (title) title.textContent = 'Pauline NORAB';
            const subtitle = tile.querySelector('.tile-subtitle');
            if (subtitle) subtitle.innerHTML = '25 ans | Femme <img src="images/ADRI.png" alt="ADRI" class="adri-icon">';
            const action = tile.querySelector('.tile-action');
            if (action) action.style.display = 'none';
            // When filled, clicking opens options sheet
            tile.onclick = () => showBottomSheet('patient-options-sheet');
        } else {
            tile.classList.remove('tile-filled');
            tile.classList.add('tile-empty');
            const icon = tile.querySelector('.tile-icon img');
            if (icon) icon.src = 'images/patient.svg';
            const title = tile.querySelector('.tile-title');
            if (title) title.textContent = 'Patient';
            const subtitle = tile.querySelector('.tile-subtitle');
            if (subtitle) subtitle.textContent = 'Ajouter ou rechercher un patient';
            const action = tile.querySelector('.tile-action');
            if (action) action.style.display = 'block';
            // When empty, clicking opens add patient sheet
            tile.onclick = () => showBottomSheet('patient-sheet');
        }
    });

    // Update prescriber tiles
    const prescriberTiles = currentScreenElement.querySelectorAll('[data-tile="prescriber"]');
    prescriberTiles.forEach(tile => {
        if (saleState.hasPrescriber) {
            tile.classList.add('tile-filled');
            tile.classList.remove('tile-empty');
            const icon = tile.querySelector('.tile-icon img');
            if (icon) icon.src = 'images/prescripteur couleur.svg';
            const title = tile.querySelector('.tile-title');
            if (title) title.textContent = 'Jean-Pierre MALAUSSENA';
            const subtitle = tile.querySelector('.tile-subtitle');
            if (subtitle) subtitle.textContent = 'Médecin généraliste';
            const action = tile.querySelector('.tile-action');
            if (action) action.style.display = 'none';
            // When filled, clicking opens prescriber options sheet
            tile.onclick = () => showBottomSheet('prescripteur-options-sheet');
        } else {
            tile.classList.remove('tile-filled');
            tile.classList.add('tile-empty');
            const icon = tile.querySelector('.tile-icon img');
            if (icon) icon.src = 'images/prescripteur.svg';
            const title = tile.querySelector('.tile-title');
            if (title) title.textContent = 'Prescripteur';
            const subtitle = tile.querySelector('.tile-subtitle');
            if (subtitle) subtitle.textContent = 'Ajouter un médecin prescripteur';
            const action = tile.querySelector('.tile-action');
            if (action) action.style.display = 'block';
            // When empty, clicking adds prescriber
            tile.onclick = () => setPrescriber(true);
        }
    });

    // Update prescription tiles
    const prescriptionTiles = currentScreenElement.querySelectorAll('[data-tile="prescription"]');
    prescriptionTiles.forEach(tile => {
        if (saleState.hasPrescription) {
            tile.classList.add('tile-filled');
            tile.classList.remove('tile-empty');
            const icon = tile.querySelector('.tile-icon img');
            if (icon) icon.src = 'images/ordonannce couleur.svg';
            const title = tile.querySelector('.tile-title');
            if (title) title.textContent = 'Ordonnance numérique';
            const subtitle = tile.querySelector('.tile-subtitle');
            if (subtitle) subtitle.textContent = '07/11/2025 | 54120123';
            const action = tile.querySelector('.tile-action');
            if (action) action.style.display = 'none';
            // When filled, clicking opens ordonnance options sheet
            tile.onclick = () => showBottomSheet('ordonnance-options-sheet');
        } else {
            tile.classList.remove('tile-filled');
            tile.classList.add('tile-empty');
            const icon = tile.querySelector('.tile-icon img');
            if (icon) icon.src = 'images/ordonance.svg';
            const title = tile.querySelector('.tile-title');
            if (title) title.textContent = 'Ordonnance';
            const subtitle = tile.querySelector('.tile-subtitle');
            if (subtitle) subtitle.textContent = 'Scanner une ordonnance';
            const action = tile.querySelector('.tile-action');
            if (action) action.style.display = 'block';
            // When empty, clicking adds prescription
            tile.onclick = () => setPrescription(true);
        }
    });
}

// Toggle print option icons
function togglePrintIcon(type, isChecked) {
    const iconElement = document.getElementById(`icon-${type}`);
    const imgElement = iconElement?.querySelector('img');

    if (!iconElement || !imgElement) return;

    // Icon mapping
    const iconMap = {
        'ticket': {
            unchecked: 'receip.svg',
            checked: 'receipt_color.svg'
        },
        'facture': {
            unchecked: 'receipt_long.svg',
            checked: 'receipt_long_color.svg'
        },
        'print': {
            unchecked: 'print.svg',
            checked: 'print_color.svg'
        },
        'email': {
            unchecked: 'alternate_email.svg',
            checked: 'alternate_email_couleur.svg'
        }
    };

    if (iconMap[type]) {
        // Update icon source
        imgElement.src = `images/${isChecked ? iconMap[type].checked : iconMap[type].unchecked}`;

        // Toggle active class for background color
        if (isChecked) {
            iconElement.classList.add('active');
        } else {
            iconElement.classList.remove('active');
        }
    }
}

// Export functions
window.togglePrintIcon = togglePrintIcon;
window.setPatient = setPatient;
window.setPrescriber = setPrescriber;
window.setPrescription = setPrescription;
window.setProducts = setProducts;
window.resetSaleState = resetSaleState;
window.showPrescriberDetail = showPrescriberDetail;
window.hidePrescriberDetail = hidePrescriberDetail;

// Debug helper
window.debugApp = () => {
    console.log('Current Screen:', currentScreen);
    console.log('Current Bottom Sheet:', currentBottomSheet);
    console.log('Sale State:', saleState);
};
