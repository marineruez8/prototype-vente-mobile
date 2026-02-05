# Guide de Démarrage Rapide

## Test Immédiat sur Smartphone

### Méthode la Plus Simple (5 minutes)

1. **Installez Python** (si pas déjà installé) :
   - Windows : Téléchargez depuis [python.org](https://www.python.org/downloads/)
   - Mac : Python est déjà installé

2. **Ouvrez un terminal/CMD** dans ce dossier :
   - Windows : Clic droit sur le dossier → "Ouvrir dans Terminal"
   - Mac : Clic droit → "Nouveau terminal à cet emplacement"

3. **Lancez le serveur** :
   ```bash
   python -m http.server 8000
   ```
   Vous verrez : `Serving HTTP on 0.0.0.0 port 8000 ...`

4. **Trouvez votre IP** :
   - Windows : Dans un nouveau CMD, tapez `ipconfig` → cherchez "Adresse IPv4"
   - Mac : Dans Terminal, tapez `ifconfig | grep "inet "` → cherchez une IP comme 192.168.x.x

5. **Sur votre smartphone** :
   - Connectez-vous au **même WiFi** que votre ordinateur
   - Ouvrez votre navigateur (Chrome, Safari, etc.)
   - Allez à : `http://[VOTRE_IP]:8000`
   - Exemple : `http://192.168.1.45:8000`

6. **C'est parti !** 🎉
   - L'application démarre avec le splash screen
   - Suivez le parcours naturellement

---

## Parcours de Test Recommandé

### Scénario 1 : Vente Complète (5 min)

1. ✅ Attendez le splash screen (2s)
2. ✅ Cliquez "CONNECTEZ VOUS"
3. ✅ Cliquez "Connexion"
4. ✅ Cliquez sur tuile "Patient" → "Carte vitale"
5. ✅ Cliquez sur tuile "Prescripteur" → "Carte vitale"
6. ✅ Testez +/- sur les produits
7. ✅ Cliquez sur un produit pour voir les détails
8. ✅ Bouton "ACTIONS" → "Créer FSE"
9. ✅ Bouton "FACTURER"
10. ✅ Cliquez "Carte Bancaire" → Saisissez montant → "Ajouter"
11. ✅ Cliquez "Espèces" → Saisissez montant → "Ajouter"
12. ✅ Bouton "ENCAISSER"
13. ✅ Activez "Facture" → Bouton "VALIDER"

### Scénario 2 : Exploration des Détails (3 min)

1. ✅ Accédez à la page de vente avec patient
2. ✅ Cliquez sur la tuile patient renseigné
3. ✅ Choisissez "Voir la fiche patient"
4. ✅ Explorez toutes les informations
5. ✅ Fermez avec ×
6. ✅ Cliquez sur un produit
7. ✅ Consultez les détails du produit

---

## Astuces de Test

### Sur Mobile
- 📱 Ajoutez à l'écran d'accueil pour une expérience app-like
- 🔄 Testez l'orientation portrait (recommandé)
- 👆 Les animations de bottom sheet sont tactiles

### Sur Desktop
- 🖥️ Ouvrez Chrome DevTools (F12)
- 📱 Mode "Toggle Device Toolbar" (Ctrl+Shift+M)
- 📏 Résolution recommandée : 375 x 667 (iPhone SE)

### Navigation
- 🔙 Cliquez en dehors des bottom sheets pour les fermer
- ❌ Bouton × pour fermer les modales
- ⬅️ Flèches retour dans les headers

---

## Dépannage Rapide

### "Je ne peux pas me connecter depuis mon smartphone"
- ✅ Vérifiez que smartphone ET ordinateur sont sur le **même WiFi**
- ✅ Désactivez temporairement le pare-feu Windows
- ✅ Essayez http://localhost:8000 si vous testez sur le même appareil

### "Le serveur ne démarre pas"
- ✅ Vérifiez que Python est bien installé : `python --version`
- ✅ Le port 8000 est peut-être utilisé, essayez 8001 : `python -m http.server 8001`
- ✅ Assurez-vous d'être dans le bon dossier

### "L'application ne s'affiche pas correctement"
- ✅ Utilisez un navigateur moderne (Chrome, Safari, Firefox)
- ✅ Videz le cache (Ctrl+Shift+R ou Cmd+Shift+R)
- ✅ Vérifiez que tous les fichiers sont présents (index.html, styles.css, script.js)

---

## Raccourcis Clavier (Debug)

Ouvrez la console (F12) et tapez :

```javascript
// Aller directement à un écran
showScreen('home-with-products-screen')

// Afficher l'état actuel
debugApp()

// Ouvrir un bottom sheet
showBottomSheet('patient-sheet')

// Afficher le détail patient
showPatientDetail()
```

---

## Alternative : GitHub Pages (Hébergement Gratuit)

Si vous avez Git installé :

```bash
# 1. Initialisez le repo
git init
git add .
git commit -m "Initial prototype"

# 2. Créez un repo sur GitHub

# 3. Liez et poussez
git remote add origin https://github.com/VOTRE_USERNAME/prototype-vente.git
git branch -M main
git push -u origin main

# 4. Activez GitHub Pages dans les paramètres du repo
# Settings → Pages → Source: main branch → Save

# 5. Accédez à : https://VOTRE_USERNAME.github.io/prototype-vente
```

---

## Support

Pour toute question :
1. Vérifiez le [README.md](README.md) complet
2. Consultez les commentaires dans le code
3. Ouvrez la console navigateur (F12) pour les erreurs

---

**Bon test ! 🚀**
