const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Declare guesses global array TODO: get rid of sample
let guesses = [
  {
    name: 'Jeremy',
    guess: []
  },
  {
    name: 'Chris',
    guess: []
  },
  {
    name: 'Toivo',
    guess: []
  }
];

// Generate random number
let randomNum = randomNumber(0, 25);
console.log('number is:', randomNum);


// GET & POST Routes go here
  // GET /guesses route
app.get('/guesses', (req, res) => {
  console.log('in GET /guesses');
  res.send(guesses);
});

  // POST /guesses endpoint
app.post('/guesses', (req, res) => {
  console.log('in POST /guesses', req.body);

  // Add the guess to our array
  guesses[0].guess.push(req.body.guessArray[0]);
  guesses[1].guess.push(req.body.guessArray[1]);
  guesses[2].guess.push(req.body.guessArray[2]);


  // Send back a 👍
  res.sendStatus(201);

  for (zorp of guesses){
    if (zorp.guess === randomNum){
      zorp.isTrue = true;
      zorp.highLow = 'equal';
    }
    else{
      zorp.isTrue = false;
      if (zorp.guess > randomNum) {
        zorp.highLow = 'higher';
      }
      else {
        zorp.highLow = 'lower';
      }
    }
  }
});
function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}








app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

