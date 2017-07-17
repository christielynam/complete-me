export default class Node {
  constructor() {
    this.letter = null;
    this.children = {};
    this.isCompleteWord = false;
    this.frequency = 0;
  }
}
