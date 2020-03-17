function calculateBays() {
    op = Math.floor((Number(quantity.value)) / Number(palletCount.value)) / 2; /* required bays for original pallets */
    opRem = Number(quantity.value) % Number(palletCount.value);
    ol = opRem / Number(layerCount.value);
    olRem = opRem % Number(layerCount.value);
    /* WIESO "9"? WIESO "(1/16)"? */
    if (document.getElementById("stackable").value == "1") {
        sp = ((Math.floor(ol) * Number(layerCount.value)) / Number(palletCount.value) / 2) + (1 / 16); /* required bays for sandwich pallets */
        mp = olRem / Number(palletCount.value) / 2; /* required bays for mixed pallets */
        outp.textContent = "Number of required bays: " + Math.ceil(op + sp + mp);
    } else if (document.getElementById("stackable").value == "0") {
        outp.textContent = "Number of required bays: " + Math.ceil((Number(quantity.value)) / Number(palletCount.value));
    }
}

btn.addEventListener("click", handleClick);

function handleClick() {
    console.log("button pushed");
}

function handleMouseOver(ev) {
    ev.target.style.fontSize = "1.2em";
    ev.target.style.color = "#F06216";
}

function handleMouseOut(ev) {
    ev.target.style.fontSize = "1.1em";
    ev.target.style.color = "#1E1576";
}