'use strict';
console.log('Задача №1\n-----------------');
let codes = [
  'Madam, I’m Adam',
  'A man, a plan, a canal. Panama',
  '----<-------Eve------->-----',
  '[__777-x-44-x-777__]',
  '1234564321',
  'Olson in Oslo'
];

for (let code of codes) {
  let result = checkCoupon(code) ? 'подходит' : 'не подходит';
  console.log(`Код «${code}» ${result}`);
}

function isPalindrome(str) {
  if (str === str.split('').reverse().join('')) {
    return true;
  } else {
    return false;
  }  
}

function checkCoupon(code) {
  let regExp = /(\W+)|(_+)/g;
  let adjustedInput = code.toLowerCase().replace(regExp, '');
    if (adjustedInput.length >= 10) {
      return isPalindrome(adjustedInput);
    } else {
      return false;
    } 
}

console.log('_________________\n\nЗадача №2\n-----------------');
const texts = [
  '<strong>Наши</strong> <em>ховерборды</em> лучшие в <u>мире</u>!',
  '<EM>Световой меч</EM> в <strong>каждый</strong> дом!', 
  '2 < 4 5 > 3'
];
   
function stripTags(el) {
  let stripEl = el.replace(/<\/?[a-z][a-z0-9]*>/gi, '');
  return stripEl;
}

for (let text of texts) {
  console.log(stripTags(text));
}

console.log('_________________\n\nЗадача №3\n-----------------');

const fields = [
  { name: 'name', rule: /^([A-Z]{1})([a-z]+)\s([A-Z]{1})([a-z]+)$/ },
  { name: 'email', rule: 'email' },
  { name: 'phone', rule: 'phone' }
]

const forms = [
  { name: 'Ivan Ivanov', email: 'ivan@test.co', phone: '+79212753690' },
  { name: 'III', email: 'ivan@test', phone: '11111' }
]

const regExps = {
  email: /^([\w\.-]+)@([\w\.-]+)\.([a-z\.]{2,6})$/i,
  phone: /\+7\d{10}\b/
}


function validate(form, fields) {
	
	let name, rule;
	
	for (let field of fields) {
		
		name = field.name;
		rule = field.rule;

		if (rule === name) {
			field.rule = regExps[name];
		}		
	}

	let tempObj = {}; //объект для хранения свойств-результатов
                    //обработки объекта form. Значения свойств 
                    //роли не играют - важны названия ключей.
	
	for (let field of fields) {
		if (field.rule.test(form[field.name])) {
			tempObj['correct'] = 1;
		} else {
			tempObj['incorrect'] = 1;
		}
		
	}	
	
	return (!('incorrect' in tempObj));	//возвращаем результат - если
                                      //хоть один ключ называется
                                      //'incorrect' - вернётся false.
}


for (let form of forms) {
  console.log(form);
  if (validate(form, fields)) {
    console.log('Ошибок нет');
  } else {
    console.log('Форма заполнена неверно');
  }
}
