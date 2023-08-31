/**
 * Accepts a specification of a shipment consisting of pallets. Calculates the number of sandwich/mixed pallets (pallet bays) 
 * for the space-usage-optimized shipment.
 * 
 * See https://www.gs1-germany.de/gs1-standards/umsetzung/fachpublikationen/detailansicht/87664/ for the details.
 * 
 * @param {boolean} equipment - Indication whether double-deck equipment is agreed/available (yes: true, no: false). This means if pallets may be stacked in the truck.
 * @param {boolean} stackable - Indication whether trade items are stackable/double-deck capable (yes: true, no: false). This means whether pallets may be stacked (depending on product).
 * @param {number} palletCount - Number of trade items per original pallet. 
 * @param {number} layerCount - Number of trade items per pallet layer.
 * @param {number} quantity - Number of ordered trade items.
 * @returns {Map<String, ReturnMap}
 * @typedef {Object} ReturnMap
 * @property {boolean} stacked - Indication whether trade items are stacked for transport (yes: true, no: false).
 * @property {number} baysForOriPals - Number of original pallets.
 * @property {number} baysForSandwichPals - Number of sandwich pallets.
 * @property {number} baysForMixedPals - Number of mixed pallets.
 * @property {number} subTotalPerRow - Number of total pallets per order position/trade item row.
 */

/* jshint esversion: 6 */

export function baysPerOrderPos(equipment, stackable, palletCount, layerCount, quantity) {
    "use strict";
    /* Calculate number of original pallets */
    let oriPal = Math.floor(quantity / palletCount);
    /* Calculate overhang of ordered trade items from original pallets */
    let oriPalOverhang = quantity % palletCount;
    /* Calculate number of overhanging single-item/homogeneous layers */
    let singleItemLayer = Math.floor(oriPalOverhang / layerCount);
    /* Calculate number of trade items in overhanging single-item/homogeneous layers */
    let itemsInOriLayers = singleItemLayer * layerCount;
    /* Calculate overhang of trade items from the above single-item/homogeneous layers (i.e. for mixed pallets) */
    let itemLayerOverhang = oriPalOverhang % layerCount;
    /* Variables for line totals (i.e. values per order position) */
    let baysForOriPals = 0;
    let baysForSandwichPals = 0;
    let woodPart = 0;
    let baysForMixedPals = 0;
    let stacked = '';

    if (equipment === true && stackable === true) {
        /* Calculate the number of pallet bays if original pallets are stackable */
        baysForOriPals = baysForOriPals + oriPal / 2;
        /* Calculate the number of pallet bays if sandwich pallets are stackable  */
        baysForSandwichPals = itemsInOriLayers / palletCount / 2;
        /* For each sandwich pallet in a given order position, add 1/16 for wood part  */
        woodPart = woodPart + (Math.ceil(baysForSandwichPals)) * 1 / 16;
        /* Calculate the number of pallet bays if mixed pallets are stackable  */
        baysForMixedPals = baysForMixedPals + itemLayerOverhang / palletCount / 2;
        /* Calculate sub-total for stackable pallets */
        stacked = true;

    } else {
        /* See if-clause, for non-stackable trade items or if double-deck equipment not agreed/available */
        baysForOriPals = baysForOriPals + oriPal;
        baysForSandwichPals = itemsInOriLayers / palletCount;
        woodPart = woodPart + (Math.ceil(baysForSandwichPals)) * 1 / 16;
        baysForMixedPals = baysForMixedPals + itemLayerOverhang / palletCount;
        stacked = false;
    }
    /* Calculate pallet bay demand per order position */
    let subTotalPerRow = baysForOriPals + baysForSandwichPals + woodPart + baysForMixedPals;
    let orderPosResults = { stacked: stacked, baysForOriPals: baysForOriPals, baysForSandwichPals: (baysForSandwichPals + woodPart), baysForMixedPals: baysForMixedPals, subTotalPerRow: subTotalPerRow };

    console.log({ equipment, stackable, palletCount, layerCount, quantity, stacked, baysForOriPals, baysForSandwichPals, baysForMixedPals, subTotalPerRow })

    return (orderPosResults);
};

export default baysPerOrderPos;

