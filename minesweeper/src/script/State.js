class State {
  constructor (time, steps, difficult, boms/* , result */) {
    this.time = time.split(' ')[1];;
    this.steps = steps;
    this.difficult = difficult;
    this.boms = boms;
    /* if (result === 'layout-on-plaing-field') {
      this.result = 'Lost';
    } else {
      this.result = 'Win';
    }; */
  }
}

export default State;