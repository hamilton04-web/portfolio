# Amon Hamilton — Portfolio

Portfolio personnel statique réalisé en HTML, CSS et JavaScript vanilla.

## Tester le site

Ouvre `index.html` dans un navigateur. Sur la page Contact, renseigne les champs puis clique sur **Continuer sur WhatsApp**. WhatsApp s’ouvre avec le message, ton nom, ton adresse et le sujet préremplis. Le visiteur doit relire le message et appuyer sur Envoyer dans WhatsApp.

Le site n’envoie ni ne stocke de messages lui-même. Il n’y a pas de serveur ni de secrets dans le code.

## Publier sur GitHub Pages

1. Crée un dépôt GitHub et ajoute les fichiers du portfolio à sa racine.
2. Dans le dépôt, ouvre **Settings → Pages**.
3. Sous **Build and deployment**, choisis **Deploy from a branch**, la branche `main` et le dossier `/ (root)`, puis enregistre.
4. Attends la fin du déploiement affiché dans l’onglet **Actions**, puis ouvre l’adresse fournie dans **Settings → Pages**.
5. Vérifie les six pages, le menu sur mobile, les images de projet et le formulaire sur l’adresse publiée en HTTPS.

GitHub Pages ne sait pas exécuter PHP ni envoyer des messages côté serveur. Le formulaire prépare donc une conversation WhatsApp directement avec ton numéro ; l’envoi final reste effectué par le visiteur dans WhatsApp.

## Captures de projets

Remplace les fichiers PNG transparents déjà présents dans `images/projets/` par tes captures, en gardant ces noms : `portfolio.png`, `application-gestion.png` et `future-fullstack.png`. Les aperçus restent neutres tant qu’une vraie capture n’a pas remplacé le fichier. Après remplacement, actualise la page ; si l’ancienne image reste en cache, fais un rechargement forcé avec `Ctrl+F5`.

## Protections statiques

Les pages limitent les sources de scripts, styles et images à ce site via une politique CSP, valident et plafonnent les champs du formulaire, et n’intègrent aucun script tiers. GitHub Pages ne permet pas de définir ici les en-têtes HTTP de sécurité complets ; cette politique HTML n’est donc pas un remplacement d’en-têtes configurés côté serveur.
