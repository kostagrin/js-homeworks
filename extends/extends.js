'use strict';
class Calendar {
  constructor(now = new Date()) {
    this.now = now;
  }

  setDate(now) {
    this.now = now;
  }

  get today() {
    return this.now.toLocaleString('ru-Ru');
  }
}

class PaymentTerminal {
  constructor(title, calendar) {
    this.title = title;
    this.calendar = calendar;
  }

  get status() {
    return this.isActive ? 'работает' : 'недоступен';
  }

  get isActive() {
    return this.checkActive();
  }

  checkActive() {
    return false;
  }
}

class RegistrationError extends Error {
  constructor(field = null) {
    super(`Ошибка в поле ${field}`);
    this.field = field;
  }
}

class NotValidEmailRegistrationError extends RegistrationError {
  constructor(field, email) {
    super(field);
    this.email = email;
  }
}

class NotUniqueRegistrationError extends RegistrationError {
  constructor(field, value) {
    super(field);
    this.value = value;
  }
}

class NotSameRegistrationError extends RegistrationError {}

function isValidEmail(email) {
  return /^\w+(\.\w+)*@\w+(\.\w+)+$/i.test(email);
}

function isUniqueLogin(login) {
  return !['admin', 'boss'].includes(login);
}

function checkPassword(original, copy) {
  return original === copy;
}

function registerNewUser(data) {
  if (!isValidEmail(data.email)) {
    throw new NotValidEmailRegistrationError('Адрес электронной почты', data.email);
  }
  if (!isUniqueLogin(data.login)) {
    throw new NotUniqueRegistrationError('Логин', data.login);
  }
  if (!checkPassword(data.password, data.passwordCopy)) {
    throw new NotSameRegistrationError('Пароль');
  }
}

console.log('Задача №1\n--------------------');

class SpaceDate extends Date { 
  copy() {
    let copyDate = new Date(this);
    return copyDate;  
  };
  getNextDate() {
    let nextDate = new Date(this);
    let adjustDate = nextDate.getDate() + 1;
    nextDate.setDate(adjustDate);
    return nextDate;
  };
  getPrevDate() {
    let prevDate = new Date(this);
    let adjustDate = prevDate.getDate() - 1;
    prevDate.setDate(adjustDate);
    return prevDate;
  };
  getDayBeginning() {
    let dayBeginning = new Date(this);
    dayBeginning.setHours(0);
    dayBeginning.setMinutes(0);
    dayBeginning.setSeconds(0);
    dayBeginning.setMilliseconds(0);
    return dayBeginning;
  };
  getDayEnd() {
    let dayEnd = new Date(this);
    dayEnd.setHours(23);
    dayEnd.setMinutes(59);
    dayEnd.setSeconds(59);
    dayEnd.setMilliseconds(999);
    return dayEnd;
  };
}

//--------------------------------------------
let dateOriginal = new SpaceDate(2017, 1, 22);
let dateCopy = dateOriginal.copy();
dateCopy.setYear(2022);
console.log(`Оригинальная дата: ${dateOriginal.toLocaleDateString('ru-Ru')}`);
console.log(`Измененная копия: ${dateCopy.toLocaleDateString('ru-Ru')}`);

let orderDate = new SpaceDate(2017, 2, 10);
let deliveryDate = orderDate.getNextDate();
console.log(`Дата заказа: ${orderDate.toLocaleDateString('ru-Ru')}`);
console.log(`Дата доставки: ${deliveryDate.toLocaleDateString('ru-Ru')}`);

let supplyDate = new SpaceDate(2017, 3, 3);
let requestDate = supplyDate.getPrevDate();
console.log(`Дата поставки: ${supplyDate.toLocaleDateString('ru-Ru')}`);
console.log(`Дата заявки поставщику: ${requestDate.toLocaleDateString('ru-Ru')}`);

let someDate = new SpaceDate(2017, 2, 10, 12, 44);
let from = someDate.getDayBeginning();
let to = someDate.getDayEnd();
console.log(`В любое время с ${from.toLocaleString('ru-Ru')} по ${to.toLocaleString('ru-Ru')}`);
//--------------------------------------------

console.log('____________________\n\nЗадача №2\n--------------------');
class AllDayPaymentTerminal extends PaymentTerminal {
    checkActive() {
        return true; // работа в режиме 24/7 не требует каких либо проверок
    }
};


class AllDayExceptHolidaysPaymentTerminal extends PaymentTerminal {

  constructor(title, calendar, holidays) {
      super(title, calendar); 
      this.holidays = holidays;
  }

  checkActive() {
    let date = this.calendar.now.getDate();
    let month = this.calendar.now.getMonth();

  for (let holiday of this.holidays) {
        if ((holiday.date == date) && (holiday.month == month)) {
          return;
        } else {
          continue;
      }//else
    }//for

    return true;
  }//method
}// class


class WorkspacePaymentTerminal extends PaymentTerminal {
  constructor(title, calendar) {
    super(title, calendar);
  }

  checkActive() {
    let dayOverHours = this.calendar.now.getHours(); // > 18
    let dayOverMinutes = this.calendar.now.getMinutes(); // >= 1
    let dayBeforeOpen = this.calendar.now.getHours(); // < 8
    let weekEnd = this.calendar.now.getDate();

    if (weekEnd == 0 || weekEnd == 6) return;
    else if (dayBeforeOpen < 8) return;
    else if (dayOverHours >= 18 && dayOverMinutes >= 1) return;
    else return true;

  }//method
}//class


const holidays = [
  { date: 11, month: 3 - 1 },
  { date: 23, month: 2 - 1 }
];

const calendar = new Calendar();
const terminals = [
  new WorkspacePaymentTerminal('Терминал в офисе Убербанка', calendar),
  new AllDayPaymentTerminal('Терминал в аэропорту', calendar),
  new AllDayExceptHolidaysPaymentTerminal('Терминал в торговом центре',
    calendar, holidays)
];

function showTerminals(date) {
  if (date !== undefined) {
    calendar.setDate(date);
  }
  console.log(calendar.today);
  terminals
    .filter(terminal => terminal instanceof PaymentTerminal)
    .forEach(terminal => console.log(`${terminal.title} ${terminal.status}`));
}

showTerminals(new Date(2017, 2 - 1, 23));
showTerminals(new Date(2017, 3 - 1, 11));
showTerminals(new Date(2017, 3 - 1, 14, 18, 1));
showTerminals(new Date(2017, 3 - 1, 14, 8, 3));


console.log('____________________\n\nЗадача №3\n--------------------');
function handleRegistration(data) {
  try {
    if (registerNewUser(data) != 'undefined') {
      console.log('Пользователь успешно зарегистрирован');
    }
 
  } catch (err) {
      if (err instanceof NotValidEmailRegistrationError) {
        console.log(`"${err.email}" не является адресом электронной почты`);
      } 
      else if (err instanceof NotUniqueRegistrationError) {
        console.log(`Пользователь с логином "${err.value}" уже зерегистрирован`);
      } 
      else if (err instanceof NotSameRegistrationError) {
        console.log(`Введённые пароли  не совпадают`);
      } 
    }
};


const notValidEmailUser = { email: 'test' };
handleRegistration(notValidEmailUser);

const notUniqueLoginUser = { email: 'test@test.co', login: 'boss' };
handleRegistration(notUniqueLoginUser);

const differentPwUser = { email: 'test@test.co', login: 'ivan',
  password: '123', passwordCopy: '456' };
handleRegistration(differentPwUser);

const normalUser = { email: 'test@test.co', login: 'ivan', password: '123', passwordCopy: '123' };
handleRegistration(normalUser);
