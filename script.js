window.onload = () => {



let pay = document.querySelector("#pu");
let free = document.querySelector("#bz");
let payM = document.querySelector("#puM");
let freeM = document.querySelector("#bzM");


pay.onchange = () => {

let sumpay = document.querySelector(".sumpu p");
sumpay.innerHTML = pay.value * 550 + "р - платные услуги";	

let notb = document.querySelector(".notbonus p");
notb.innerHTML = pay.value * 550 + free.value * 320 + "р - без премии 15к";

let wb = document.querySelector(".withbonus p");
wb.innerHTML = 15000 + pay.value * 550 + free.value * 320 + "р - с премией 15к";


}
payM.onchange = () => {


let sumpayM = document.querySelector(".sumpuM p");
sumpayM.innerHTML = payM.value * 160 + "р - платные услуги";	

let notbM = document.querySelector(".notbonusM p");
notbM.innerHTML = payM.value * 160 + freeM.value * 80 + "р - без премии 20к";

let wbM = document.querySelector(".withbonusM p");
wbM.innerHTML = 20000 + payM.value * 160 + freeM.value * 80 + "р - с премией 20к";


}


free.onchange = () => {

let sumfree = document.querySelector(".sumbz p");
sumfree.innerHTML = free.value * 320 + "р - бесплатные замены";	

let notb = document.querySelector(".notbonus p");
notb.innerHTML = pay.value * 550 + free.value * 320 + "р - без премии 15к";

let wb = document.querySelector(".withbonus p");
wb.innerHTML = 15000 + pay.value * 550 + free.value * 320 + "р - с премией 15к";


}
freeM.onchange = () => {

let sumfreeM = document.querySelector(".sumbzM p");
sumfreeM.innerHTML = freeM.value * 80 + "р - бесплатные замены";	

let notbM = document.querySelector(".notbonusM p");
notbM.innerHTML = payM.value * 160 + freeM.value * 80 + "р - без премии 20к";

let wbM = document.querySelector(".withbonusM p");
wbM.innerHTML = 20000 + payM.value * 160 + freeM.value * 80 + "р - с премией 20к";

}


}
