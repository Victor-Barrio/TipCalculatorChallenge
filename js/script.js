// First, we declare the constants with the elements of the page
const btnReset = document.getElementById("reset");
const inputBill = document.getElementById("bill");
const inputPeople = document.getElementById("people");
const inputTip1 = document.getElementById("5%");
const inputTip2 = document.getElementById("10%");
const inputTip3 = document.getElementById("15%");
const inputTip4 = document.getElementById("25%");
const inputTip5 = document.getElementById("50%");
const inputTipCustom = document.getElementById("custom");
const tipButtons = [inputTip1, inputTip2, inputTip3, inputTip4, inputTip5];
const errorMessage = document.getElementById("error");

let tipAmount = document.getElementById("tipAmount");
let totalAmount = document.getElementById("totalAmount");

// Second, we declare the variables with the values of the elements of the page
let bill = 0;
let people = 0;
let tip = 15;
let total = 0;
let total2 = 0;

// Third, we declare the functions
function notValid(value){
    return isNaN(value) || value === 0;
}

function whatTip(value){
    tip = parseFloat(value);

    // If the tip is correct, we call the function to calculate the tip
    if (tip !== NaN) {
        calculateTip();
    }
}

function calculateTip() {
    // We get the values of the elements of the page
    bill = parseFloat(inputBill.value);
    people = parseFloat(inputPeople.value);


    // We check if the value any of the inputs is 0
    if (notValid(bill) || notValid(people) || notValid(tip)) {
        console.log("Error on calculating the tip");
        btnReset.classList.add("disabled");
        btnReset.disabled = true;
        tipAmount.innerText = "$0.00";
        totalAmount.innerText = "$0.00";
    } else {
        // We calculate the tip
        total = bill * tip / 100 / people;
        total2 = bill / people + total;

        // We update the values of the elements of the page
        tipAmount.innerText = `$${total.toFixed(2)}`;
        totalAmount.innerText = `$${total2.toFixed(2)}`;

        // We change the button to enabled
        btnReset.classList.remove("disabled");
        btnReset.disabled = false;
    }

    // We check if the number of people is minimum 1
    if (people >= 1){
        // We change the error message display
        errorMessage.style.display = "none";
        inputPeople.classList.remove("errorMessage");
    } else {
        // We add the error message display
        errorMessage.style.display = "block";
        inputPeople.classList.add("errorMessage");
    }
}

// We add the event listeners
inputBill.addEventListener("blur", calculateTip);
inputPeople.addEventListener("blur", calculateTip);

tipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // We add the class to the selected button
        tipButtons.forEach(btn => btn.classList.remove("selected"));
        inputTipCustom.value = "";
        btn.classList.add("selected");
        
        // We call the function to calculate the tip
        whatTip(btn.id);
    })
});

inputTipCustom.addEventListener("blur", () => {
    // We remove the class from all the buttons
    tipButtons.forEach(btn => btn.classList.remove("selected"));

    // We call the function to calculate the tip
    whatTip(inputTipCustom.value);
});

btnReset.addEventListener("click", () => {
    // We reset the values of the elements of the page
    inputBill.value = "";
    inputPeople.value = "";
    inputTipCustom.value = "";
    tipButtons.forEach(btn => btn.classList.remove("selected"));
    inputTip3.classList.add("selected");
    errorMessage.style.display = "block";
    inputPeople.classList.add("errorMessage");
    btnReset.classList.add("disabled");
    btnReset.disabled = true;
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";
});