

class WalkingManager {
  constructor() {
    this.steps = 0;
    this.changeNo = this.getRandomInt(7, 10);
    this.localDirection = this.getRandomInt(0, 360);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  move(person) {
    console.log(`steps: ${this.steps}, changeNo: ${this.changeNo}, localDirection: ${this.localDirection}`)
    const r = 0.0015;
    const a = 315;
    person.direction = a;
    const prvLat = person.location.lat;
    person.location.lat = Math.cos(Math.PI / 180 * a) * r + prvLat;
    const prvLng = person.location.lng;
    person.location.lng = Math.sin(Math.PI / 180 * a) * r + prvLng;

  }

  moveAll(persons) {
    persons.forEach(p => this.move(p));
    return persons;
  }
}

module.exports = WalkingManager;