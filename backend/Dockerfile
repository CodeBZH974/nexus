# 1. Utiliser une image Python officielle comme image de base
# python:3.11-slim est une version légère et optimisée
FROM python:3.11-slim

# 2. Définir des variables d'environnement
# Empêche Python de mettre en mémoire tampon les sorties, ce qui facilite le débogage dans les logs Docker
ENV PYTHONUNBUFFERED 1

# 3. Définir le répertoire de travail dans le conteneur
WORKDIR /app

# 4. Copier et installer les dépendances
# On copie d'abord requirements.txt pour profiter de la mise en cache de Docker.
# Docker ne réinstallera les dépendances que si ce fichier change.
COPY requirements.txt .
RUN pip install -r requirements.txt

# 5. Copier le reste du code de l'application
COPY . .