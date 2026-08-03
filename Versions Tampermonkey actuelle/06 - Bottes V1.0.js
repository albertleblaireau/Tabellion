// ==UserScript==
// @name         06 - Bottes V1.0
// @namespace    tabellion
// @version      1.0
// @description  Déplacement du Rôdeur entre les pages du forum
// @match        *://forum.renaissancekingdoms.com/viewtopic.php*
// @grant        none
// ==/UserScript==

(function () {

    "use strict";

    //////////////////////////////////////////////////////
    // MÉMOIRE DU CARNET
    //////////////////////////////////////////////////////

    const STORAGE_KEY =
        "tabellionRodeurCarnetOuvert";

    //////////////////////////////////////////////////////
    // ÉTAT DU CARNET
    //////////////////////////////////////////////////////

    function carnetOuvert() {

        try {

            return sessionStorage.getItem(
                STORAGE_KEY
            ) === "1";

        }
        catch (erreur) {

            return false;

        }

    }

    function conserverCarnet(ouvert) {

        try {

            sessionStorage.setItem(
                STORAGE_KEY,
                ouvert ? "1" : "0"
            );

        }
        catch (erreur) {

            // Stockage indisponible.

        }

    }

    //////////////////////////////////////////////////////
    // RECHERCHE DES LIENS
    //////////////////////////////////////////////////////

    function trouverLienPageSuivante() {

        const liens =
            Array.from(
                document.querySelectorAll("a")
            );

        return liens.find(function (lien) {

            const texte =
                (lien.textContent || "")
                    .trim()
                    .toLowerCase();

            const rel =
                (lien.rel || "")
                    .toLowerCase();

            const title =
                (lien.title || "")
                    .trim()
                    .toLowerCase();

            return (
                rel.includes("next") ||
                title.includes("page suivante") ||
                texte.includes("page suivante") ||
                texte.includes("suivant") ||
                texte.includes("next")
            );

        });

    }

    function trouverLienPagePrecedente() {

        const liens =
            Array.from(
                document.querySelectorAll("a")
            );

        return liens.find(function (lien) {

            const texte =
                (lien.textContent || "")
                    .trim()
                    .toLowerCase();

            const rel =
                (lien.rel || "")
                    .toLowerCase();

            const title =
                (lien.title || "")
                    .trim()
                    .toLowerCase();

            return (
                rel.includes("prev") ||
                title.includes("page précédente") ||
                texte.includes("page précédente") ||
                texte.includes("précédent") ||
                texte.includes("prev")
            );

        });

    }

    //////////////////////////////////////////////////////
    // DÉPLACEMENT
    //////////////////////////////////////////////////////

    function aller(url) {

        if (!url) {
            return false;
        }

        conserverCarnet(true);

        window.location.href = url;

        return true;

    }

    function pageSuivante() {

        const lien =
            trouverLienPageSuivante();

        if (!lien) {
            return false;
        }

        return aller(lien.href);

    }

    function pagePrecedente() {

        const lien =
            trouverLienPagePrecedente();

        if (!lien) {
            return false;
        }

        return aller(lien.href);

    }

    //////////////////////////////////////////////////////
    // API
    //////////////////////////////////////////////////////

    window.Bottes = {

        aller,

        pageSuivante,

        pagePrecedente,

        trouverLienPageSuivante,

        trouverLienPagePrecedente,

        carnetOuvert,

        conserverCarnet

    };

})();