'use strict'

let mas = [1, 5, 7, 15, 3, 8, 6]
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var vec1 = new Vec(1, 2, 3);
var vec2 = new Vec(4, 5, 6);
let scalar = 7

function matrixSort(matrix) {
    let minMatrix = []
    for (let i = 0; i < matrix.length; i++) {
        minMatrix.push(bubbleSort(matrix[i])[0])
    }
    return bubbleSort(minMatrix)[minMatrix.length - 1]
} 


function bubbleSort(mas) {
    for (let i = 0; i < mas.length - 1; i++) 
    {
        for (let j = 0; j < mas.length - 1; j++) {
            if (mas[j] > mas[j + 1]) {
                let a = mas[j];
                mas[j] = mas[j + 1];
                mas[j + 1] = a;
            }
        }
    }
    return mas;
}




function Vec(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}



function vecSum (vec1, vec2) {
    let x = vec1.x + vec2.x;
    let y = vec1.y + vec2.y;
    let z = vec1.z + vec2.z;
    var vecSum = new Vec(x, y, z);
    return vecSum;
}

function vecProizv (vec1, vec2) {
    let x = vec1.x * vec2.x;
    let y = vec1.y * vec2.y;
    let z = vec1.z * vec2.z;
    var vecProizv = new Vec(x, y, z);
    return vecProizv;
}

function vecRazn (vec1, vec2) {
    let x = vec1.x + vec2.x * (-1);
    let y = vec1.y + vec2.y * (-1);
    let z = vec1.z + vec2.z * (-1);
    var vecRazn = new Vec(x, y, z);
    return vecRazn;
}

function vecScal (vec1, scal) {
    let x = vec1.x * scalar;
    let y = vec1.y * scalar;
    let z = vec1.z * scalar;
    var vecScal = new Vec(x, y, z);
    return vecScal;
}

function vecDlina (vec1, vec2) {
    let dlina = Math.pow(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2) + Math.pow(vec2.z - vec1.z, 2), 0.5);
    return dlina
}

function vecScalProizv (vec1, vec2) {
    let vec = vecProizv(vec1, vec2)
    return vec.x + vec.y + vec.z
}


function Sdvig (mas, k) {
    for (let i = 0; i < k; i++){
        let a = mas[0];
        mas.shift();
        mas.push(a)
    }
    return mas
}

console.log(Sdvig(mas, 2));
console.log(bubbleSort(mas));
console.log(matrixSort(matrix));
console.log(vecSum (vec1, vec2));
console.log(vecProizv (vec1, vec2));
console.log(vecRazn (vec1, vec2));
console.log(vecScal (vec1, scalar));
console.log(vecDlina (vec1, vec2));
console.log(vecScalProizv (vec1, vec2));
