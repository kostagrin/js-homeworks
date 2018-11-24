'use strict';
var positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    producer: {
      name: 'Рязанский телепортостроительный завод',
      deferPeriod: 10,
      lot: 3
    },
    price: 10000
  },
  {
    title: 'Ховерборд Mattel 2016',
    producer: {
      name: 'Волжский Ховерборд Завод',
      deferPeriod: 24,
      lot: 14
    },
    price: 9200
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    producer: {
      name: 'Тульский оружейный комбинат',
      deferPeriod: 5,
      lot: 1
    },
    price: 57000
  }
];

console.log('Задача №1\n---------');
function lotCalculator (productName, quantity) {
  if (productName === undefined) {
    return;
  }
  let order = {
    lots  : 0, 
    total : 0,
  };

  let checkLot = productName['producer']['lot']; // lot content
  let minLotAmount = Math.ceil(quantity / checkLot);
  let cash = productName.price * minLotAmount * productName.producer.lot;

  order['lots']  = minLotAmount;
  order['total'] = cash;
  return order;  
}

function showResult (position, quantity) {
  let name = position.title;
  let cart = quantity;
  let result = lotCalculator(positions[1], 15);
  console.log(`${name}, ${cart} штук: заказать партий ${result.lots}, стоимость ${result.total} Q`);
}

showResult(positions[1], 15);

console.log('______________\n\n\nЗадача №2\n---------')
const deferedPayments = [];

function deferPay (producer, sum, purchaseDate) {
		let purchaseDateDay = purchaseDate.getDate(); // дата покупки
		var duePayDate = new Date(purchaseDate); // копия даты покупки
		let deferment = purchaseDateDay + producer.deferPeriod; // число отсрочки
    duePayDate.setDate(deferment);  // дата отсрочки
		let purchaseRecord = {
			producer : producer,
			amount : sum,
			paymentDate : duePayDate   
		}
		deferedPayments.push(purchaseRecord);	
} // function brace

deferPay (positions[1].producer, 10000, new Date(2018, 8 - 1, 1));

console.log(`${deferedPayments[0].paymentDate.toLocaleDateString('ru-Ru')}: ${deferedPayments[0].producer.name}, сумма ${deferedPayments[0].amount} Q`);


console.log('______________\n\n\nЗадача №3\n---------')
function loadCurrencyJSON() {
  return '{"AUD":44.95,"AZN":33.73,"GBP":73.42,"AMD":0.12,"BYN":30.96,"BGN":32.01,"BRL":18.8,"HUF":0.2,"DKK":8.42,"USD":58.85,"EUR":62.68,"INR":0.88,"KZT":0.18,"CAD":44.74,"KGS":0.85,"CNY":8.55,"MDL":2.94,"NOK":7.02,"PLN":14.55,"RON":13.92,"ZZZ":79.91,"SGD":41.36,"TJS":7.43,"TRY":15.97,"TMT":16.84,"UZS":0.02,"UAH":2.16,"CZK":2.32,"SEK":6.6,"CHF":58.69,"ZAR":4.4,"KRW":0.05,"JPY":0.52}';
}

function convertCurrency (amount, from, to) {
  try {
    let currency = JSON.parse(loadCurrencyJSON());
    let exchange = amount * currency[from] / currency[to];
    return +exchange.toFixed(2); // convert string to number
  } catch (err) {
      return err;
    }  
}

let price1 = convertCurrency(7000, 'KGS', 'CNY');
console.log(`Сумма ${price1} CNY`);

let price2 = convertCurrency(2500, 'TRY', 'INR');
console.log(`Сумма ${price2} INR`);

let price3 = convertCurrency(100, 'BGN', 'TJS');
console.log(`Сумма ${price3} TJS`);