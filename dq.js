const fetch = require('node-fetch'); // Assurez-vous d'avoir installé node-fetch
// Remplacez par votre clé d'API Tracker.gg
const API_KEY = 'eaacd2ed-c645-4bfe-bc3e-272ded1a6032';

// URL de l'API Tracker.gg
const BASE_URL = 'https://public-api.tracker.gg/v2';

async function getPlayerStats(platform, username) {
    const url = `${BASE_URL}/apex/standard/profile/${platform}/${username}`;

    const options = {
        method: 'GET',
        headers: {
            'TRN-Api-Key': API_KEY,
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json(); // Retourne les données JSON
            return data;
        } else {
            // Ajout d'une gestion d'erreur améliorée
            const errorData = await response.json();
            console.error(`Erreur : ${response.status}, ${response.statusText}`);
            console.error('Détails de l\'erreur :', errorData);
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques du joueur :', error);
    }
}

(async () => {
    // Spécifiez la plateforme et le nom d'utilisateur
    const platform = 'pc'; // ou 'xbox', 'psn', etc.
    const username = 'votre_nom_d_utilisateur'; // Remplacez par le nom d'utilisateur

    const stats = await getPlayerStats(platform, username);

    if (stats) {
        console.log("Statistiques du joueur :", JSON.stringify(stats, null, 2));
    }
})();
