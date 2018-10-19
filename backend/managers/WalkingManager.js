

class WalkingManager {
  constructor() {
    this.steps = 0;
    this.changeDistance = 20;
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
    this.steps += 1;
    if (this.steps === this.changeDistance) {
      person.direction = this.getRandomInt(0, 360);
      console.log()
      person.direction = this.getRandomInt(0, 360);
      this.steps = 0;
    }
  }

  moveAll(persons) {
    persons.forEach(p => this.move(p));
    return persons;
  }
}

module.exports = WalkingManager;