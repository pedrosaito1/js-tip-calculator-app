//Values

const billInput = document.querySelector('#bill');
const peopleInput = document.querySelector('#people');
const tipBtns = document.querySelectorAll('.tip-btn');
const tipBtnCustom = document.querySelector('#custom');
const resultAmount = document.querySelector('#amount');
const resultTotal = document.querySelector('#total');
const reset = document.querySelector('#reset');

//Default values

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15; //equivalent to 15%

//Validations

function validInt(number) {
    return number.toString().match(/^[0-9]*$/);
};

function validFloat(number) {
    return number.toString().match(/^[0-9]*\.?[0-9]*$/);
};

//Add events

billInput.addEventListener('input', setBillValue);
tipBtns.forEach(button => {
    button.addEventListener('click', setTipValue);
});
tipBtnCustom.addEventListener('input', setTipCustomValue);
peopleInput.addEventListener('input', setPeopleValue);
reset.addEventListener('click', resetApp);

//Functions

function setBillValue() {
    if(billInput.value.includes(',')) {
        billInput.value = billInput.value.replace(',', '.');
    };

    if(!validFloat(billInput.value)) {
        billInput.value = billInput.value.substring(0, billInput.length-1);
    };

    billValue = parseFloat(billInput.value);
};

function setTipValue (e) {
    tipBtns.forEach(button => {
        button.classList.remove('active');

        if(e.target.innerHTML == button.innerHTML) {
            button.classList.add('active');
            tipValue = parseFloat (
                button.innerHTML
            )/100;
        }
    });
};

function setTipCustomValue() {
    tipValue = parseFloat(tipBtnCustom.value/100);
    
    tipBtns.forEach(button => {
        button.classList.remove('active');
    });
};

function setPeopleValue() {
    const error = document.querySelector('.error');

    if(!validInt(peopleInput.value)) {
        peopleInput.value = peopleInput.value.substring(0, peopleInput.length-1);
    }

    peopleValue = parseFloat(peopleInput.value);

    if(peopleValue <= 0) {
        error.classList.add('active');
    } else {
        error.classList.remove('active');
    }

    calculateApp();
};

function calculateApp() {
    if(peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        resultAmount.innerHTML = '$' + tipAmount.toFixed(2);
        resultTotal.innerHTML = '$' + total.toFixed(2);
    };
};

function resetApp() {
    billInput.value = 0.00;
    setBillValue();

    peopleInput.value = 1;
    setPeopleValue();
};
