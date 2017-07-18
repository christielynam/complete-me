import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    const node = new Node();

    if (!this.root) {
      this.root = node;
    }

    let letters = [...word.toLowerCase()];

    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })
      if (!currentNode.isWord) {
        currentNode.isWord = true;
        // this.value = word;
        this.wordCount++;
      }
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    let currentNode = this.root;
    let letters = [...word.toLowerCase()];
    let suggestions = [];
    letters.forEach(letter => {
      currentNode = currentNode.children[letter]
      console.log(currentNode);
    })
    if (currentNode.isWord) {
      suggestions.push(currentNode.value)
    }
    return suggestions;
  }


}
