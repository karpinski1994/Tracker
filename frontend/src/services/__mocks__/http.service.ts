

export class MockHttpService  {
  persons = [
    {
      id: 'AAA',
      name: 'AAA',
      location: {lat: 0, lng: 0},
      direction: 0
    },
    {
      id: 'BBB',
      name: 'BBB',
      location: {lat: 0, lng: 0},
      direction: 0
    },
  ]

  person = {
    id: 'CCC',
    name: 'CCC',
    location: {lat: 0, lng: 0},
    direction: 0
  }

  getPersons = () => {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>resolve({
          message: 'Persons fetched successfully.',
          persons: this.persons
        })
      );
    });
  }

  getPerson = (id: string) => {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>resolve(
          {
            message: 'Persons fetched successfully.',
            person: this.person,
            id,
          }
        )
      );
    });
  }

  addPerson = (id: string) => {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>resolve({
          message: 'Person added successfully.',
          person: this.person,
          id,
        })
      );
    });
  }

  deletePerson = (id: string) => {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>resolve({
          message: 'Person deleted successfully.',
          person: this.person,
          id,
        })
      );
    });
  }

  activateWalking = () => {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>resolve({
          message: 'Persons are walking.',
        })
      );
    });
  }

  disactivateWalking = () => {
    return new Promise((resolve, reject) => {
        process.nextTick(
          () =>resolve({
            message: 'Persons are NOT walking.',
          })
        );
    });
  }
}