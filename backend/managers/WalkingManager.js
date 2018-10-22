

class WalkingManager {
  constructor() {
    this.steps = 0;
    this.changeDistance = 5;
    this.stepDist = 0.0015;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  move(person) {
    person.location.lat = Math.cos(Math.PI / 180 * person.direction) * this.stepDist + person.location.lat;
    person.location.lng = Math.sin(Math.PI / 180 * person.direction) * this.stepDist + person.location.lng;
    this.steps += 1;
    if (this.steps === this.changeDistance) {
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