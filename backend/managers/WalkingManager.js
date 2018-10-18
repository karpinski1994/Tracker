

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
    this.steps += 1;
    person.direction = this.localDirection;
    if(this.steps === this.changeNo) {
      console.log('STEPS', this.steps)
      this.localDirection = 0;
      this.localDirection = this.getRandomInt(0, 360);
      person.direction = this.localDirection;
      this.changeNo = this.getRandomInt(5, 10);
      this.steps = 0;
    }
    person.location.lat = Math.sin(Math.PI / 180 * person.direction) + person.location.lat;
    person.location.lng = Math.cos(Math.PI / 180 * person.direction) + person.location.lng;
  }

  moveAll(persons) {
    persons.forEach(p => this.move(p));
    return persons;
  }
}

module.exports = WalkingManager;