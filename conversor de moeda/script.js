
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const api = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL";
let currencyRates = {};

async function getExchangeRates() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        currencyRates = data;
        console.log(currencyRates);
    } catch (error) {
        console.error("Erro ao obter cotação: ", error);
    }
}

async function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);

    if (isNaN(inputCurrencyValue)) {
        alert("Por favor, insira um valor numérico.");
        return;
    }

    const currencyValueConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    let exchangeRate;
    switch (currencySelect.value) {
        case "dolar":
            exchangeRate = currencyRates.USDBRL.high;
            break;
        case "euro":
            exchangeRate = currencyRates.EURBRL.high;
            break;
        case "libra":
            
            exchangeRate = currencyRates.GBPBRL.high;
            break;
        // case "bitcoin":
        //     
        //     exchangeRate = currencyRates.BTCBRL.high;
        //     break;
        case "iene":
            exchangeRate = currencyRates.JPYBRL.high;
            break;
        default:
            alert("Moeda não suportada.");
            return;
    }

    const convertedValue = inputCurrencyValue / exchangeRate;

    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(convertedValue);

    currencyValueConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(inputCurrencyValue);

}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector(".currency-img");

    switch (currencySelect.value) {
        case "dolar":
            currencyName.innerHTML = "Dólar Americano";
            currencyImg.src = "./assets/dolar.png";
            break;
        case "euro":
            currencyName.innerHTML = "Euro";
            currencyImg.src = "./assets/euro.png";
            break;
        case "libra":
            currencyName.innerHTML = "Libra";
            currencyImg.src = "./assets/libra.png";
            break;
        case "iene":
            currencyName.innerHTML = "Iene";
            currencyImg.src = "./assets/japao.png";
            break;
        default:
            currencyName.innerHTML = "";
            currencyImg.src = "";
            break;
    }

    convertValues();
}

getExchangeRates(); 
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

