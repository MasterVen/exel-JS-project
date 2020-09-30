export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  // 'make-it-work' строчка
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // on, listen
  // Подписываемся на уведомление. Добаляем нового слушателя
  // formula.sumbscribe('table:select', ()=>{});
  subscriber(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      );
    };
  }
}

// Exaple

// const emitter = new Emitter();
//
// const unsub = emitter.subscriber('vitaliy', (data) =>
//   console.log('SUB: ', data)
// );
//
// emitter.emit('vitaliy', 36);
// emitter.emit('vitaliy', 36);
// emitter.emit('vitaliy', 600);
// emitter.emit('sdfaliy', 1600);
//
// setTimeout(() => {
//   emitter.emit('vitaliy', 'After two second');
// }, 2000);
//
// setTimeout(() => {
//   unsub();
// }, 3000);
//
// setTimeout(() => {
//   emitter.emit('vitaliy', 'After four second');
// }, 4000);
