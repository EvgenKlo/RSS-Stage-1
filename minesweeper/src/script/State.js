class State {
  constructor (time, steps, difficult, boms/* , result */) {
    this.time = time.split(' ')[1];;
    this.steps = steps;
    this.difficult = difficult;
    this.boms = boms;
  }
}

export default State;