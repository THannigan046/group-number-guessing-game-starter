$(document).ready(onReady);

function onReady() {
  console.log("jquery is loaded!")
  $('#gameForm').on('submit', addGuess);

}

function addGuess(event) {
  event.preventDefault();

  // Pull inputs
  let jeremyGuess = $('#jeremyInput').val();
  let chrisGuess = $('#chrisInput').val();
  let toivoGuess = $('#toivoInput').val();
  let newGuesses = { guessArray: [ jeremyGuess, chrisGuess, toivoGuess ] };

  $.ajax({
      method: 'POST',
      url: '/guesses',
      data: newGuesses
  })
      .then((response) => {
          console.log('POST response', response);
          refresh();
          
      });
};

// Declare refresh function
function refresh() {
  // GET server side guesses array
  $.ajax({
    method: 'GET',
    url:'/guesses'
  })
    .then( response => {
      console.log('AJAX request complete', response )
      // Render response to the DOM
      render(response);
    });

}

// declare render function
function render(state) {
    $('#guessList').empty();
  // render/append retrieved server side guesses array
    for (let object of state)  {
  $('#guessList').append(`
      <li>
        ${object.name}: ${object.guess}
      </li>
  `)
    }
}


