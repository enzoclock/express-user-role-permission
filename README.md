# Express - URP Pattern - User Role Permission

Bienvenue à Pizzalooza !

## Fonctionnalités de l'application

Pizzas :
- Créer une pizza (`pizza:create`)
- Jeter une pizza (`pizza:delete`)
- Ajouter un ingrédient sur une pizza (`pizza:add-ingredient`)

Commandes :
- Créer une commande (`order:create`)
- Modifier une commande (`order:update`)
- Supprimer une commande (`order:delete`)

Autres :
- Livrer les pizzas (`deliver`)
- Appeler le commanditaire (`call`)
- Laver la cuisine (`kitchen:clean`)

## Roles 

- Pizzaiolo (`pizzaiolo`)
- Livreur/livreuse (`delivery`)
- Serveur/serveuse (`waiter`)


## Personnel de l'entreprise

- Alice (Pizzaiolo)
- Bob (Serveur)
- Charly (Livreur)
- David (Pizzaiolo et serveur)
- Enzo (Livreur et serveur)

## Liste des permissions

Voir le fichier [database.js](./database.js)

## Tests

Voir le fichier [test.js](./test.js)

