  import React, { Component } from 'react';
  import './App.css';

  class Guess extends  React.Component {
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
       let randomNum = Math.floor(Math.random() * 9999);
      randomNum = randomNum.toString();
      while (randomNum.length < 4) {
        randomNum = "0" + randomNum;
      }
      return randomNum;
    }

    guessMe(inputNum){
      let chances = this.state.chances;
      let str = inputNum.toString();
      let input = str.split("");

     let mes;
      let col;
    
      if (chances > 0) {
        switch (chances) {
    case 1:
        mes = "You lost";
        col = "#ef0e0e";
        break; 
    case 2:
        mes = "Last chance!";
        col = "#a110ef";
        break;
    case 14:
        mes = "Hint: it's 4 digit number"
        col = "#0a84ff";
        break;
    default: 
        mes = "";
}
             
        this.setState({
          chances: this.state.chances - 1,
          guesses: this.state.guesses + 1,
          message: mes,
          color: col
        })

        let strRand = this.state.magicNumber
        let pok = strRand.split("");

        // Lucky guess
         // Lucky guess
        if (inputNum == strRand) {
          this.setState({
            message: 'You did it! You guess the number with ' + this.state.guesses + ' attampts',
            color:"#0de21b"
          })
          return false;
        } else {
          const res = []
          for (let i = 0; i < pok.length; i++) {
            if (pok[i] != input[i]) {
              res.push('*');
            } else {
              res.push(pok[i]);
            }
          }
          this.setState({
            result: res
          })
          
        }
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
