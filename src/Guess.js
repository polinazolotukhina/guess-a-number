  import React, { Component } from 'react';
  import './App.css';

  let red = '#e51414';
  let green = '#04d34c';
  let blue = '#00aeff';
  let yellow='#ffe102'

  class Guess extends Component {
    constructor(props){
      super(props);
      this.state = {
        guesses: 0,
        chances: 15,
        result: "-",
        magicNumber: this.randomN().toString()
      };

      this.setNumber = this.setNumber.bind(this);
      this.handleUserInput= this.handleUserInput.bind(this);
      
    }

    randomN(){
       var randomNum = Math.floor(Math.random() * 9999);
      randomNum = randomNum.toString();
      while (randomNum.length < 4) {
        randomNum = "0" + randomNum;
      }
      return randomNum;
    }

    guessMe(inputNum){
      var chances = this.state.chances;
      var str = inputNum.toString();
      var input = str.split("");

      if(chances == 14 ){
        this.setState({
            message: "Hint: it's 4 digit number!",
            color: blue
        })
      }
      else if((chances < 14) &&(chances != 2) ){
        this.setState({
            message: "",
            
        })
      }
      else if(chances == 2 ){
        this.setState({
            message: 'Just one more chance left!',
            color: yellow
        })
      }

      if (chances > 1) {
        // Reduce the attempt and increase guesses
        this.setState({
          chances: this.state.chances - 1,
          guesses: this.state.guesses + 1,
        })

        var strRand = this.state.magicNumber
        var pok = strRand.split("");

        // Lucky guess
        if (inputNum == strRand) {
          this.setState({
            message: 'You did it! You guess the number with ' + this.state.guesses + ' attampts',
            color: green
          })
          return false;
        } else {
          var res = []
          for (var i = 0; i < pok.length; i++) {
            if (pok[i] != input[i]) {
              res.push('*');
            } else {
              res.push(pok[i]);
            }
          }
          this.setState({
            result: res
          })
          return false;
        }
      } else { // No more chances
        this.setState({
          message: 'You lost...',
          color:red,
          guesses: this.state.guesses + 1,
          chances: this.state.chances - 1,
        });
        return false;
      }
    }

    numberOnly(e){
      const re = /[0-9A-F]+/g;
      if (!re.test(e.key)) {
        e.preventDefault();
      }
    }

    setNumber(e){
      this.setState({
        numberGuess: e.target.value
      })
    }

    handleUserInput(e){
      this.guessMe(this.state.numberGuess)
    }

    handleClick(){
      this.setState({
        polina: this.state.polina +1
      })
    }

    render() {
      return (
        <div className="container">
          <div className="mini">
              <h1>Guess a number!</h1>
              <input onChange={this.setNumber} onKeyPress={(e) => this.numberOnly(e)}/>
              <button onClick= {this.handleUserInput}>Submit</button>
              <h1 style={{color:this.state.color}} >{this.state.message}</h1>
              <h3>Guess:</h3>{this.state.guesses}
              <h3> Chances: </h3> {this.state.chances}
              <h3>Result</h3>{this.state.result}
          </div>
        </div>
      );
    }
  }

  export default Guess;
