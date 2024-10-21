# Architecture de l'application :
• ./models : Déclaration de nos classes utiles 
• ./services : Fonctions d'échange avec la base de données 
• ./controllers : Appel des fonctions de ./services, déclaration des routes et contrôles de surface (à implémenter)

# Lancement de l'application

## Prérequis 
• Installer Node.js 
• Installer un serveur web local avec mysql (Xamp, wamp...)
• Avoir connaissance de ses identifiants mysql

## Lancer le serveur
• Cloner le repo et l'ouvrir dans un IDE
• Lancer votre serveur web local
• Installer tous les packages avec `npm i`
• Dans le dossier ./prisma, modifier l'url de la base de données avec les informations souhaitées suivant le schéma suivant : mysql://login:password@localhost:3306/nom_base_de_données
• Une fois cela fait, entrer la commande `npx prisma migrate dev --name init`. Cela va créer la base de données.
• Enfin, lancer l'application avec `npm run dev` 
• Vous pouvez maintenant interroger le serveur depuis Postman ou un navigateur web à l'aide des routes configurées dans openapi.yaml
 