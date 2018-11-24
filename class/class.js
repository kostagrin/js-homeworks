'use strict';

function rand(min, max) {
  return Math.ceil((max - min + 1) * Math.random()) + min - 1;
}

function generateId() {
  return Array(4).fill(1).map(value => rand(1000, 9999)).join('-');
}

const pointsInfo = [{
  title: 'Темная сторона Луны',
  coords: [500, 200, 97]
}, {
  title: 'Седьмое кольцо Юпитера',
  coords: [934, -491, 712]
}, {
  title: 'Саратов',
  coords: [30, 91, 77]
}];


console.log('Задача №1\n--------------------');

function OrdersTeleportationPoint(title, x, y, z) {
  this.title = title,
    this.x = x,
    this.y = y,
    this.z = z
}

OrdersTeleportationPoint.prototype.getDistance = function(x, y, z) {
  return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2 + (this.z - z) ** 2);
}

const point = new OrdersTeleportationPoint(pointsInfo[0].title, ...pointsInfo[0].coords);
let distance = point.getDistance(100, -100, 33);
console.log(`Расстояние до пункта «${point.title}» составит ${distance.toFixed(0)} единиц`);


console.log('____________________\n\nЗадача №2\n--------------------');

function OrdersTeleportationPointLocator(points) {

  if (!Array.isArray(points)) {
    throw 'Переданный аргумент не является массивом.';
    }
  
    this.validPoints = [];

  for (let point of points) {
    if (OrdersTeleportationPoint.prototype.isPrototypeOf(point)) {
      this.validPoints.push(point);
    }
  };
};

//=============================================================
//Запасной вариант #1
// OrdersTeleportationPointLocator.prototype.getClosest = function(x, y, z) {
//   let locations = []; //array of objects made of this.validPoints with additional fields "distance"

//   for (let point of this.validPoints) {
//     point.distance = point.getDistance(x, y, z); // add field "distance"
//     locations.push(point); // fill array "locations"
//   }

//   locations.sort(function(a, b) {
//     return a.distance - b.distance; // sort fields of "locations" by "distance" in ascending order
//   });

//   return locations[0]; // return an object with minimal "distance" value
// }

//=============================================================
//Запасной вариант #2
		// OrdersTeleportationPointLocator.prototype.getClosest = function(x, y, z) {
		// 	let distances = []; /*Массив содержит численные значения расстояний с индексами соответствующими индексам this.points наследуемого экземпляра (с исходными координатами). По соответствию индексов будем использовать его для поиска нужного title в this.points*/

		// 	for (let point of this.points) { // цикл по полю наследуемого объекта
		// 		distances.push(point.getDistance(x, y, z)); // рассчитываем расстояние и сохраняем результат в локальный массив
		// 	};

		// 	let distancesIndex = 0; // вспомогательная переменная для работы с массивом distances

		// 	for (let i = 0; i < distances.length; i++) {
		// 		if (distances[i] < distances[distancesIndex]) {
		// 			distancesIndex = i; //ищем минимальное значение в distances
		// 		}
		// 	}
		// 	return this.points[distancesIndex]; // возвращаем минимальное значение
		// }
//=============================================================

//Ещё один вариант решения через "reduce".
OrdersTeleportationPointLocator.prototype.getClosest = function(x, y, z) {

  return this.validPoints.reduce(function(memo, el) {

    if (memo === Infinity) {
      memo = el.getDistance(x, y, z) < memo ? el : memo;
    } else {
      memo = el.getDistance(x, y, z) < memo.getDistance(x, y, z) ? el : memo;
    };
    return memo;
  }, Infinity);
};


try {
  const points = pointsInfo.map(point => new OrdersTeleportationPoint(point.title, ...point.coords));
  const locator = new OrdersTeleportationPointLocator(points);

  const closestPoint = locator.getClosest(333, 294, 77);
  console.log(`Ближайший пункт телепортации заказов «${closestPoint.title}»`);
} catch (err) {
  console.log(err);
}

console.log('____________________\n\nЗадача №3\n--------------------');

class LoyaltyCard {

  constructor(name, sum) {

    this._balance = sum;

    Object.defineProperties(this, {
      'owner': {
        value: name,
        writable: false
      },
      'balance': {
        get() {
          return this._balance;
        },
        set(addSum) {
          this._balance += addSum;
        }
      },
      'orders': {
        value: [],
        writable: false
      }
    });

    this.orders.push(sum);
  };

  get id() {
    return generateId();
  };

  _discount() {
    if (this.balance >= 3000 && this.balance < 5000) return 3;
    else if (this.balance >= 5000 && this.balance < 10000) return 5;
    else if (this.balance >= 10000) return 7;
    else return 0;
  };

  get discount() {
    return this._discount();
  };

  getFinalSum(order) {
    return order - order * this._discount() * 0.01;
  };

  append(orderSum) {
    this.orders.push(orderSum);
    this._balance += orderSum;
  };

  show() {
    console.log(`Карта ${this.id}:\n\tВладалец: ${this.owner}\n\tБаланс: ${this.balance} Q\n\tТекущая скидка: ${this.discount} %\n\tЗаказы:\n\t\t#1 на сумму ${this.orders[0]} Q\n\t\t#2 на сумму ${this.orders[1]} Q`)
  };

};

const card = new LoyaltyCard('Иванов Иван', 6300);

let newOrderSum = 7000;
let finalSum = card.getFinalSum(newOrderSum);
console.log(`Итоговая сумма для заказа на ${newOrderSum} Q по карте составит ${finalSum} Q. Скидка ${card.discount} %.`);

card.append(newOrderSum);
console.log(`Баланс карты после покупки ${card.balance} Q.`);
card.show();
