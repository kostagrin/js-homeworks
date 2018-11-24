'use strict';
console.log('Задача №1\n--------------------');

class BarcodeGenerator {
  constructor(size = 1) {
    this.size = size;
  }

  static prefix() {
    return Symbol.for('BarcodeGeneratorPrefix');
  }

  create() {
    let stringOfNumbers = '';

    for (let i = 0; i < this.size; i++) {
      stringOfNumbers += Math.floor(Math.random() * 10);
    }

    return (this[BarcodeGenerator.prefix] ?
            this[BarcodeGenerator.prefix] +
            '-' : '') + stringOfNumbers;
  }
}

const generator = new BarcodeGenerator(4);

generator[BarcodeGenerator.prefix] = 'AA';
console.log(generator.create());

generator[BarcodeGenerator.prefix] = 'XX';
console.log(generator.create());
console.log(generator.create());
console.log(generator.create());

delete generator[BarcodeGenerator.prefix];
console.log(generator.create());

console.log('____________________\n\nЗадача №2\n--------------------');
class HexRange {
  constructor(from, to) {
    this.numbers = []; 

    while (from <= to) {
      this.numbers.push(this.decToHex(from));
      from++;
    } 
  }

  decToHex(n) {
    return Number(n).toString(16);
  }

  [Symbol.iterator]() {
    let counter = 0;
    let self = this;
    return {
      next() {
        let item = self.numbers[counter++];
        return {
          done: counter > self.numbers.length,
          value: item
        }
      }
    }
  }
}

let queue = new HexRange(247, 253);
console.log(...queue);


console.log('____________________\n\nЗадача №3\n--------------------');

class DateRange {
  constructor(from, to) {
    this.from = from;
    this.to = to;     
  }

  [Symbol.iterator]() {
    let currentDate = this.from;
    let endDate = this.to;

    currentDate.setHours(0);
    currentDate.setMinutes(0);

    return {
      next() {
        if (currentDate.getDay() == 6) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
        if (currentDate.getDay() == 0) {
          currentDate.setDate(currentDate.getDate() + 1);
        } 
      
        let workingDay = new Date(currentDate);

        if (workingDay <= endDate) {
          currentDate.setDate(workingDay.getDate() + 1);
          
          return {
            done: false,
            value: workingDay
          }
        } else {
          return {
            done: true
          }
          
        } 
      }//next
    }//return
    
  }//[Symbol.iterator]

}//class

const from = new Date(2017, 2, 13, 23, 59);
const to = new Date(2017, 2, 21, 0, 1);
let range = new DateRange(from, to);

for (let day of range) {
  console.log(day.toLocaleDateString('ru-RU'));
}
