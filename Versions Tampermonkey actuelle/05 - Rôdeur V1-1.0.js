// ==UserScript==
// @name         05 - Rôdeur V1
// @namespace    tabellion
// @version      1.0
// @description  Orchestrateur de la mission
// @match        *://forum.renaissancekingdoms.com/viewtopic.php*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';
    //////////////////////////////////////////////////////
    // OUTILS DU RÔDEUR
    //////////////////////////////////////////////////////

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

        const messages =
              document.querySelectorAll(
                  ".post"
              );


        messages.forEach(function(message) {


            const texte =
                  message.innerText;


            for (const province in LISTE_MONOCLES) {


                const monocle =
                      LISTE_MONOCLES[province];


                const resultat =
                      texte.match(monocle.regex);


                if (resultat) {


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

        const rapports = [];

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


        rapports.forEach(function (rapport) {

            const boutonRapport =
                  document.createElement("button");

            boutonRapport.textContent =
                "📜 " + rapport.date;

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
            mettreAJourCarnet();
            carnet.style.display = "block";
        }
        else {
            carnet.style.display = "none";
        }
    };
})();