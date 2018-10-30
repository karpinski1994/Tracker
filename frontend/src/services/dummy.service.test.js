const DummyService = require('./dummy.service');

const innySerwisMock = {
  metoda() { return 8; }
};

const instance = new DummyService(innySerwisMock);

test('check if addNumbers work', () => {
  expect(instance.addNumbers(2, 5)).toBe(7);
  expect(instance.addNumbers(9, 9)).toBe(18);
});

test('check if reverseString work', () => {
  expect(instance.reverseString('trewqa')).toBe('aqwert');
});

test('check if multiply work', () => {
  expect(instance.multiply(2, 6)).toBe(12);
});

test('check if divide work', () => {
  expect(instance.divide(12, 0)).not.toBe(8);
  expect(instance.divide(12, 2)).toBe(6);
});

test('check if function calls work', () => {
  const spy = jest.spyOn(innySerwisMock, 'metoda');
  const wynikDzialania = instance.parentFunction(5);
  expect(spy).toHaveBeenCalledWith(10);
  expect(wynikDzialania).toEqual(4);
});
