// ==UserScript==
// @name         Tabellion - Mini-Tabellion V0.4 Multi-Monocles
// @namespace    tabellion
// @version      0.4
// @description  Détection multi-formats des rapports du forum
// @match        *://forum.renaissancekingdoms.com/viewtopic.php*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';


    //////////////////////////////////////////////////////
    // MONOCLES DE LECTURE
    //////////////////////////////////////////////////////


    const Monocles = [

        //////////////////////////////////////////////////////
        // DOMAINE ROYAL
        //////////////////////////////////////////////////////

        {
            nom: "Alençon",
            regex: /Rapport\s+Alençon\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Champagne",
            regex: /Rapports\s+du\s+(\d{1,2}\/\d{1,2}\/147\d)/i
        },

        {
            nom: "Maine",
            regex: /Synthèse.*?(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Normandie",
            regex: /Rapports?\s+de\s+Normandie.*?(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Orléans",
            regex: /Rapports?\s+d['’]Orléans.*?(\d{1,2}\s+\w+\s+147\d)/i
        },


        //////////////////////////////////////////////////////
        // NORD-OUEST
        //////////////////////////////////////////////////////

        {
            nom: "Touraine",
            regex: /Rapport\s+de\s+la\s+Prévôté\s+de\s+Touraine\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Poitou",
            regex: /Sécurité\s*-\s*Recommandations\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Limousarche",
            regex: /Rapport\s+du\s+(\d{1,2}\/\d{1,2}\/147\d)/i
        },

        {
            nom: "Périgord-Angoumois",
            regex: /Rapport\s+de\s+la\s+Prévôté\s+du\s+Périgord-Angoumois\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },


        //////////////////////////////////////////////////////
        // NORD-EST
        //////////////////////////////////////////////////////

        {
            nom:"Flandres",
            regex: /Rapport\s+de\s+défenses\s*&\s*douane\s+de\s+la\s+Prévôté\s+des\s+Flandres\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom:"Bourgogne",
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        {
            nom: "Bourbonnais-Auvergne",
            regex: /Synthèse\s+des\s+suspects\s+présents\s+le\s+(\d{1,2}\s+\w+\s+147\d)\s+en\s+Bourbonnais-Auvergne/i
        },


        //////////////////////////////////////////////////////
        // SUD-OUEST
        //////////////////////////////////////////////////////

        {
            nom: "Guyenne",
            regex: /Rapport\s*-\s*(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Béarn",
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        {
            nom: "Gascogne",
            regex: /Rapport\s+de\s+la\s+nuit\s+du\s+\d{1,2}\s+au\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Armagnac & Comminges",
            regex: /Rapports?\s+de\s+défenses\s*&\s*douane\s+de\s+la\s+Prévôté.*?Le\s+(\d{1,2}\s+\w+\s+147\d)/is
        },


        //////////////////////////////////////////////////////
        // SUD-EST
        //////////////////////////////////////////////////////

        {
            nom: "Lyonnais-Dauphiné",
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        {
            nom: "Rouergue",
            regex: /Rapport\s+de\s+douane\s+de\s+la\s+Prévôté\s+de\s+Rouergue\s+du\s+(\d{1,2}\s+\w+\s+147\d)/i
        },

        {
            nom: "Languedoc",
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        },

        {
            nom: "Toulouse",
            regex: /~\s*(\d{1,2}\s+\w+\s+147\d)\s*~/i
        }

    ];


    //////////////////////////////////////////////////////
    // BOUTON
    //////////////////////////////////////////////////////


    const bouton = document.createElement("button");


    bouton.textContent = "📜 Mini-Tabellion";


    bouton.style.position = "fixed";
    bouton.style.top = "10px";
    bouton.style.right = "10px";
    bouton.style.zIndex = "99999";
    bouton.style.padding = "8px 12px";
    bouton.style.cursor = "pointer";


    document.body.appendChild(bouton);





    //////////////////////////////////////////////////////
    // FENÊTRE
    //////////////////////////////////////////////////////


    const fenetre = document.createElement("div");


    fenetre.style.position = "fixed";
    fenetre.style.top = "50px";
    fenetre.style.right = "10px";
    fenetre.style.width = "280px";
    fenetre.style.maxHeight = "70vh";
    fenetre.style.overflowY = "auto";
    fenetre.style.background = "white";
    fenetre.style.border = "2px solid #444";
    fenetre.style.padding = "10px";
    fenetre.style.zIndex = "99999";
    fenetre.style.display = "none";


    document.body.appendChild(fenetre);





    //////////////////////////////////////////////////////
    // DETECTION
    //////////////////////////////////////////////////////


    function analyserRapports() {


        const messages = [
            ...document.querySelectorAll("td.quote")
        ];


        let rapports = [];



        messages.forEach((message) => {


            const texte = message.innerText;



            for (const monocle of Monocles) {


                const resultat =
                    texte.match(monocle.regex);



                if (resultat) {


                    rapports.push({

                        date: resultat[1],

                        element: message,

                        monocle: monocle.nom

                    });


                    break;


                }


            }



        });



        return rapports;


    }







    //////////////////////////////////////////////////////
    // AFFICHAGE
    //////////////////////////////////////////////////////


    function afficherRapports() {



        const rapports = analyserRapports();



        fenetre.innerHTML = "";



        const titre =
            document.createElement("h3");


        titre.textContent =
            "📜 Mini-Tabellion";


        fenetre.appendChild(titre);





        const compteur =
            document.createElement("div");


        compteur.textContent =
            rapports.length +
            " rapport(s) détecté(s)";


        fenetre.appendChild(compteur);





        rapports.forEach((rapport) => {



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




            boutonRapport.onclick =
            function () {



                rapport.element.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });



                rapport.element.style.outline =
                    "3px solid orange";



                setTimeout(() => {

                    rapport.element.style.outline = "";

                }, 2000);



            };



            fenetre.appendChild(boutonRapport);



        });



        if (rapports.length === 0) {


            fenetre.innerHTML +=
                "<br>Aucun rapport reconnu.";

        }



    }







    //////////////////////////////////////////////////////
    // ACTION
    //////////////////////////////////////////////////////


    bouton.onclick = function () {



        if (fenetre.style.display === "none") {


            afficherRapports();


            fenetre.style.display = "block";


        }

        else {


            fenetre.style.display = "none";


        }



    };



})();