'use strict'

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

console.log(pluralizeRecords(1))