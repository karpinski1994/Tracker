class MockHttpService  {
  persons = [
    {
      id: '123213',
      name: 'example name',
      location: {lat: 0, lng: 0},
      direction: 0
    }
  ];

  person = {
    id: '123213',
    name: 'example name',
    location: {lat: 0, lng: 0},
    direction: 0
  };

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

const instance = new MockHttpService();

describe('Http service', () => {

  it('Expect to fetch persons', () => {
    let fetchedPersonData: any = {};
    instance.getPersons()
    .then((data: any) => {
      fetchedPersonData.persons = data.persons;
      fetchedPersonData.message = data.message;
      expect(fetchedPersonData.id).toEqual('CCC');
      expect(fetchedPersonData.message).toEqual('Person added successfully.');
      expect(fetchedPersonData.persons).toEqual(
        [
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
      );
    });
  });

  it('Expect to fetch persons', () => {
    let fetchedPersonData: any = {};
    instance.addPerson('CCC')
    .then((data: any) => {
      fetchedPersonData.persons = data.persons;
      fetchedPersonData.message = data.message;
      expect(fetchedPersonData.id).toEqual('CCC');
      expect(fetchedPersonData.message).toEqual('Person added successfully.');
      expect(fetchedPersonData.persons).toEqual(
        [
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
      );
    });
  });

  it('Expect to fetch person.', () => {
    let fetchedPersonData: any = {};
    instance.addPerson('CCC')
    .then((data: any) => {
      fetchedPersonData.person = data.person;
      fetchedPersonData.message = data.message;
      expect(fetchedPersonData.id).toEqual('CCC');
      expect(fetchedPersonData.message).toEqual('Person added successfully.');
      expect(fetchedPersonData.person).toEqual(
        {
          id: 'CCC',
          name: 'CCC',
          location: {lat: 0, lng: 0},
          direction: 0
        }
      );
    });
  })

  it('Expect to send a deleting request.', () => {
    let fetchedPersonData: any = {};
    instance.deletePerson('CCC')
    .then((data: any) => {
      fetchedPersonData.person = data.person;
      fetchedPersonData.message = data.message;
      expect(fetchedPersonData.id).toEqual('CCC');
      expect(fetchedPersonData.message).toEqual('Person deleted successfully.');
      expect(fetchedPersonData.person).toEqual(
        {
          id: 'CCC',
          name: 'CCC',
          location: {lat: 0, lng: 0},
          direction: 0
        }
      );
    });
  });

  it('Expect to send a "walking" request.', () => {
    let message;
    instance.disactivateWalking()
    .then((data: any) => {
      message = data.message;
      expect(message).toEqual(
        {
          message: 'Persons are walking.',
        }
      );
    });
  });

  it('Expect to send a "disactivate walking" request.', () => {
    let message;
    instance.disactivateWalking()
    .then((data: any) => {
      message = data.message;
      expect(message).toEqual(
        {
          message: 'Persons are NOT walking.',
        }
      );
    });
  });
});