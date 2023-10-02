window.onload = () => {



let pay = document.querySelector("#pu");
let free = document.querySelector("#bz");



pay.onchange = () => {

let sumpay = document.querySelector(".sumpu p");
sumpay.innerHTML = pay.value * 500 + "р - платные услуги";	

let notb = document.querySelector(".notbonus p");
notb.innerHTML = pay.value * 500 + free.value * 300 + "р - без премии 10к";

let wb = document.querySelector(".withbonus p");
wb.innerHTML = 10000 + pay.value * 500 + free.value * 300 + "р - с премии 10к";



}


free.onchange = () => {

let sumfree = document.querySelector(".sumbz p");
sumfree.innerHTML = free.value * 300 + "р - бесплатные замены";	

let notb = document.querySelector(".notbonus p");
notb.innerHTML = pay.value * 500 + free.value * 300+ "р - без премии 10к";

let wb = document.querySelector(".withbonus p");
wb.innerHTML = 10000 + pay.value * 500 + free.value * 300 + "р - с премии 10к";

}


}