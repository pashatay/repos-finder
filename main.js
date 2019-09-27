'use strict';

const searchURL = 'https://api.github.com/users/';

function getRepos(query) {

  const url = searchURL + query + '/' + 'repos';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
function displayResults(response){
  //console.log(response[1]['name']);
$('#results-list').empty();
for(let i=0; i<response.length; i++){
  $('#results-list').append(
      `<li><h3>${response[i]['name']}, <a href="${response[i]['html_url']}">link</a>;</h3>
      </li>`)};
$('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);