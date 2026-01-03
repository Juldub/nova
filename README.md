
# 🚀 Déploiement de Nova Portfolio

Ce projet est un portfolio moderne utilisant **React 19**, **Tailwind CSS**, **Contentful CMS** et l'**IA Gemini**.

## 🛠 Étapes pour déployer sur GitHub & Vercel

### 1. Préparer votre dépôt GitHub
1. Créez un nouveau dépôt sur [GitHub](https://github.com/new).
2. Initialisez votre projet localement et poussez le code :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE_PSEUDO/NOM_DU_REPO.git
   git branch -M main
   git push -u origin main
   ```

### 2. Déployer sur Vercel (Recommandé)
1. Allez sur [Vercel](https://vercel.com) et connectez votre compte GitHub.
2. Cliquez sur **"Add New" > "Project"**.
3. Importez votre dépôt `nova-portfolio`.
4. **IMPORTANT : Configuration des variables d'environnement**
   Avant de cliquer sur "Deploy", ouvrez la section "Environment Variables" et ajoutez :
   - `API_KEY` : (Votre clé API Google Gemini)
   - `CONTENTFUL_SPACE_ID` : `bfdi7ts3hpm7`
   - `CONTENTFUL_ACCESS_TOKEN` : `t_wVy6eqS-XO4bgECJvk98nJQMy84Mzfx-KrNsQBGx0`

5. Cliquez sur **Deploy**. Votre site sera en ligne en quelques secondes !

## 📝 Rappel : Contentful
Assurez-vous d'avoir créé les types de contenu suivants dans votre espace Contentful pour que les données s'affichent :
- `project` (ID)
- `experience` (ID)
- `education` (ID)
- `blogPost` (ID)

## 🤖 Studio Créatif
Le studio utilise le modèle `gemini-2.5-flash-image` pour l'édition d'images par IA. Assurez-vous que votre clé API a les droits nécessaires.
