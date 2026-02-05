FROM nginx:alpine
# Copie le contenu de votre dossier local vers le dossier nginx du container
COPY . /usr/share/nginx/html
EXPOSE 80