
# 🚀 Nova Portfolio - Guide de Maintenance

Félicitations ! Votre portfolio est prêt pour le déploiement.

## 🌍 Mise en ligne (Vercel)

Votre code est actuellement sur GitHub. Pour le rendre accessible :
1. Importez ce repo sur [Vercel](https://vercel.com).
2. Configurez les **Environment Variables** dans les réglages du projet Vercel :
   - `API_KEY` : Votre clé Gemini. Obtenez-la gratuitement sur **[Google AI Studio](https://aistudio.google.com/)**.
   - `CONTENTFUL_SPACE_ID` : `bfdi7ts3hpm7`
   - `CONTENTFUL_ACCESS_TOKEN` : `t_wVy6eqS-XO4bgECJvk98nJQMy84Mzfx-KrNsQBGx0`

## 🛠 Maintenance du contenu (Contentful)

Pour modifier vos projets, expériences ou articles de blog sans toucher au code :
1. Connectez-vous à votre espace [Contentful](https://app.contentful.com).
2. Allez dans l'onglet **"Content"**.
3. Modifiez ou ajoutez des entrées pour :
   - **Project** : Titre, description, tags, image.
   - **Experience** : Entreprise, rôle, période.
   - **BlogPost** : Titre, contenu, date, catégorie.
4. Cliquez sur **Publish**. Les changements apparaîtront instantanément sur votre site.

## 🤖 Studio Créatif
Le Creative Studio utilise l'IA de Google (Gemini 2.5 Flash Image) pour transformer vos photos. 
- **Prompt conseillé** : "Ajoute un style futuriste", "Transforme en peinture à l'huile", "Ajoute des néons".

## 📦 Mise à jour du code
Pour mettre à jour le design :
1. Modifiez les fichiers localement.
2. Envoyez les changements :
   ```bash
   git add .
   git commit -m "Mise à jour du design"
   git push origin main
   ```
3. Vercel déploiera la nouvelle version automatiquement.
