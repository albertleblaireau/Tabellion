// ==UserScript==
// @name         01 - Besace
// @namespace    Tabellion
// @version      1.0
// @description  Réception et contrôle des ordres de mission du Rôdeur
// @author       Albert & ChatGPT
// @match        https://forum.renaissancekingdoms.com/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    //////////////////////////////////////////////////////
    // CHAMPS OBLIGATOIRES
    //////////////////////////////////////////////////////

    const CHAMPS_MISSION = [
        "province",
        "dateRecherchee",
        "archiveDepart",
        "pointDepart",
        "monocle"
    ];

    //////////////////////////////////////////////////////
    // BESACE
    //////////////////////////////////////////////////////

    const Besace = {

        mission: null,

        ////////////////////////////////////////////////
        // Analyse de l'ordre de mission
        ////////////////////////////////////////////////

        recevoir(texte) {

            if (!texte || !texte.trim()) {

                console.error("🎒 Aucun ordre de mission.");

                return null;

            }

            const mission = {};

            const lignes = texte
                .split("\n")
                .map(l => l.trim());

            for (const ligne of lignes) {

                if (ligne.startsWith("Province")) {

                    mission.province =
                        ligne.split(":")[1]?.trim();

                }

                else if (ligne.startsWith("Date recherchée")) {

                    mission.dateRecherchee =
                        ligne.split(":")[1]?.trim();

                }

                else if (ligne.startsWith("Archive de départ")) {

                    mission.archiveDepart =
                        ligne.split(":")[1]?.trim();

                }

                else if (ligne.startsWith("Point de départ")) {

                    mission.pointDepart =
                        ligne.split(":")[1]?.trim();

                }

                else if (ligne.startsWith("Monocle conseillé")) {

                    mission.monocle =
                        ligne.split(":")[1]?.trim();

                }

            }

            if (!this.verifierMission(mission)) {
                return null;
            }

            this.mission = mission;

            console.log("🎒 Mission reçue.");

            return mission;

        },

        ////////////////////////////////////////////////

        verifierMission(mission) {

            for (const champ of CHAMPS_MISSION) {

                if (!mission[champ]) {

                    console.error(
                        "🎒 Champ manquant :",
                        champ
                    );

                    return false;

                }

            }

            console.log("🎒 Mission complète.");

            return true;

        },

        ////////////////////////////////////////////////

        verifierResultat(resultat) {

            if (!resultat) {

                console.error("🎒 Aucun résultat.");

                return false;

            }

            if (!resultat.url) {

                console.warn("🎒 URL absente.");

            }

            if (!resultat.rapport) {

                console.warn("🎒 Rapport absent.");

            }

            return true;

        }

    };

    //////////////////////////////////////////////////////
    // INTERFACE
    //////////////////////////////////////////////////////

    const fenetre = document.createElement("div");

    fenetre.style.position = "fixed";
    fenetre.style.top = "100px";
    fenetre.style.right = "20px";
    fenetre.style.width = "340px";
    fenetre.style.background = "#f6f1e3";
    fenetre.style.border = "2px solid #654321";
    fenetre.style.padding = "10px";
    fenetre.style.zIndex = "99999";
    fenetre.style.fontFamily = "Georgia";
    fenetre.style.fontSize = "14px";

    fenetre.innerHTML = `
        <h3 style="margin-top:0;text-align:center;">
            🎒 BESACE
        </h3>

        <div style="margin-bottom:8px;">
            Ordre de mission
        </div>
    `;

    //////////////////////////////////////////////////////

    const textarea = document.createElement("textarea");

    textarea.style.width = "100%";
    textarea.style.height = "180px";

    fenetre.appendChild(textarea);

    //////////////////////////////////////////////////////

    const bouton = document.createElement("button");

    bouton.textContent = "Recevoir";

    bouton.style.marginTop = "10px";
    bouton.style.width = "100%";

    bouton.onclick = () => {

        const mission =
            Besace.recevoir(textarea.value);

        if (!mission) {
            return;
        }

        console.clear();

        console.log("========== BESACE ==========");

        console.log(mission);

        console.log("============================");

    };

    fenetre.appendChild(bouton);

    //////////////////////////////////////////////////////

    document.body.appendChild(fenetre);

    //////////////////////////////////////////////////////
    // Export
    //////////////////////////////////////////////////////

    window.Besace = Besace;

})();