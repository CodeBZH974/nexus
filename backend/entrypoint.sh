#!/bin/sh

# Quitte immédiatement si une commande échoue
set -e

echo "Appliquant les migrations de la base de données..."
python manage.py migrate --noinput

echo "Lancement du serveur de développement Django..."
# 'exec' est important : il remplace le processus du shell par celui de Django.
# Cela permet à Docker de gérer correctement les signaux (comme l'arrêt du conteneur).
exec python manage.py runserver 0.0.0.0:8000