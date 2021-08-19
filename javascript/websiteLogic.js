/* jshint esversion: 6 */
/* jshint browser: true */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const addButton = document.getElementById("add-row");
    const clearButton = document.getElementById("delete-data");
    const table = document.getElementById("overview-table");

    let sumQuantity = document.getElementById("sum-quantity");
    let sumOriPal = document.getElementById("sum-ori-pal");
    let sumSandwichPal = document.getElementById("sum-sandwich-pal");
    let sumMixPal = document.getElementById("sum-mixed-pal");
    let sumTotal = document.getElementById("sum-total");
    /* Variables for column totals (i.e. quantities/pallet bay sums) */
    let sumItemQuantities = 0;
    let sumOriPalBays = 0;
    let sumSandwichPalBays = 0;
    let sumMixedPalBays = 0;
    let sumTotalBays = 0;

    let orderPosCounter = 1;

    addButton.addEventListener("click", (event) => {
        /* Is double-deck equipment for trucks agreed/available at loading site? [true/false] */
        let equipment = document.getElementById("equipment").checked;
        /* Is trade item stackable or capable for double-deck transport? [true/false] */
        let stackable = document.getElementById("stackable").checked;
        /* Number of trade items per original pallet [Number] */
        let palletCount = Number(document.getElementById("pallet-count").value);
        /* Number of trade items per pallet layer [Number] */
        let layerCount = Number(document.getElementById("layer-count").value);
        /* Ordered trade item quantity [Number] */
        let quantity = Number(document.getElementById("quantity").value);

        /* Ensure that all input fields are filled by triggering alert message */
        if (palletCount == "" || layerCount == "" || quantity == ""){
            alert("Please fill all input fields");
        }else{   
            /* Calculate row/order totals */
            sumItemQuantities = sumItemQuantities + quantity;
            /* Apply function specified in index.js */
            let orderPosSubTotals = baysPerOrderPos(equipment, stackable, palletCount, layerCount, quantity);
            sumOriPalBays = sumOriPalBays + orderPosSubTotals.baysForOriPals;
            sumSandwichPalBays = sumSandwichPalBays + orderPosSubTotals.baysForSandwichPals;
            sumMixedPalBays = sumMixedPalBays + orderPosSubTotals.baysForMixedPals;
            sumTotalBays = sumOriPalBays + sumSandwichPalBays + sumMixedPalBays;

            /* Write order position values to table */
            let row = table.insertRow(orderPosCounter);
            let cell = row.insertCell();
            cell.innerText = orderPosCounter;
            cell = row.insertCell();
            cell.innerText = orderPosSubTotals.stacked;
            cell = row.insertCell();
            cell.innerText = quantity;
            cell = row.insertCell();
            cell.innerText = orderPosSubTotals.baysForOriPals.toFixed(2);
            cell = row.insertCell();
            cell.innerText = (orderPosSubTotals.baysForSandwichPals).toFixed(2);
            cell = row.insertCell();
            cell.innerText = orderPosSubTotals.baysForMixedPals.toFixed(2);
            cell = row.insertCell();
            cell.innerText = orderPosSubTotals.subTotalPerRow.toFixed(2);

            /* Write order totals to table */
            sumQuantity.innerText = sumItemQuantities;
            sumOriPal.innerText = sumOriPalBays.toFixed(2);
            sumSandwichPal.innerText = sumSandwichPalBays.toFixed(2);
            sumMixPal.innerText = sumMixedPalBays.toFixed(2);
            sumTotal.innerText = Math.ceil(sumTotalBays);

            orderPosCounter++;

            /* Clear input fields for new entry */
            document.getElementById("form").reset();
            }
    });
    /* Reset all (sub-)totals, counters, forms */
    clearButton.addEventListener("click", (event) => {
        document.getElementById("form").reset();
        while (table.rows.length > 2) {
            table.deleteRow(1);
        }
        sumQuantity.innerText = 0;
        sumOriPal.innerText = 0;
        sumSandwichPal.innerText = 0;
        sumMixPal.innerText = 0;
        sumTotal.innerText = 0;
        sumItemQuantities = 0;
        sumOriPalBays = 0;
        sumSandwichPalBays = 0;
        sumMixedPalBays = 0;
        sumTotalBays = 0;
        orderPosCounter = 1;
    });
});


/* Developer sample requests (for illustration purposes only) */
/* Get entire map */
/* console.log(baysPerOrderPos(true, true, 60, 10, 356)); 
console.log(baysPerOrderPos(true, false, 84, 12, 362)); 
console.log(baysPerOrderPos(true, true, 98, 14, 366));  */

/* Only get subTotalPerRow */
/* console.log(baysPerOrderPos(false, false, 60, 10, 356).subTotalPerRow); */