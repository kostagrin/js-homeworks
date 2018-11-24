'use strict';
const clients = [{
  name: 'Филип Фрай',
  email: 'fray@mail.un',
  isSubscribed: false,
  orders: [ 11700, 1980, 450, 5500 ]
}, {
  name: 'Бендер Сгибатель Родригес',
  email: 'bender.rodriges@rambler.un',
  isSubscribed: true,
  orders: [ 440, 226, 7650, 2990, 70 ]
}, {
  name: 'Доктор Джон Зоидберг',
  email: 'zoidberg-md@list.un',
  isSubscribed: true,
  orders: [ 720 ]
}];

console.log('Задача №1\n-------------------');
clients.findByName = function (searchName) {
  let result = this.find(function (client) {
    return client.name === searchName;
  });
	return result;
}
 const client1 = clients.findByName('Филип Фрай');
 console.log(client1.email);


console.log('___________________\n\nЗадача №2\n-------------------');
function compareByTotalSumm (left, right) {
  let first = left.orders.reduce(function(memo, el) {
    return memo + el;
  }, 0);
  let second = right.orders.reduce(function(memo, el) {
    return memo + el;
  }, 0);
  if (first < second) {
    return 1;
  } else if (first > second) {
    return -1;
  } else {
    return 0;
  }
}

clients.sort(compareByTotalSumm);
clients.forEach(client => console.log(client.name));

console.log('___________________\n\nЗадача №3\n-------------------');
function sendMail(email) {
  console.log(`Письмо отправлено на адрес ${email}`);
}

function getSubscribedEmails (list) {
 let subscribed = list.filter(function(each) {
    return each.isSubscribed === true;
  });
  let emails = subscribed.map(function(each) {
    return each.email;
  });
  return emails;
}

getSubscribedEmails(clients).forEach(sendMail);
