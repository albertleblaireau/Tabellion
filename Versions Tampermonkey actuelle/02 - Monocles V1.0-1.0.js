// ==UserScript==
// @name         02 - Monocles V1.0
// @namespace    tabellion
// @version      1.0
// @description  Référentiel des Monocles du Rôdeur
// @author       Albert & ChatGPT
// @match        *://forum.renaissancekingdoms.com/viewtopic.php*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

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
// API
//////////////////////////////////////////////////////

    const Monocles = {

        charger(nom) {

            const monocle = LISTE_MONOCLES[nom];

            if (!monocle) {

                console.error(
                    "👓 Monocle introuvable :",
                    nom
                );

                return null;

            }

            return monocle;

        },

        existe(nom) {

            return !!LISTE_MONOCLES[nom];

        },

        lister() {

            return Object.keys(LISTE_MONOCLES);

        }

    };

    //////////////////////////////////////////////////////

    window.LISTE_MONOCLES = LISTE_MONOCLES;

})();