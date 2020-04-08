let dataArray = [];
let sum = 0; 
let subtotal1 = 0; 
let subtotal2 = 0;
let subtotal3 = 0;
let sumStackable = 0; 
let sumNotStackable =0;
let sumDouble = 0;
let i = 1;

function calculateBays() {
    oriPal = Math.floor((Number(quantity.value)) / Number(palletCount.value));
    console.log("Anzahl Originalpaletten: " + oriPal);

    oriPalRem = Number(quantity.value) % Number(palletCount.value);
    console.log("Überhang Anzahl bestellte HE: " + oriPalRem);

    oriLay = Math.floor((oriPalRem / Number(layerCount.value)));
    console.log("Anzahl artikelreine Lagen: " + oriLay);

    itemsInOriLay = oriLay * Number(layerCount.value);
    console.log("Anzahl HE in Originallagen: " + itemsInOriLay);

    itemsRem = oriPalRem % Number(layerCount.value); 
    console.log("Rest HE für Mischpalette: " + itemsRem);

    if (document.getElementById("stackable").value == "1" && document.getElementById("doubleDeck").value == "1")  {
        original1 = oriPal/2;
        console.log("# Originalpaletten: " + original1);
        sandwich1 = itemsInOriLay/Number(palletCount.value)/2 + 1/16;
        console.log("# Sandwichpaletten: " + sandwich1);
        mix1 = itemsRem / Number(palletCount.value)/2; 
        console.log("# Mischpaletten: " + mix1);
        subtotal1 = original1 + sandwich1 + mix1;
        dataArray[dataArray.length] = ["Order position " + i + ": " + subtotal1.toFixed(2)];
        sumStackable = sumStackable + subtotal1; 
    } 
    else if (document.getElementById("stackable").value == "0") { 
        original2 = oriPal;
        console.log("# Originalpaletten: " + original2);
        sandwich2 = itemsInOriLay/Number(palletCount.value) + 1/16;
        console.log("# Sandwichpaletten: " + sandwich2);
        mix2 = itemsRem / Number(palletCount.value); 
        console.log("# Mischpaletten: " + mix2);
        subtotal2 = original2 + sandwich2 + mix2;
        dataArray[dataArray.length] = ["Order position " + i + ": " + subtotal2.toFixed(2)];
        sumNotStackable = sumNotStackable + subtotal2; 
        console.log("sumNotStackable: " + sumNotStackable);
    }
    else if (document.getElementById("stackable").value == "1" && document.getElementById("doubleDeck").value == "0") { 
        original3 = oriPal/2;
        console.log("# Originalpaletten: " + original3);
        sandwich3 = itemsInOriLay/Number(palletCount.value)/2 + 1/16;
        console.log("# Sandwichpaletten: " + sandwich3);
        mix3 = itemsRem / Number(palletCount.value)/2; 
        console.log("# Mischpaletten: " + mix3);
        subtotal3 = original3 + sandwich3 + mix3;
        dataArray[dataArray.length] = ["Order position " + i + ": " + subtotal3.toFixed(2)];
        sumDouble = sumDouble + subtotal3; 
    }

    if (sumDouble > sumStackable) {
        sum = Math.ceil(sumStackable + sumNotStackable + sumDouble + (sumDouble - sumStackable));
        console.log("# Summe1: " + sum);
    }
    else {
        sum = Math.ceil(sumStackable + sumNotStackable + sumDouble); 
        console.log("# Summe2: " + sum);
    }
    dALen = dataArray.length;
    text = "<br><br>Your entries:<br>  <ul style='list-style-type:none;'>";
    for (j = 0; j < dALen; j++) {
        text += "<li>" + dataArray[j] + "</li>";
    }
    text += "</ul>";
    total.textContent = "Number of required bays: " + sum;
    document.getElementById("history").innerHTML = text;

    document.getElementById("myForm").reset();
    i++;
}

function handleMouseOver(ev) {
    ev.target.style.fontSize = "1.1em";
    ev.target.style.color = "#F06216";
}

function handleMouseOut(ev) {
    ev.target.style.fontSize = "1.0em";
    ev.target.style.color = "#1E1576";
}

function clearCurrentData() {
    dataArray = [];
    document.getElementById("history").innerHTML = dataArray;
    total.textContent = "";
    document.getElementById("myForm").reset();
    i = 1;   
    sum, subtotal1, subtotal2, subtotal3, sumStackable, sumNotStackable, sumDouble = 0;
}