#!/bin/sh
# Quitte immédiatement si une commande échoue
set -e

echo "Appliquant les migrations de la base de données..."
python manage.py migrate --noinput || { echo "Erreur lors de l'application des migrations"; exit 1; }

echo "Vérification/Création du superutilisateur..."
python manage.py shell <<EOF
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if not all([username, email, password]):
    print("ERROR: DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, and DJANGO_SUPERUSER_PASSWORD must be set in .env.dev")
    exit(1)

if not User.objects.filter(username=username).exists():
   User.objects.create_superuser(username, email, password)
   print(f"Superutilisateur '{username}' créé.")
else:
   print(f"Superutilisateur '{username}' déjà existant.")
EOF

echo "Lancement du serveur de développement Django..."
# 'exec' est important : il remplace le processus du shell par celui de Django.
# Cela permet à Docker de gérer correctement les signaux (comme l'arrêt du conteneur).
exec python manage.py runserver 0.0.0.0:8000
