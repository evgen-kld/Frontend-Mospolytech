'use strict'

//Возведение в степень
function pow(x,n) {
        let c = 1;
    for (let i = 0; i < n; i++) {
        c *= x;
    }
    return c
}

//Нахождение НОД
function gcd(a,b) {
    while (b != 0) {
        if (a > b) {
            a = a - b;
        }
        else {
            b = b - a;
        }
    }
    return a;
}

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

//Pluralization
function pluralizeRecords(i) {
    if (i % 10 == 1) {
        return "В результате выполнения запроса было найдено " + i + " запись";
    } else if (i % 10 == 2 || i % 10 == 3 || i % 10 == 4) {
        return "В результате выполнения запроса было найдено " + i + " записи";
    } else if (i % 10 == 0 || i % 10 == 5 || i % 10 == 6 || i % 10 == 7 || i % 10 == 8 || i % 10 == 9) {
        return "В результате выполнения запроса было найдено " + i + " записей";
    }
}

//Числа Фибоначчи
function fibb(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
}



console.log(fibb(5))
console.log(pluralizeRecords(1))
console.log(minDigit(103123))  
console.log(gcd(30,18))
console.log(pow(3,3))