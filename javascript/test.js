/* jshint esversion: 6 */

import baysPerOrderPos from "./index.js"


/*
Test the function `baysPerOrderPos` which maps
$$
(equipment, stackable, palletCount, layerCount, quantity) |-> {stacked, baysForOriPals, baysForSandwichPals , baysForMixedPals , subTotalPerRow}
$$
to hit a few expected data points.
*/
const testBed = [
    {
        "equipment": true,
        "stackable": true,
        "palletCount": 1,
        "layerCount": 1,
        "quantity": 1,
        "stacked": true,
        "baysForOriPals": 0.5,
        "baysForSandwichPals": 0,
        "baysForMixedPals": 0,
        "subTotalPerRow": 0.5
    }
]


function runTests() {
    console.log("⏳️ Tests commencing...")

    for (const data of testBed) {
        const result = baysPerOrderPos(data.equipment, data.stackable, data.palletCount, data.layerCount, data.quantity)

        if (
            data.stacked != result.stacked
            || data.baysForOriPals != result.baysForOriPals
            || data.baysForSandwichPals != result.baysForSandwichPals
            || data.baysForMixedPals != result.baysForMixedPals
            || data.subTotalPerRow != result.subTotalPerRow
        ) {
            throw new Error("Test failed. Expected: " + data + ". Actual: " + result);
        }
        console.log("✔️")
    }

    console.log("🆗 All tests passed.")

}


runTests();