class Dummy {
  constructor(innySerwis) {
    this.innySerwis = innySerwis;
  }

  addNumbers(a, b) {
    return a + b;
  }

  reverseString(s) {
    return s.split('').reverse().join('');
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      return undefined;
    }
    return a / b;
  }

  parentFunction(abc) {
    const wynik = this.innySerwis.metoda(abc * 2);
    return wynik / 2;
  }
}

module.exports = Dummy;
