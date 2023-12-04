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
    },
    {
        "equipment": true,
        "stackable": true,
        "palletCount": 1000,
        "layerCount": 10,
        "quantity": 10000,
        "stacked": true,
        "baysForOriPals": 5,
        "baysForSandwichPals": 0,
        "baysForMixedPals": 0,
        "subTotalPerRow": 5
    },
    {
        "equipment": false,
        "stackable": true,
        "palletCount": 1000,
        "layerCount": 10,
        "quantity": 10000,
        "stacked": false,
        "baysForOriPals": 10,
        "baysForSandwichPals": 0,
        "baysForMixedPals": 0,
        "subTotalPerRow": 10
    },
    {
        "equipment": false,
        "stackable": false,
        "palletCount": 1000,
        "layerCount": 10,
        "quantity": 10000,
        "stacked": false,
        "baysForOriPals": 10,
        "baysForSandwichPals": 0,
        "baysForMixedPals": 0,
        "subTotalPerRow": 10
    },
    {
        "equipment": true,
        "stackable": false,
        "palletCount": 1000,
        "layerCount": 10,
        "quantity": 10000,
        "stacked": false,
        "baysForOriPals": 10,
        "baysForSandwichPals": 0,
        "baysForMixedPals": 0,
        "subTotalPerRow": 10
    },
    // from pdf
    {
        "equipment": true,
        "stackable": true,
        "palletCount": 356,
        "layerCount": 60,
        "quantity": 10,
        "stacked": true,
        "baysForOriPals": 5,
        "baysForSandwichPals": 5,
        "baysForMixedPals": 0.014044943820224719,
        "subTotalPerRow": 0.014044943820224719
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
            console.error("❌ test failed. Expected: ", data, "Actual: ", result)
            throw new Error("Test failed.");
        }
        console.log("✔️")
    }

    console.log("🆗 All tests passed.")

}


runTests();