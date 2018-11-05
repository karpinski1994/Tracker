export const persons: any = [
  {
    id: '123213',
    name: 'example name',
    location: {lat: 0, lng: 0},
    direction: 0
  },
  {
    id: '231321',
    name: 'test name',
    location: {lat: 1, lng: 1},
    direction: 1
  }
];

export const mockUpdatePersons = () => {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>resolve(persons)
    );
  });
}