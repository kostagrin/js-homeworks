'use strict';
console.log('Задача №1\n_________');

var warrantyPeriod = 2; // ввести срок гарантии (1, 2 или оставить переменную без присвоения значения)
function warrantyTerms(warrantyPeriod) {
	switch (warrantyPeriod) {
		case 1:
			return 1250;
			break;
		case 2:
			return 2300;
			break;
		default:
			return 0;
	}
}
var warrantyPrice = warrantyTerms(warrantyPeriod);
console.log(`Дополнительное гарантийное обслуживание: ${warrantyPrice} Q`);


console.log(' \n------------------------\nЗадача №2\n_________');
var message = 'Чтобы научться плавать, нужно плавать.'; // параметр функции со значением, сохранённый в переменную
var messageContent = message.split(' '); // разделяем текст на отдельные слова, чтобы посчитать их
var oneWordPrice = 11;

function inscription(message) {
  var countWords = messageContent.length; // считаем слова и сохраняем их в переменную
  return countWords * oneWordPrice; // возвращяем стоимость всей гравировки
}
var messagePrice = inscription(message); // вызываем функцию, передаём ей параметр со значением и сохраняем результат работы функции в переменную

console.log(`Подарочная упаковка и гравировка: ${messagePrice} Q`);


console.log(' \n------------------------\nЗадача №3\n_________');
var locations = [
  'Луна',
  'Крабовидная туманность',
  'Галактика Туманность Андромеды',
  'Туманность Ориона',
  'Звезда смерти'
]
// список цен (Строго зависит от списка адресов. Обязятелен!)
var priceList = [
  150,
  250,
  550,
  600,
  'договорная цена'
]

function deliveryService (deliver, location) {
  if (deliver === 'да') { // проверяем нужна ли доставка
    if (locations.includes(location)) { // если нужна, сверяем с массивом пунтктов доставки
      var locationIndex = locations.indexOf(location); // если пункт существует, ищем его индекс
      var price = priceList[locationIndex]; // по индексу находим стоимость доставки
      return price; // возвращяем стоимость
    } else {
      return NaN; // если в параметре location допущена ошибка
    }
  } else {
    return 0; // если доставка не нужна
  }
}

// !!! Если доставка нужна, ввести первым параметром "да". !!!
var deliveryPrice = deliveryService('да', 'Крабовидная туманность');

if (Number.isNaN(deliveryPrice) === true) {
  console.log(`Ошибка при расчете стоимости доставки`);
} else if (deliveryPrice !== 0) {
  console.log(`Стоимость доставки: ${deliveryPrice} Q`);
} else {
  console.log(`Доставка не требуется`);
}


console.log(' \n------------------------\nЗадача №4\n_________');
var orderSumm = 5855; // ввести общую стоимость заказа
var delivery = 'да';
var deliveryLocation = 'Туманность Ориона';

function totalFunction (orderSumm, warranty, isMessage, isDeliver, deliveryLocation) {  
  console.log(`Общая стоимость заказа ${orderSumm} Q.`);
  if (warranty === 1) {
    console.log(`Из них ${warrantyPrice} Q за гарантийное обслуживание на ${warranty} год.`);
  } else if (warranty === 2) {
    console.log(`Из них ${warrantyPrice} Q за гарантийное обслуживание на ${warranty} года.`);
  }
  if (isMessage !== '') {
    console.log(`Гравировка на сумму ${messagePrice} Q.`);
  }
    if (isDeliver === 'да') {
      if (locations.includes(deliveryLocation)) {
        var priceOfDeliver = calculatePrice(deliveryLocation);
        console.log(`Доставка в область ${deliveryLocation}: ${priceOfDeliver} Q.`);
      } else {
       console.log('Неверно указан пункт доставки');
      }
    }
}

function calculatePrice(deliveryLocation) {
  switch (deliveryLocation) {
    case 'Луна' :
      return 150;
    break;  
    case 'Крабовидная туманность' :
      return 250;
    break;
    case 'Галактика Туманность Андромеды' :
      return 550;
    break;
    case 'Туманность Ориона' :
      return 600;
    break;
    case 'Звезда смерти' :
      return 'договорная цена';
    break;
  }
}

totalFunction(orderSumm, warrantyPeriod, message, delivery, deliveryLocation);