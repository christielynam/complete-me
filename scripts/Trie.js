import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert() {
    this.root = new Node();
  }

}
