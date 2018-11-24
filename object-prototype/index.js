'use strict';
var positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    price: 10000,
    discount: 7,
    available: 3
  },
  {
    title: 'Ховерборд Mattel 2016',
    price: 9200,
    discount: 4,
    available: 14
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    price: 57000,
    discount: 0,
    available: 1
  }
];

console.log('Задача №1\n----------------');
const itemPrototype = {
  hold (amount = 1) {
    if (this.available < amount) {
      return false;
    }
    this.available -= amount;
    this.holded += amount;
    return true;
  },
  unhold (amount) {
    if (this.holded > 0) {
      if (amount !== undefined) {
        this.holded -= amount;
        this.available += amount;
        return true;
      } else {
        return false;
      }
    }
  },
  toString() {
    return `${this.title} (остаток ${this.available}, в резерве ${this.holded})`;
  }
};

function createItem(title, amount) {
  const item = Object.create(itemPrototype);
  item.title = title;
  item.available = amount;
  item.holded = 0;
  item.unholded = 0;
  return item;
}

const items = [];
for (let item of positions) {
  items.push(createItem(item.title, item.available));
}

items[0].hold(2);
items[0].unhold(2);
items[1].hold(8);
items[1].unhold(4);
items[1].hold(12);
items[2].hold(1);

for (let item of items) {
  console.log(`Товар: ${item}`);
}

console.log('________________\n\nЗадача №2\n----------------');

const config = {
    get: function() {
      return this.price - this.price * this.discount / 100;
    },
    set: function(newFinalPrice) {
      try {
        if (newFinalPrice > this.price) {
          throw "Цена со скидкой не может быть выше начальной";
        } // if end
        return this.discount = 100 * (this.price - newFinalPrice) / this.price;
      } catch (err) {
        console.log(`Ошибка: ${err}`);
      }
    } // set end
};

for (let i = 0; i < positions.length; i++) {
  Object.defineProperty(positions[i], 'finalPrice', config);
}  

console.log(positions[1].finalPrice);
console.log(positions[1].discount);
positions[1].finalPrice = 9300;
console.log(positions[1].finalPrice);
console.log(positions[1].discount);

console.log('________________\n\nЗадача №3\n----------------');
const requiredFields = [ 'title', 'price', 'discount' ];

let form1 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 7800,
  discount: 0
}

let form2 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  discount: 10,
  // test: 0
}

function isValidPosition (product, requiredFields) {
  var productKeys = Object.keys(product);
  if (productKeys.length === requiredFields.length) {
    var check = 0;
    for ( var i = 0; i < productKeys.length; i++ ) {
      for ( var j = 0; j < requiredFields.length; j++ ) {
        if (productKeys[i] === requiredFields[j]) {
          check++;
          break;
        }
      }
    }
    return check === productKeys.length ? true : false;    
  } else {
     return false; 
    }  
}

isValidPosition(form1, requiredFields);
isValidPosition(form2, requiredFields);

if ( isValidPosition(form1, requiredFields) ) {
  console.log('Форма № 1 заполнена верно');
} else {
  console.log('В форме № 1 не заполнены необходимые поля');
}

if ( isValidPosition(form2, requiredFields) ) {
  console.log('Форма № 2 заполнена верно');
} else {
  console.log('В форме № 2 не заполнены необходимые поля');
}