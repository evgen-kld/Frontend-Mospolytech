'use strict'

//Возведение в степень
function pow(x,n) {
        let c = 1;
    for (let i = 0; i < n; i++) {
        c *= x;
    }
    return c
}

