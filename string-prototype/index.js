'use strict';
function showSpecialPrice() {
  console.log('Введен секретный код. Все цены уменьшены вдвое!');
}
console.log('Задача №1\n-------------------');

function fixAmount(amount) {
  if (typeof amount === 'number') {
    return amount;
  } else {
    let strOfAmount = amount.trim().split(' ').shift();
    let numOfAmount = +strOfAmount.replace(/,/, '.');
    return numOfAmount = (typeof numOfAmount === 'number') && (Number.isNaN(numOfAmount)) ? -1 : numOfAmount;
  }
}

const orders = [
  { price: 21, amount: 4 },
  { price: 50, amount: '17 штук' },
  { price: 7,  amount: '1,5 килограмма' },
  { price: 2,  amount: ' 2.7 метра ' },
  { price: 1,  amount: 'семь единиц' }
];

for (let order of orders) {
  let result = fixAmount(order.amount);
    console.log(`Заказ на сумму: ${result * order.price} Q`);
}

console.log('___________________\n\nЗадача №2\n-------------------');
function handleKey (key) {
    if (keys.slice(-4).join('').toLowerCase() === 'r2d2') {
    showSpecialPrice();
  } 
}

var keys = ['2', '4', 'R', '2', 'd', '2'];
handleKey(keys);

console.log('___________________\n\nЗадача №3\n-------------------');
const csvData = [
  '12,Телепорт бытовой VZHIH-101 ,17,10000',
  '77, Меч световой FORCE (синий луч), 2,57000'
];

const cellNames = ['id', 'name', 'amount', 'price'];

function parseData(names, data, separator = ',') {
  let arrData = []; // вспомогательный массив-матрёшка 
  let finalData = [];
  
  for (let item of csvData) {
    arrData.push(item.split(separator));
  }
  arrData.forEach( function (item) {
    let objData = {};
    for (let i = 0; i < cellNames.length; i++) {
      objData[cellNames[i]] = item[i];
    }
    finalData.push(objData);
  });
  return finalData;
}

console.log(parseData(cellNames, csvData));