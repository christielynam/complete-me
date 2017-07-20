import { expect } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';
const fs = require('fs');
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

describe('Trie functionality', () => {

  describe('Insert', () => {
    let trie;

    beforeEach(function () {
      trie = new Trie();
    })

    it('should have a root node defaulted to null', () => {
      expect(trie.root).to.equal(null);
    })

    it('should be able to insert a word and root should be a Node', () => {
      trie.insert('apple');

      expect(trie.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {
      trie.insert('apple');

      expect(trie.root.children.a.letter).to.be.equal('a')

      expect(
        trie.root
        .children.a
        .children.p
        .letter
      ).to.equal('p')

    })

    it('should be able to insert a word and the last letter should have a isWord property of true', () => {
      trie.insert('app');
      trie.insert('apple');

      expect(
        trie.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .letter
      ).to.equal('e')

      expect(
        trie.root
        .children.a
        .children.p
        .children.p
        .isWord
      ).to.equal(true)

      expect(
        trie.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .isWord
      ).to.equal(true)
    })

    it('should be able to insert multiple words and children objects should have multiple props', () => {
      trie.insert('apple');
      trie.insert('ape');

      let childKeys = Object.keys(
        trie.root
        .children.a
        .children.p
        .children
      );

      expect(childKeys).to.deep.equal(['p', 'e']);

    })

    it('should have nodes which represent incomplete words where the isWord prop is false', () => {
      trie.insert('apple');

      expect(
        trie.root
        .children.a
        .children.p
        .children.p
        .children.l
        .isWord
      ).to.equal(false);

    })
  })

  describe('Count', () => {
    let trie;

    beforeEach(function() {
      trie = new Trie();
    })

    it('should return number of words inserted', () => {
      expect(trie.count()).to.equal(0);

      trie.insert('ape');
      expect(trie.count()).to.equal(1);

      trie.insert('app');
      expect(trie.count()).to.equal(2);

      trie.insert('apple');
      expect(trie.count()).to.equal(3);

      trie.insert('apples');
      expect(trie.count()).to.equal(4);
    })


    it('should return number of words inserted', () => {
      expect(trie.count()).to.equal(0);

      trie.insert('ape');
      expect(trie.count()).to.equal(1);

      trie.insert('ape');
      expect(trie.count()).to.equal(1);
    })
  });

  describe('Suggest', () => {
    let trie;

    beforeEach(function () {
      trie = new Trie();
      trie.insert('app');
      trie.insert('apple');
      trie.insert('applesauce');
      trie.insert('apply');
      trie.insert('apt');
      trie.insert('cat');
      trie.insert('x-ray');
    })

    it('should return all children words of suggestion', () => {

      let suggestions = trie.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      suggestions = trie.suggest('applesb');

      expect(suggestions).to.deep.equal([])

      suggestions = trie.suggest('apple');

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce' ])

      suggestions = trie.suggest('ca.');

      expect(suggestions).to.deep.equal([])

      suggestions = trie.suggest('x');

      expect(suggestions).to.deep.equal([ 'x-ray' ])
    })
  });

  describe('Populate', () => {
    let trie;

    beforeEach(function (done) {
      this.timeout(4000)
      setTimeout(done, 4000)
      trie = new Trie()
      trie.populate(dictionary);
      done();
    })

    it('should have lots of words after dictionary is populated', () => {
      trie.populate(dictionary);
      expect(trie.wordCount).to.equal(274916);
    })
  })

  describe('Select', () => {
    let trie;

    beforeEach(function () {
      trie = new Trie();
    })

    it('should be able to select order of words returned by suggest', () => {
      trie.insert('app')
      trie.insert('apple')
      trie.insert('applesauce')
      trie.insert('apply')

      let suggestions = trie.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      sleep(10);

      trie.select('app');
      suggestions = trie.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      sleep(10);

      trie.select('apply');
      suggestions = trie.suggest('app');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])

      sleep(10);

      trie.select('apple');
      suggestions = trie.suggest('app');
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])

      sleep(10);

      trie.select('app');
      suggestions = trie.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])

      sleep(10);

      trie.select('apply');
      sleep(10);
      trie.select('app');
      sleep(10);
      trie.select('apply');
      suggestions = trie.suggest('app');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])
    })

  })

})
