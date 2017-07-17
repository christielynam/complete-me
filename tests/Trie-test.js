import { expect } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';

describe('Trie functionality', () => {
  let trie;

  describe('insert', () => {

  })

  beforeEach(function () {
    let trie = new Trie();
  })

  it('should have a root', () => {
    expect(trie.root).to.equal(null)
  })

  it('should be able to insert a word and root should be a Node', () => {
    trie.insert('apple');

    expect(trie.root).to.be.instanceOf(Node);
  })

  it('should be able to insert a word and root should have children', () => {
    trie.insert('apple');

    expect(trie.root.children.a.letter).to.be.equal('a');
    expect(trie.root.children.a.children.p.letter).to.be.equal('p');
  })

  it('should be able to insert a word and and the last letter should have a isWord property of true', () => {
    trie.insert('apple');

    expect(
      trie.root.children
      .a.children
      .p.children
      .p.children
      .l.children
      .e.letter
    ).to.equal('e')

    expect(
      trie.root.children
      .a.children
      .p.children
      .p.children
      .l.children
      .e.isWord
    ).to.equal(true)
  })

  it('should be able to insert multiole words and the children objects have multiple props', () => {
    trie.insert('apple');
    trie.insert('ape')

  let childKeys = Object.keys(
    trie.root
    .children.a
    .children.p
    .children
  );

  expect(childKeys).to.deep.equal(['p', 'e'])
})

it('should have nodes which represent incomplete words where the isWord property is false', () => {
  trie.insert('apple');

  expect(
    trie.root.children
    .a.children
    .p.children
    .p.children
    .l.isWord
  ).to.equal(false)

expect(childKeys).to.deep.equal(['p', 'e'])
})


})
