import Trie from './Trie.js';
import words from './words.json';

const searchTrie = new Trie();

$(document).ready(function() {
  populateWords();
  $('.search-input').focus();
});

$('.search-input').on('input', function() {
  if ($('.search-input').val() === '') {
    $('.suggestion-list').empty();
  } else {
    $('.suggestion-list').empty();
    filterList();
  }
});

$('.suggestion-list').on('click', 'li', function(e) {
  selectWord(e);
  $('.search-input').focus();
})

function populateWords() {
  searchTrie.populate(words);
}

function filterList() {
  let string = $('.search-input').val();
  $('li').remove();
  let suggestions = searchTrie.suggest(string);
  for (let i = 0; i < 10 && suggestions.length; i++) {
    if (suggestions[i] !== undefined) {
      $('.suggestion-list').append(`<li>${suggestions[i]}</li>`)
    }
  }
}

function selectWord(e) {
  let selected = e.target.innerHTML;
  searchTrie.select(selected);
  filterList();
  $('.search-input').val(selected);
  $('.suggestion-list').empty();
}
