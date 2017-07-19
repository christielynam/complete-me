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
        this.wordCount++;
      }
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    let wordsArray = [...word];
    let currentNode = this.root;
    let suggestions = [];

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]];
    }

    //currentNode now refers to the last letter in our word

    const traverseTheTrie = (word, currentNode) => {
      const keys = Object.keys(currentNode.children);

      for (let k = 0; k < keys.length; k++) {
        const child = currentNode.children[keys[k]];
        const newString = word + child.letter;
        if (child.isWord) {
          suggestions.push(newString);
        }
        traverseTheTrie(newString, child);
      }
    }
    if (currentNode && currentNode.isWord) {
      suggestions.push(word);
    }
    if (currentNode) {
      traverseTheTrie(word, currentNode);
    }
    return suggestions;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }


}
