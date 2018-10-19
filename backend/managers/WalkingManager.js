

class WalkingManager {
  constructor() {
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  move(person) {
    const r = 0.0015;
    const prvLat = person.location.lat;
    person.location.lat = Math.cos(Math.PI / 180 * person.direction) * r + prvLat;
    const prvLng = person.location.lng;
    person.location.lng = Math.sin(Math.PI / 180 * person.direction) * r + prvLng;

  }

  moveAll(persons) {
    persons.forEach(p => this.move(p));
    return persons;
  }
}

module.exports = WalkingManager;