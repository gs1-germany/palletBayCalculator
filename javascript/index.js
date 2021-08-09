"use strict"

/**
 * To be done
 * @param 
 * @returns 
 */

document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-row")
    const clearButton = document.getElementById("delete-data")
    const table = document.getElementById("overview-table")

    let sumQuantity = document.getElementById("sum-quantity")
    let sumOriPal = document.getElementById("sum-ori-pal")
    let sumSandwichPal = document.getElementById("sum-sandwich-pal")
    let sumMixPal = document.getElementById("sum-mixed-pal")
    let sumTotal = document.getElementById("sum-total")
    /* Variables for column totals (i.e. quantities/pallet bay sums) */
    let sumItemQuantities = 0
    let sumOriPalBays = 0
    let sumSandwichPalBays = 0
    let sumMixedPalBays = 0
    let sumTotalBays = 0

    let orderPosCounter = 1

    addButton.addEventListener("click", (event) => {
        /* Is double-deck equipment for trucks agreed/available at loading site? [true/false] */
        let equipment = document.getElementById("equipment").checked
        /* Is trade item stackable or capable for double-deck transport? [true/false] */
        let stackable = document.getElementById("stackable").checked
        /* Number of trade items per original pallet [Number] */
        let palletCount = Number(document.getElementById("pallet-count").value)
        /* Number of trade items per pallet layer [Number] */
        let layerCount = Number(document.getElementById("layer-count").value)
        /* Ordered trade item quantity [Number] */
        let quantity = Number(document.getElementById("quantity").value)

        /* Ensure that all input fields are filled by triggering alert message */
        if (palletCount == "" || layerCount == "" || quantity == ""){
            alert("Please fill all input fields")
        }else{
            /* Calculate number of original pallets */
            let oriPal = Math.floor(quantity / palletCount)
            /* Calculate overhang of ordered trade items from original pallets */
            let oriPalOverhang = quantity % palletCount
            /* Calculate number of overhanging single-item/homogeneous layers */
            let singleItemLayer = Math.floor(oriPalOverhang / layerCount)
            /* Calculate number of trade items in overhanging single-item/homogeneous layers */
            let itemsInOriLayers = singleItemLayer * layerCount
            /* Calculate overhang of trade items from the above single-item/homogeneous layers (i.e. for mixed pallets) */
            let itemLayerOverhang = oriPalOverhang % layerCount
            /* Variables for line totals (i.e. values per order position) */
            let baysForOriPals = 0
            let baysForSandwichPals = 0
            let woodPart = 0
            let baysForMixedPals = 0
            let stacked = ''         

            if (equipment === true && stackable === true) {
                /* Calculate the number of pallet bays if original pallets are stackable */
                baysForOriPals = baysForOriPals + oriPal / 2
                /* Calculate the number of pallet bays if sandwich pallets are stackable  */
                baysForSandwichPals = itemsInOriLayers / palletCount / 2
                /* For each sandwich pallet in a given order position, add 1/16 for wood part  */
                woodPart = woodPart + (Math.ceil(baysForSandwichPals)) * 1 / 16
                /* Calculate the number of pallet bays if mixed pallets are stackable  */
                baysForMixedPals = baysForMixedPals + itemLayerOverhang / palletCount / 2
                /* Calculate sub-total for stackable pallets */
                stacked = 'Yes'

            } else {
                /* See if-clause, for non-stackable trade items or if double-deck equipment not agreed/available */
                baysForOriPals = baysForOriPals + oriPal
                baysForSandwichPals = itemsInOriLayers / palletCount
                woodPart = woodPart + (Math.ceil(baysForSandwichPals)) * 1 / 16
                baysForMixedPals = baysForMixedPals + itemLayerOverhang / palletCount
                stacked = 'No'
            }

            /* Calculate row/order totals */
            let subTotalPerRow = baysForOriPals + baysForSandwichPals + woodPart + baysForMixedPals
            sumItemQuantities = sumItemQuantities + quantity
            sumOriPalBays = sumOriPalBays + baysForOriPals
            sumSandwichPalBays = sumSandwichPalBays + baysForSandwichPals + woodPart
            sumMixedPalBays = sumMixedPalBays + baysForMixedPals
            sumTotalBays = sumOriPalBays + sumSandwichPalBays + sumMixedPalBays

            /* Write order position values to table */
            let row = table.insertRow(orderPosCounter)
            let cell = row.insertCell()
            cell.innerText = orderPosCounter
            cell = row.insertCell()
            cell.innerText = stacked
            cell = row.insertCell()
            cell.innerText = quantity
            cell = row.insertCell()
            cell.innerText = baysForOriPals.toFixed(2)
            cell = row.insertCell()
            cell.innerText = (baysForSandwichPals + woodPart).toFixed(2)
            cell = row.insertCell()
            cell.innerText = baysForMixedPals.toFixed(2)
            cell = row.insertCell()
            cell.innerText = subTotalPerRow.toFixed(2)

            /* Write order totals to table */
            sumQuantity.innerText = sumItemQuantities
            sumOriPal.innerText = sumOriPalBays.toFixed(2)
            sumSandwichPal.innerText = sumSandwichPalBays.toFixed(2)
            sumMixPal.innerText = sumMixedPalBays.toFixed(2)
            sumTotal.innerText = Math.ceil(sumTotalBays)

            orderPosCounter++

            /* Clear input fields for new entry */
            document.getElementById("form").reset();
            }
    })
    /* Reset all (sub-)totals, counters, forms */
    clearButton.addEventListener("click", (event) => {
        document.getElementById("form").reset();
        while (table.rows.length > 2) {
            table.deleteRow(1);
        }
        sumQuantity.innerText = 0
        sumOriPal.innerText = 0
        sumSandwichPal.innerText = 0
        sumMixPal.innerText = 0
        sumTotal.innerText = 0
        sumItemQuantities = 0
        sumOriPalBays = 0
        sumSandwichPalBays = 0
        sumMixedPalBays = 0
        sumTotalBays = 0
        orderPosCounter = 1
    })
})