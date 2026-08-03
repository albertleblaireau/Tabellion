// ==UserScript==
// @name         05 - Rôdeur V1+Monocles
// @namespace    tabellion
// @version      1.1
// @description  Orchestrateur de la mission + détection multi-formats des rapports
// @match        *://forum.renaissancekingdoms.com/viewtopic.php*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';
    //////////////////////////////////////////////////////
    // OUTILS DU RÔDEUR
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // RÉFÉRENTIEL DES MONOCLES
    //////////////////////////////////////////////////////

    const LISTE_MONOCLES = {


        //////////////////////////////////////////////////////
        // DOMAINE ROYAL
        //////////////////////////////////////////////////////

        "Alençon": {
            regex: /Rapport\s+Alençon\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Champagne": {
            regex: /Rapports\s+du\s+(\d{1,2}\/\d{1,2}\/147\d)/i
        },

        "Maine": {
            regex: /Synthèse.*?(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Normandie": {
            regex: /Rapports?\s+de\s+Normandie.*?(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Orléans": {
            regex: /Rapports?\s+d['’]Orléans.*?(\d{1,2}\s+\w+\s+147\d)/i
        },


        //////////////////////////////////////////////////////
        // NORD-OUEST
        //////////////////////////////////////////////////////

        "Touraine": {
            regex: /Rapport\s+de\s+la\s+Prévôté\s+de\s+Touraine\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Poitou": {
            regex: /Sécurité\s*-\s*Recommandations\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Limousarche": {
            regex: /Rapport\s+du\s+(\d{1,2}\/\d{1,2}\/147\d)/i
        },

        "Périgord-Angoumois": {
            regex: /Rapport\s+de\s+la\s+Prévôté\s+du\s+Périgord-Angoumois\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },


        //////////////////////////////////////////////////////
        // NORD-EST
        //////////////////////////////////////////////////////

        "Flandres": {
            regex: /Rapport\s+de\s+défenses\s*&\s*douane\s+de\s+la\s+Prévôté\s+des\s+Flandres\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Bourgogne": {
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        "Bourbonnais-Auvergne": {
            regex: /Synthèse\s+des\s+suspects\s+présents\s+le\s+(\d{1,2}\s+\w+\s+147\d)\s+en\s+Bourbonnais-Auvergne/i
        },


        //////////////////////////////////////////////////////
        // SUD-OUEST
        //////////////////////////////////////////////////////

        "Guyenne": {
            regex: /Rapport\s*-\s*(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Béarn": {
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        "Gascogne": {
            regex: /Rapport\s+de\s+la\s+nuit\s+du\s+\d{1,2}\s+au\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Armagnac & Comminges": {
            regex: /Rapports?\s+de\s+défenses\s*&\s*douane\s+de\s+la\s+Prévôté.*?Le\s+(\d{1,2}\s+\w+\s+147\d)/is
        },


        //////////////////////////////////////////////////////
        // SUD-EST
        //////////////////////////////////////////////////////

        "Lyonnais-Dauphiné": {
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        "Rouergue": {
            regex: /Rapport\s+de\s+douane\s+de\s+la\s+Prévôté\s+de\s+Rouergue\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        "Languedoc": {
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        "Toulouse": {
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        }

    };
    //////////////////////////////////////////////////////
    // BOUTON CARNET DU RÔDEUR
    //////////////////////////////////////////////////////

    const boutonRodeur = document.createElement("button");

    boutonRodeur.textContent = "🌲";

    boutonRodeur.style.position = "fixed";
    boutonRodeur.style.top = "50px";
    boutonRodeur.style.right = "10px";
    boutonRodeur.style.zIndex = "99999";
    boutonRodeur.style.padding = "8px 12px";
    boutonRodeur.style.cursor = "pointer";

    document.body.appendChild(boutonRodeur);

    //////////////////////////////////////////////////////
    // ANALYSE DES RAPPORTS
    //////////////////////////////////////////////////////

    function analyserRapports() {

        const rapports = [];
        const messages = [
            ...document.querySelectorAll(".post, td.quote")
        ];
        const vus = new Set();

        messages.forEach(function(message) {

            const texte = message.innerText;
            const signature = texte.replace(/\s+/g, " ").trim().slice(0, 280);

            for (const province in LISTE_MONOCLES) {

                const monocle = LISTE_MONOCLES[province];
                const resultat = texte.match(monocle.regex);

                if (resultat) {

                    const cle = province + "::" + resultat[1] + "::" + signature;

                    if (vus.has(cle)) {
                        break;
                    }

                    vus.add(cle);

                    rapports.push({

                        province: province,
                        date: resultat[1],
                        element: message,
                        url: window.location.href

                    });

                    break;

                }

            }

        });

        return rapports;

    }
    //////////////////////////////////////////////////////
    // CARNET DU RÔDEUR
    //////////////////////////////////////////////////////

    const carnet = document.createElement("div");

    carnet.style.position = "fixed";
    carnet.style.top = "80px";
    carnet.style.right = "10px";
    carnet.style.width = "280px";
    carnet.style.maxHeight = "70vh";
    carnet.style.overflowY = "auto";
    carnet.style.background = "white";
    carnet.style.border = "2px solid #444";
    carnet.style.padding = "10px";
    carnet.style.zIndex = "99999";
    carnet.style.display = "none";

    document.body.appendChild(carnet);

    const STORAGE_KEY = "tabellionRodeurCarnetOuvert";

    function estCarnetOuvert() {

        try {
            return sessionStorage.getItem(STORAGE_KEY) === "1";
        }
        catch (erreur) {
            return false;
        }

    }

    function enregistrerEtatCarnet(ouvert) {

        try {
            sessionStorage.setItem(STORAGE_KEY, ouvert ? "1" : "0");
        }
        catch (erreur) {
            // Ignoré si le stockage est indisponible.
        }

    }

    function trouverLienPageSuivante() {

        const liens = Array.from(document.querySelectorAll("a"));

        return liens.find(function (lien) {

            const texte = (lien.textContent || "").trim().toLowerCase();
            const rel = (lien.rel || "").toLowerCase();
            const title = (lien.title || "").trim().toLowerCase();

            return rel.includes("next") ||
                   title.includes("page suivante") ||
                   texte.includes("page suivante") ||
                   texte.includes("suivant") ||
                   texte.includes("next");

        });

    }

    //////////////////////////////////////////////////////
    // AFFICHAGE CARNET DU RÔDEUR
    //////////////////////////////////////////////////////

    function mettreAJourCarnet() {

        carnet.innerHTML = "";

        const titre =
        document.createElement("h3");

        titre.textContent =
            "🌲 Carnet du Rôdeur";

        carnet.appendChild(titre);

        //////////////////////////////////////////////////////
        // RÔDEUR
        //////////////////////////////////////////////////////

        carnet.appendChild(document.createElement("hr"));

        const titreRodeur =
              document.createElement("h3");

        titreRodeur.textContent =
            "🌲 RÔDEUR";

        titreRodeur.style.marginBottom =
            "5px";

        carnet.appendChild(titreRodeur);

        //////////////////////////////////////////////////////
        // LISTE DES RAPPORTS
        //////////////////////////////////////////////////////

        const rapports = analyserRapports();

        const compteur =
              document.createElement("div");

        compteur.textContent =
            "📜 " +
            rapports.length +
            " rapport(s) détecté(s)";

        compteur.style.fontWeight =
            "bold";

        compteur.style.marginBottom =
            "8px";

        carnet.appendChild(compteur);

        const boutonHautPage =
              document.createElement("button");

        boutonHautPage.textContent =
            "⬆️ Haut de page";

        boutonHautPage.style.display =
            "block";

        boutonHautPage.style.width =
            "100%";

        boutonHautPage.style.marginTop =
            "5px";

        boutonHautPage.style.marginBottom =
            "5px";

        boutonHautPage.style.cursor =
            "pointer";

        boutonHautPage.onclick = function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };

        carnet.appendChild(boutonHautPage);

        const separateurHaut = document.createElement("div");

        separateurHaut.style.borderTop = "1px solid #ccc";
        separateurHaut.style.margin = "12px 0 8px 0";
        separateurHaut.style.paddingTop = "4px";

        carnet.appendChild(separateurHaut);

        rapports.forEach(function (rapport) {

            const boutonRapport =
                  document.createElement("button");

            boutonRapport.textContent =
                "📜 " + rapport.province + " • " + rapport.date;

            boutonRapport.style.display =
                "block";

            boutonRapport.style.width =
                "100%";

            boutonRapport.style.marginTop =
                "5px";

            boutonRapport.style.cursor =
                "pointer";

            boutonRapport.onclick = function () {

                rapport.element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                rapport.element.style.outline =
                    "3px solid orange";

                setTimeout(function () {

                    rapport.element.style.outline = "";

                }, 2000);

            };

            carnet.appendChild(boutonRapport);

        });

        const separateurBas = document.createElement("div");

        separateurBas.style.borderTop = "1px solid #ccc";
        separateurBas.style.margin = "12px 0 8px 0";
        separateurBas.style.paddingTop = "4px";

        carnet.appendChild(separateurBas);

        const boutonPagePrecedente =
              document.createElement("button");

        boutonPagePrecedente.textContent =
            "⬅️ Page précédente";

        boutonPagePrecedente.style.display =
            "block";

        boutonPagePrecedente.style.width =
            "100%";

        boutonPagePrecedente.style.marginTop =
            "5px";

        boutonPagePrecedente.style.marginBottom =
            "5px";

        boutonPagePrecedente.style.cursor =
            "pointer";

        boutonPagePrecedente.onclick = function () {

            const liens = Array.from(document.querySelectorAll("a"));
            const lienPagePrecedente = liens.find(function (lien) {

                const texte = (lien.textContent || "").trim().toLowerCase();
                const rel = (lien.rel || "").toLowerCase();
                const title = (lien.title || "").trim().toLowerCase();

                return rel.includes("prev") ||
                       title.includes("page précédente") ||
                       texte.includes("page précédente") ||
                       texte.includes("précédent") ||
                       texte.includes("prev");

            });

            if (lienPagePrecedente) {
                enregistrerEtatCarnet(true);
                window.location.href = lienPagePrecedente.href;
            }

        };

        carnet.appendChild(boutonPagePrecedente);

        const boutonPageSuivante =
              document.createElement("button");

        boutonPageSuivante.textContent =
            "➡️ Page suivante";

        boutonPageSuivante.style.display =
            "block";

        boutonPageSuivante.style.width =
            "100%";

        boutonPageSuivante.style.marginTop =
            "5px";

        boutonPageSuivante.style.marginBottom =
            "5px";

        boutonPageSuivante.style.cursor =
            "pointer";

        boutonPageSuivante.onclick = function () {

            const lienPageSuivante = trouverLienPageSuivante();

            if (lienPageSuivante) {
                enregistrerEtatCarnet(true);
                window.location.href = lienPageSuivante.href;
            }

        };

        carnet.appendChild(boutonPageSuivante);

        if (rapports.length === 0) {

            const message =
                  document.createElement("div");

            message.textContent =
                "Aucun rapport détecté.";

            message.style.marginTop =
                "8px";

            carnet.appendChild(message);

        }
    }

        //////////////////////////////////////////////////////
        // OUVERTURE DU CARNET
        //////////////////////////////////////////////////////

    boutonRodeur.onclick = function () {
        if (carnet.style.display === "none") {
            enregistrerEtatCarnet(true);
            mettreAJourCarnet();
            carnet.style.display = "block";
        }
        else {
            enregistrerEtatCarnet(false);
            carnet.style.display = "none";
        }
    };

    if (estCarnetOuvert()) {
        mettreAJourCarnet();
        carnet.style.display = "block";
    }
})();