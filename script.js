// Ajoutez cette variable en haut de votre script pour suivre les erreurs
var erreurs = [];

// Fonction pour vérifier les champs obligatoires
function verifier() {
    // Réinitialiser la liste des erreurs à chaque vérification
    erreurs = [];

    // Récupérer les éléments du formulaire
    var nom = document.getElementById("nom");
    var prenom = document.getElementById("prenom");
    var telephone = document.getElementById("telephone");
    var email = document.getElementById("email");
    var quantite1 = parseInt(document.getElementById("quantite1").value) || 0;
    var quantite2 = parseInt(document.getElementById("quantite2").value) || 0;
    var quantite3 = parseInt(document.getElementById("quantite3").value) || 0;
    var acceptConditions = document.getElementById("acceptConditions");

    // Remettre les bordures à la normale
    nom.style.border = "1px solid #ccc";
    prenom.style.border = "1px solid #ccc";
    telephone.style.border = "1px solid #ccc";
    email.style.border = "1px solid #ccc";

    // Vérifier les champs obligatoires
    if (nom.value.trim() === "") {
        nom.style.border = "2px solid red";
        erreurs.push("Le champ 'Nom' est obligatoire.");
    }

    if (prenom.value.trim() === "") {
        prenom.style.border = "2px solid red";
        erreurs.push("Le champ 'Prénom' est obligatoire.");
    }

    var telephoneValue = telephone.value.trim();
    if (telephoneValue === "" || !/^\d{10}$/.test(telephoneValue)) {
        telephone.style.border = "2px solid red";
        erreurs.push("Le numéro de téléphone doit contenir exactement 10 chiffres.");
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
        email.style.border = "2px solid red";
        erreurs.push("L'adresse e-mail n'est pas valide.");
    }

    if (!quantite1 && !quantite2 && !quantite3) {
        erreurs.push("Au moins une quantité doit être supérieure à zéro.");
    }

    if (!acceptConditions.checked) {
        erreurs.push("Vous devez accepter les conditions générales.");
    }

    // Si des erreurs sont trouvées, afficher un message d'erreur
    if (erreurs.length > 0) {
        alert(erreurs.join("\n"));
    }
}

// Fonction pour mettre à jour les champs automatiquement
function mettreAJourChamps() {
    var quantite1 = parseInt(document.getElementById("quantite1").value) || 0;
    var quantite2 = parseInt(document.getElementById("quantite2").value) || 0;
    var quantite3 = parseInt(document.getElementById("quantite3").value) || 0;

    var tarifDemiJournee = 8;
    var tarifJournee = 15;
    var tarifRepas = 7;

    // Mettre à jour les champs Sous-total HT
    document.getElementById("sousTotal1").value = (quantite1 * tarifDemiJournee).toFixed(2);
    document.getElementById("sousTotal2").value = (quantite2 * tarifJournee).toFixed(2);
    document.getElementById("sousTotal3").value = (quantite3 * tarifRepas).toFixed(2);

    // Calculer le total HT
    var totalHT = quantite1 * tarifDemiJournee + quantite2 * tarifJournee + quantite3 * tarifRepas;
    document.getElementById("totalHT").value = totalHT.toFixed(2);

    // Calculer le total TTC (TVA 20%)
    var totalTTC = totalHT * 1.2;
    document.getElementById("totalTTC").value = totalTTC.toFixed(2);
}

// Fonction pour envoyer la commande par e-mail
function envoyer() {
    // Vérifier d'abord les champs
    verifier();

    // Ensuite, vérifier s'il y a des erreurs
    if (erreurs.length > 0) {
        // S'il y a des erreurs, ne pas envoyer l'e-mail
        return;
    }

    // Récupérer les valeurs pour le récapitulatif
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var telephone = document.getElementById("telephone").value;
    var email = document.getElementById("email").value;
    var totalTTC = document.getElementById("totalTTC").value;
    var quantite1 = parseInt(document.getElementById("quantite1").value) || 0;
    var quantite2 = parseInt(document.getElementById("quantite2").value) || 0;
    var quantite3 = parseInt(document.getElementById("quantite3").value) || 0;

    // Construire le contenu de l'e-mail
    var contenuEmail = "Nom: " + nom + "\n";
    contenuEmail += "Prénom: " + prenom + "\n";
    contenuEmail += "Téléphone: " + telephone + "\n";
    contenuEmail += "Email: " + email + "\n";
    contenuEmail += "Nombre de Demi-journées: " + quantite1 + "\n";
    contenuEmail += "Nombre de Journées: " + quantite2 + "\n";
    contenuEmail += "Nombre de Repas: " + quantite3 + "\n";
    contenuEmail += "Total TTC: " + totalTTC + " euros\n";

    // Ouvrir le client de messagerie par défaut
    window.location.href = "mailto:mgrillon@gmail.com?subject=Commande&body=" + encodeURIComponent(contenuEmail);

    // Afficher la confirmation avec le récapitulatif
    alert("Récapitulatif de la commande et adresse e-mail du destinataire : " + contenuEmail);
}

// Le reste du code reste inchangé...

// Écouteurs d'événement pour les boutons
document.addEventListener("DOMContentLoaded", function () {
    mettreAJourChamps(); // Mettre à jour les champs au chargement de la page
    var quantiteElements = document.querySelectorAll('input[name="quantite"]');
    quantiteElements.forEach(function (quantiteElement) {
        quantiteElement.addEventListener("input", mettreAJourChamps);
    });

    document.getElementById("verifier").addEventListener("click", verifier);
    document.getElementById("imprimer").addEventListener("click", imprimer);
    document.getElementById("reinitialiser").addEventListener("click", reinitialiser);
    document.getElementById("envoyer").addEventListener("click", envoyer);
});
