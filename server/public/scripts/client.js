$(document).ready(onReady);

function onReady() {
  console.log("jquery is loaded!")
  $('#gameForm').on('submit', addGuess);

  $(document).on('click', '#restart', restartGame)
}

function restartGame(){
  $.ajax({
    method: 'POST',
    url: '/reset',
    data: {
      reset: true
    }
  })
    .then((response) => {
      console.log('POST response', response);
      refresh();

    });
  
}

function addGuess(event) {
  event.preventDefault();

  // Pull inputs
  let jeremyGuess = $('#jeremyInput').val();
  let chrisGuess = $('#chrisInput').val();
  let toivoGuess = $('#toivoInput').val();
  let newGuesses = { guessArray: [ jeremyGuess, chrisGuess, toivoGuess ] };
  $('#jeremyInput').val('');
  $('#chrisInput').val('');
  $('#toivoInput').val('');
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
    $('.tableBody').empty();
    $('#winnerDiv').empty();
  // render/append retrieved server side guesses array
    for (let object of state)  {
  $('.tableBody').append(`
      <tr>
        <td>${object.name}</td> 
        <td>${object.guess}</td>
        <td>${object.highLow}</td>
        <td>${object.guess.length}</td>
      </tr>
  `)
  if (object.isTrue === true) {
    
    $('#winnerDiv').append(`
    <h1>${object.name} Wins! Yayyy!</h1>
    <button id="restart">Restart</button>
    `)
  }
    }
}


