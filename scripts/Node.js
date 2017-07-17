export default class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.children = {};
    this.isCompleteWord = false;
    this.frequency = 0;
  }
}
