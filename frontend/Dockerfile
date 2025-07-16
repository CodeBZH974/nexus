# Étape 1: Utiliser une image Node.js officielle comme base
# 'lts-alpine' est une version légère et stable, parfaite pour le développement
FROM node:lts-alpine

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3: Copier les fichiers de dépendances et installer
# On copie d'abord package.json pour profiter de la mise en cache de Docker
COPY package*.json ./
RUN npm install

# Étape 4: Copier le reste du code de l'application
COPY . .

# Étape 5: Exposer le port par défaut de Vite
EXPOSE 5173

# Étape 6: Définir la commande pour lancer le serveur de développement
CMD ["npm", "run", "dev"]