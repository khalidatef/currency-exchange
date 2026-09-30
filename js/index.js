import { COUNTRY_NAMES } from "./data.js";

const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");
const amount = document.querySelector("#amount");
const btn = document.querySelector("#convertBtn");
const result = document.querySelector("#result");
const fromFlag = document.querySelector("#fromFlag");
const toFlag = document.querySelector("#toFlag");

let countries = Object.entries(COUNTRY_NAMES)
  .map(([code, country]) => {
    return `<option value="${code}">${country}</option>`;
  })
  .join("");

fromCurrency.innerHTML = countries;
toCurrency.innerHTML = countries;

fromCurrency.value = "AED";
toCurrency.value = "AED";
result.innerHTML = `1 AED = 1.00 AED`;
function changeFlag(currency, flag) {
  let countryCode = currency.value.slice(0, 2);

  flag.src = `https://flagsapi.com/${countryCode}/shiny/32.png`;
}

changeFlag(fromCurrency, fromFlag);
changeFlag(toCurrency, toFlag);

fromCurrency.addEventListener("change", () => {
  changeFlag(fromCurrency, fromFlag);
});

toCurrency.addEventListener("change", () => {
  changeFlag(toCurrency, toFlag);
});

btn.addEventListener("click", () => {
  fetch(
    `https://v6.exchangerate-api.com/v6/b1405ff6996d0d1ce1ffd356/latest/${fromCurrency.value}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let rate = data.conversion_rates[toCurrency.value];

      let finalResult = (amount.value * rate).toFixed(2);

      result.innerHTML = `${amount.value} ${fromCurrency.value} = ${finalResult} ${toCurrency.value}`;
    });
});
