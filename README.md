# Prototype Vente Mobile - Application Pharmacie YZY

Prototype interactif haute-fidélité d'une application mobile de vente pour pharmacie, développé en HTML/CSS/JavaScript.

## Description

Cette application permet aux pharmaciens de gérer le processus de dispensation en :
- Renseignant les informations du patient
- Associant une ordonnance et le prescripteur correspondant
- Scannant les produits (médicaments) pour identification automatique
- Gérant la facturation et l'encaissement

## Structure du Projet

```
prototype-vente-mobile/
├── index.html          # Structure HTML principale avec tous les écrans
├── styles.css          # Styles CSS fidèles aux designs
├── script.js           # Interactions et animations JavaScript
├── screenshots/        # Captures d'écran de référence (14 écrans)
└── README.md          # Ce fichier
```

## Écrans Implémentés

1. **Splash Screen** - Écran de démarrage (2 secondes)
2. **Écran de Connexion** - Page d'accueil avec bouton de connexion
3. **Connexion** - Formulaire d'authentification
4. **Accueil Vente** - Page principale avec tuiles Patient/Prescripteur/Ordonnance
5. **Renseigner Patient** - Bottom sheet avec options (Carte vitale, App mobile, Recherche, Créer)
6. **Vente avec Patient** - Accueil avec patient renseigné
7. **Vente avec Produits** - Vue complète avec patient, prescripteur et produits
8. **Détail Patient** - Modal avec informations complètes du patient
9. **Détail Produit** - Modal avec informations du produit
10. **Menu Actions** - Bottom sheet avec actions disponibles
11. **Facturation** - Page de création FSE
12. **Encaissement** - Gestion des moyens de paiement
13. **Paiement** - Modal de saisie de paiement
14. **Impression** - Options d'impression de facture/ticket

## Installation et Utilisation

### Sur Ordinateur

1. Ouvrez le fichier `index.html` dans un navigateur web moderne (Chrome, Firefox, Safari, Edge)
2. Appuyez sur `F12` pour ouvrir les outils de développement
3. Activez le mode "Device Toolbar" ou "Responsive Design Mode"
4. Sélectionnez un appareil mobile (iPhone, Samsung Galaxy, etc.) ou utilisez les dimensions personnalisées (375x667 recommandé)

### Sur Smartphone (Méthode Recommandée)

#### Option 1 : Serveur Local
1. Installez Python si ce n'est pas déjà fait
2. Ouvrez un terminal dans le dossier du projet
3. Lancez un serveur HTTP local :
   ```bash
   # Python 3
   python -m http.server 8000

   # Ou Python 2
   python -m SimpleHTTPServer 8000
   ```
4. Trouvez l'adresse IP de votre ordinateur :
   - Windows : `ipconfig` dans CMD
   - Mac/Linux : `ifconfig` dans Terminal
5. Sur votre smartphone, ouvrez le navigateur et accédez à : `http://[VOTRE_IP]:8000`

#### Option 2 : Hébergement Web
1. Uploadez les fichiers sur un service d'hébergement gratuit :
   - GitHub Pages
   - Netlify
   - Vercel
2. Accédez à l'URL fournie depuis votre smartphone

#### Option 3 : Transfert Direct (moins pratique)
1. Transférez les fichiers sur votre smartphone
2. Utilisez une application de navigateur de fichiers pour ouvrir `index.html`

## Navigation dans le Prototype

### Parcours Principal

1. **Démarrage** : Le splash screen s'affiche pendant 2 secondes
2. **Bienvenue** : Cliquez sur "CONNECTEZ VOUS"
3. **Connexion** : Cliquez sur "Connexion" (identifiants pré-remplis)
4. **Accueil Vente** :
   - Cliquez sur la tuile "Patient" → Bottom sheet → "Carte vitale" → Patient renseigné
   - Cliquez sur la tuile "Prescripteur" → Bottom sheet → "Carte vitale" → Prescripteur renseigné
   - Les produits s'affichent automatiquement
5. **Actions** :
   - Cliquez sur un produit pour voir le détail
   - Utilisez +/- pour ajuster les quantités
   - Cliquez sur "ACTIONS" → "Créer FSE"
6. **Facturation** : Cliquez sur "FACTURER"
7. **Encaissement** :
   - Cliquez sur un moyen de paiement (Carte Bancaire, Espèces, Chèque)
   - Saisissez le montant
   - Cliquez sur "Ajouter"
   - Cliquez sur "ENCAISSER"
8. **Impression** :
   - Activez/désactivez les options d'impression
   - Cliquez sur "VALIDER" → Retour à l'accueil vente

### Interactions Disponibles

- **Tuile Patient** (quand renseigné) : Options "Voir la fiche" ou "Modifier"
- **Bottom Sheets** : Glissement du bas vers le haut, cliquez en dehors pour fermer
- **Modals** : Cliquez sur × pour fermer
- **Quantités Produits** : Boutons + et - pour ajuster
- **Recherche** : Barre de recherche en haut (interface seulement)

## Fonctionnalités

### Animations
- Transition du splash screen (2s)
- Bottom sheets avec animation slide-up
- Transitions fluides entre écrans
- Retour haptique simulé sur mobile

### Responsive Design
- Optimisé pour mobile (320px - 500px de largeur)
- Adaptation automatique à la taille de l'écran
- Support du portrait mode

### Interactivité
- Navigation complète entre tous les écrans
- Gestion des modales et bottom sheets
- Overlay avec fermeture au clic extérieur
- Simulation de clavier sur écran de paiement

## Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** :
  - Flexbox pour les layouts
  - Animations et transitions
  - Variables CSS pour la cohérence des couleurs
- **JavaScript Vanilla** :
  - Gestion d'état simple
  - Navigation entre écrans
  - Événements et interactions
  - Pas de dépendances externes

## Palette de Couleurs

- **Violet Principal** : `#5D3FD3`
- **Violet Foncé** : `#4A3099`
- **Gris Clair** : `#F5F5F7`
- **Blanc** : `#FFFFFF`
- **Vert Succès** : `#4CAF50`
- **Rouge Alerte** : `#D32F2F`

## Compatibilité

### Navigateurs
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Opera 76+

### Appareils
- iPhone (iOS 14+)
- Android (Chrome 90+)
- Testé sur résolutions 320px à 500px de largeur

## Améliorations Futures Possibles

- [ ] Ajout d'un service worker pour le mode offline
- [ ] Intégration API réelle pour les données
- [ ] Scanner de code-barres via caméra
- [ ] Scan de carte vitale
- [ ] Signature électronique
- [ ] Impression réelle via impression mobile
- [ ] Synchronisation cloud
- [ ] Multi-langues
- [ ] Mode sombre

## Limitations du Prototype

- Données statiques (pas de backend)
- Scanner simulé (pas d'accès caméra réel)
- Pas de stockage persistant
- Pas de validation de formulaires avancée
- Pas de gestion d'erreurs réseau

## Licence

Prototype à usage démonstratif uniquement.

## Contact

Pour toute question ou amélioration, veuillez contacter l'équipe de développement.

---

**Note** : Ce prototype est une démonstration visuelle et interactive. Pour une utilisation en production, il nécessiterait une intégration backend complète, des mesures de sécurité renforcées, et une conformité RGPD pour les données de santé.
