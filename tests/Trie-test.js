import { expect } from 'chai';
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie functionality', () => {

  describe('Insert', () => {
    let trie;

    beforeEach(function () {
      trie = new Trie();
    })

    it('should have a root', () => {
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

  describe('Count' () => {
    let trie = new Trie();

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
    })

    it('should return all children words of suggestion', () => {
      trie.insert('apple');
      trie.insert('applesauce');
      trie.insert('apply');
      trie.insert('apt');
      trie.insert('cat');

      let suggestions = trie.suggest('app');

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce', 'apply' ])
    })
  });

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

      trie.select('ape');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      trie.select('apply');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])

      trie.select('apple');
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])
    })
  })

})
