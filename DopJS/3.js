'use strict'

//Наименьшая цифра
function minDigit(x) {
    let mas = []
    while (x != 0) {
        let a = x % 10;
        mas.push(a);
        x = Math.floor(x / 10);
    }
    mas = mas.sort();
    return mas[0];
}

console.log(minDigit(103123))