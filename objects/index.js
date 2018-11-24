'use strict';
var positions = [
  'Телепорт бытовой VZHIH-101',
  'Отвертка ультразвуковая WHO-D',
  'Ховерборд Mattel 2016',
  'Нейтрализатор FLASH black edition',
  'Меч световой FORCE (синий луч)'
];

var prices = [
  10000,
  4800,
  9200,
  2500,
  57000
];

var hitName = positions[2], hitPrice = prices[2];

console.log('Задача №1\n-----------------');
var hit = {};
hit['name'] = hitName;
hit['price'] = hitPrice;

console.log(`Хит продаж мартобря: <${hit.name}> цена ${hit.price} Q`);

console.log('_______________\n\n\nЗадача №2\n-----------------');
var items = [];

for (let i = 0; i < positions.length; i++) {
  var position = {
    name : positions[i],
    price : prices[i]
  };
  items.push(position);
}
console.log(`Купите ${items[4]['name']} по цене ${items[4]['price']} Q`);

console.log('_______________\n\n\nЗадача №3\n-----------------');
function showDiscout (nameOfPosition, quantity) {    
  let discount = 0;
  if (quantity < 10) {
    discount = 0.05;
  } else if (quantity < 50) {
    discount = 0.07;
  } else if (quantity < 100) {
    discount = 0.1;
  } else {
    discount = 0.15;
  }
  let initialPrice = nameOfPosition['price'] * quantity;
  let cash = initialPrice - initialPrice * discount;
  let profit = initialPrice - cash;
  let positionName = nameOfPosition['name'];

  console.log(`${positionName} - стоимость партии из ${quantity} штук ${cash} Q (скидка ${discount * 1000 / 10} %), ваша выгода ${profit} Q!`)
}

showDiscout(items[0], 12);
showDiscout(items[3], 97); 

console.log('_______________\n\n\nЗадача №4\n-----------------');
items[3]['amount'] = 4;

function updateAmount (itemPosition, consumption = 1) {
  // может сохранить items[itemPosition]['amount'] в переменную?
  /*Вначале я так и делал, но подумал, что может возникнуть вопрос -
  "не много ли переменных?" Но если это делается для сокращения,
  то логично проделать то-же самое и для items[itemPosition]['name'].
  Так и сделал. */
  let itemAmount = items[itemPosition]['amount'];
  let itemName = items[itemPosition]['name'];
  if (itemAmount === undefined) {
    return;
  } else if (itemAmount === 0 || itemAmount < consumption) {
    console.log(`${itemName} закончился на складе.`);
  } else if (itemAmount > consumption) {
    items[itemPosition]['amount'] -= consumption; // так не получится. Вы меняете переменную, она уже никак не связана с самим объектом и его свойством amount. В результате у вас количество товара не уменьшается
    /*Это понял. А для чего тогда нужно было сохранять items[itemPosition]['amount'] в переменную?*/
    console.log(`${itemName} - остаток ${items[itemPosition]['amount']} шт.`);
  } else if (itemAmount === consumption) {
    items[itemPosition]['amount'] -= consumption;
    console.log(`Это был последний ${itemName}, вам повезло!`);
  }
} 

updateAmount(1, 17);
updateAmount(3, 3);
updateAmount(3);

