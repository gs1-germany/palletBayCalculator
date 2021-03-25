"use strict";

let dataArray = [];
let sum = 0; 
let subtotal1 = 0; 
let subtotal2 = 0;
let subtotal3 = 0;
let sumStackable = 0; 
let sumNotStackable =0;
let sumDouble = 0;
let i = 1;

function indicateReply() {
    document.getElementById("equipment").checked;
    console.log("Double Deck (Y/N): " + document.getElementById("equipment").checked);
}

function calculateBays() {
    let oriPal = Math.floor((Number(quantity.value)) / Number(palletCount.value));
    console.log("Anzahl Originalpaletten: " + oriPal);

    let oriPalRem = Number(quantity.value) % Number(palletCount.value);
    console.log("Überhang Anzahl bestellte HE: " + oriPalRem);

    let oriLay = Math.floor((oriPalRem / Number(layerCount.value)));
    console.log("Anzahl artikelreine Lagen: " + oriLay);

    let itemsInOriLay = oriLay * Number(layerCount.value);
    console.log("Anzahl HE in Originallagen: " + itemsInOriLay);

    let itemsRem = oriPalRem % Number(layerCount.value); 
    console.log("Rest HE für Mischpalette: " + itemsRem);

    if (document.getElementById("stackable").value == "1" && document.getElementById("doubleDeck").value == "1")  {
        let original1 = oriPal/2;
        console.log("# Originalpaletten: " + original1);
        let sandwich1 = itemsInOriLay/Number(palletCount.value)/2 + 1/16;
        console.log("# Sandwichpaletten: " + sandwich1);
        let mix1 = itemsRem / Number(palletCount.value)/2; 
        console.log("# Mischpaletten: " + mix1);
        let subtotal1 = original1 + sandwich1 + mix1;
        dataArray[dataArray.length] = ["Order position " + i + ": " + subtotal1.toFixed(2)];
        sumStackable = sumStackable + subtotal1; 
    } 
    else if (document.getElementById("stackable").value == "0") { 
        let original2 = oriPal;
        console.log("# Originalpaletten: " + original2);
        let sandwich2 = itemsInOriLay/Number(palletCount.value) + 1/16;
        console.log("# Sandwichpaletten: " + sandwich2);
        let mix2 = itemsRem / Number(palletCount.value); 
        console.log("# Mischpaletten: " + mix2);
        let subtotal2 = original2 + sandwich2 + mix2;
        dataArray[dataArray.length] = ["Order position " + i + ": " + subtotal2.toFixed(2)];
        sumNotStackable = sumNotStackable + subtotal2; 
    }
    else if (document.getElementById("stackable").value == "1" && document.getElementById("doubleDeck").value == "0") { 
        let original3 = oriPal/2;
        console.log("# Originalpaletten: " + original3);
        let sandwich3 = itemsInOriLay/Number(palletCount.value)/2 + 1/16;
        console.log("# Sandwichpaletten: " + sandwich3);
        let mix3 = itemsRem / Number(palletCount.value)/2; 
        console.log("# Mischpaletten: " + mix3);
        let subtotal3 = original3 + sandwich3 + mix3;
        dataArray[dataArray.length] = ["Order position " + i + ": " + subtotal3.toFixed(2)];
        sumDouble = sumDouble + subtotal3; 
    }
    console.log("sumDouble: " + sumDouble);
    console.log("sumStackable: " + sumStackable);

    if (sumDouble > sumStackable && document.getElementById("equipment").checked == false) {
        sum = Math.ceil(sumStackable + sumNotStackable + sumDouble + (sumDouble - sumStackable));
        console.log("# Summe1: " + sum);
    }
    else {
        sum = Math.ceil(sumStackable + sumNotStackable + sumDouble); 
        console.log("# Summe2: " + sum);
    }
    let dALen = dataArray.length;
    let text = "<br><br>Your entries:<br>  <ul style='list-style-type:none;'>";
    for (let j = 0; j < dALen; j++) {
        text += "<li>" + dataArray[j] + "</li>";
    }
    text += "</ul>";
    total.textContent = "Number of required bays: " + sum;
    document.getElementById("history").innerHTML = text;
    document.getElementById("myForm").reset();
    i++;
}

function handleMouseOver(ev) {
    ev.target.style.fontSize = "1.3em";
    ev.target.style.color = "#1e1576";
}

function handleMouseOut(ev) {
    ev.target.style.fontSize = "1.2em";
    ev.target.style.color = "#F5F2F2";
}

function clearCurrentData() {
    dataArray = [];
    document.getElementById("history").innerHTML = dataArray;
    total.textContent = "";
    document.getElementById("myForm").reset();
    i = 1;   
    sum = 0;
    subtotal1 = 0;
    subtotal2 = 0;
    subtotal3 = 0;
    sumStackable = 0;
    sumNotStackable = 0;
    sumDouble = 0;
}