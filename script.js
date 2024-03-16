window.onload = () => {



let pay = document.querySelector("#pu");
let free = document.querySelector("#bz");



pay.onchange = () => {

let sumpay = document.querySelector(".sumpu p");
sumpay.innerHTML = pay.value * 500 + "р - платные услуги";	

let notb = document.querySelector(".notbonus p");
notb.innerHTML = pay.value * 500 + free.value * 320 + "р - без премии 15к";

let wb = document.querySelector(".withbonus p");
wb.innerHTML = 15000 + pay.value * 500 + free.value * 320 + "р - с премией 15к";



}


free.onchange = () => {

let sumfree = document.querySelector(".sumbz p");
sumfree.innerHTML = free.value * 320 + "р - бесплатные замены";	

let notb = document.querySelector(".notbonus p");
notb.innerHTML = pay.value * 500 + free.value * 320 + "р - без премии 15к";

let wb = document.querySelector(".withbonus p");
wb.innerHTML = 15000 + pay.value * 500 + free.value * 320 + "р - с премией 15к";

}


}
