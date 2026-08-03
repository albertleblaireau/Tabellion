// ==UserScript==
// @name         03 - Loupe V1.0
// @namespace    tabellion
// @version      1.0
// @description  Observation d'une page du forum
// @match        *://forum.renaissancekingdoms.com/viewtopic.php*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    //////////////////////////////////////////////////////
    // BOUTON
    //////////////////////////////////////////////////////

    const boutonLoupe = document.createElement("button");

    boutonLoupe.textContent = "🔍";

    boutonLoupe.style.position = "fixed";
    boutonLoupe.style.top = "90px";
    boutonLoupe.style.right = "10px";
    boutonLoupe.style.zIndex = "99999";
    boutonLoupe.style.padding = "8px 12px";
    boutonLoupe.style.cursor = "pointer";

    document.body.appendChild(boutonLoupe
    );

    //////////////////////////////////////////////////////
    // ACTION
    //////////////////////////////////////////////////////

    boutonLoupe.onclick = function () {

        const messages = observer();

        alert(
            messages.length +
            " message(s) observé(s)."
        );

    };

    //////////////////////////////////////////////////////
    // OBSERVATION
    //////////////////////////////////////////////////////

    function observer() {

        const resultat = [];

        const lignes =
              document.querySelectorAll("tr");

        lignes.forEach((tr) => {

            const cellules =
                  tr.querySelectorAll(":scope > td");

            if (
                cellules.length === 2 &&
                (
                    cellules[0].className === "row1" ||
                    cellules[0].className === "row2"
                ) &&
                (
                    cellules[1].className === "row1" ||
                    cellules[1].className === "row2"
                ) &&
                cellules[1].querySelector("span.postbody")
            ) {

                resultat.push(tr);

            }

        });

        return resultat;

    }

})();