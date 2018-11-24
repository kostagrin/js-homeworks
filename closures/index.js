'use strict';
console.log(`Задача №1\n---------------`);

var cumulativeTax = 0; // накопительная сумма налога с продаж

function taxCompute(sales, taxRate = 0.73) {
	let taxFee = sales * taxRate;
	cumulativeTax += taxFee;
}

var currenSale = taxCompute;
currenSale(1000); // ввести аргументом сумму с продажи
currenSale(2000);
//...//
currenSale(5000);

console.log(`Налог с продаж (73%), к оплате ${cumulativeTax} Q`);

console.log(`________________\n\n\nЗадача №2\n---------------`);
/* shortened variable names imposed
in order to avoid code corruption by
the resurved word "lenght":
w - width
h - heith
l - length
*/
let paperRoll = 30;
function pack (w, h, l) {
	
	let paper = w * h * l;

	let packService = function() {
		if (paperRoll >= paper) {
		return true;
	} else {
		return false;
	  }
	}
	if (packService() === true) {
		console.log(`Заказ (${w}/${h}/${l}) упакован, осталось упаковочной бумаги ${paperRoll - paper} кв.м.`);
	} else {
		console.log(`Заказ (${w}/${h}/${l}) не упакован, осталось упаковочной бумаги ${paperRoll} кв.м.`);
	}
  	if (paperRoll >= paper) {
		paperRoll -= paper;
	}
} // closing function brace

pack(2, 2, 2);
pack(2, 3, 2);
pack(5, 4, 1);

console.log(`________________\n\n\nЗадача №3\n---------------`);
var teleports = [7, 2, 1, 4, 8];
var counters = [];

for (let i = 0; i < teleports.length; i++) {  
  counters.push(function() {
    let charge = teleports[i];
    if (charge > 1) {
      teleports[i]--;
      console.log(`Телепорт ${i + 1} использован, заряд - ${charge} едениц`);
    } else if (charge === 1) {
      teleports[i]--;
      console.log(`Телепорт ${i + 1} использован, заряд - ${charge}, требуется перезарядка!`);
    } else {
      console.log(`Телепорт ${i + 1} недоступен, перезаряжается`);
    }
  });
}

counters[0]();
counters[1]();
counters[2]();
counters[3]();
counters[4]();
counters[0]();
counters[1]();
counters[2]();
counters[3]();
counters[4]();
counters[0]();
counters[1]();
counters[2]();
counters[3]();
counters[4]();