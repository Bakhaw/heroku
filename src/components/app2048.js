import React, { Component } from 'react';

class App2048 extends Component {
  constructor() {
    super();
    document.title = "React 2048 by ST"
    this.state = {
      squares : [
                  [0,2,0,0],
                  [0,0,0,0],
                  [0,0,2,0],
                  [0,0,0,0]
                ],
      message : 'Welcome to App 2048 React JS - par Sylvain Thuillier '
    }
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  generateRandomValueOnSquare(pArray){
    let emptySquaresPositions = [];
    let randomIndexValue = 0;

    for (let y=0; y<pArray.length; y++) {
      for (let z=0; z<pArray[y].length; z++){
        if (pArray[y][z] === 0){
          emptySquaresPositions.push([y,z]);
        }
      }
    }
    if (emptySquaresPositions.length>0){
      randomIndexValue = Math.floor((Math.random() * emptySquaresPositions.length ));
      let cordonitesI = emptySquaresPositions[randomIndexValue][0];
      let cordonitesJ = emptySquaresPositions[randomIndexValue][1];
      pArray[cordonitesI][cordonitesJ] = 2;
    }
    return pArray;
  }

  hasLostGame(pArray) {
    let emptySquares = 0;
    let movesAvailables = 0;
    for (let x=0; x<pArray.length; x++) {
      for (let y=0; y<pArray[x].length; y++) {
        if (pArray[x][y] === 0) {
          emptySquares += 1;
        }
      }
    }

    if (emptySquares === 0) { //no empty squares
      //check if no moves are possibles
      for (let a=1; a<pArray.length; a++) {
        for (let b=0; b<pArray[a].length; b++) {
          if(pArray[a-1][b]===pArray[a][b]) {
            movesAvailables += 1;
          }
        }
      }
      for (let m=0; m<pArray.length; m++) {
        for (let n=1; n<pArray[m].length; n++) {
          if(pArray[m][n-1]===pArray[m][n]) {
            movesAvailables += 1;
          }
        }
      }
    } //empty square available
    if ((movesAvailables === 0) && (emptySquares === 0)) {
      this.setState({
        message : 'Unfortunately you lost ...'
      });
    }
  }

  hasWonGame(pArray) {
    for (let x=0; x<pArray.length; x++) {
      for (let y=0; y<pArray[x].length; y++) {
        if (pArray[x][y] === 2048) {
          this.setState({
            message : 'Good job you won !'
          });
        }
      }
    }
  }

  mouvementUp(pArray) {
    let arrayChanged = pArray;

    for (let l=0; l<4; l++) {
      if(arrayChanged[0][l] === 0) {
        if(arrayChanged[1][l] === 0) {
          if (arrayChanged[2][l] === 0) {
            if (arrayChanged[3][l] !== 0) {
              arrayChanged[0][l] = arrayChanged[3][l];
              arrayChanged[3][l] = 0;
            } // row empty, do nothing
          } else { // k+2 != 0 && k = k+1 = 0
            if (arrayChanged[2][l] === arrayChanged[3][l]) {
              arrayChanged[0][l] = arrayChanged[2][l] * 2;
              arrayChanged[2][l] = arrayChanged[3][l] = 0;
            } else { // k+2 !=  k+3
              arrayChanged[0][l] = arrayChanged[2][l];
              arrayChanged[1][l] = arrayChanged[3][l];
              arrayChanged[2][l] = arrayChanged[3][l] = 0;
            }
          }
        } else { // k = 0 && k+1 != 0
          if (arrayChanged[2][l] === 0) {
            if (arrayChanged[1][l] === arrayChanged[3][l]) {
              arrayChanged[0][l] = arrayChanged[1][l] * 2;
              arrayChanged[1][l] = arrayChanged[2][l] = arrayChanged[3][l] = 0;
            } else {
              arrayChanged[0][l] = arrayChanged[1][l];
              arrayChanged[1][l] = arrayChanged[3][l];
              arrayChanged[3][l] = 0;
            }
          } else { //k = 0 && k+1 != 0 && k+2 != 0
            if (arrayChanged[1][l] === arrayChanged[2][l]) {
              arrayChanged[0][l] = arrayChanged[1][l] * 2;
              arrayChanged[1][l] = arrayChanged[3][l];
              arrayChanged[2][l] = arrayChanged[3][l] = 0;
            } else {
              if (arrayChanged[2][l] === arrayChanged[3][l]) {
                arrayChanged[0][l] = arrayChanged[1][l];
                arrayChanged[1][l] = arrayChanged[2][l] * 2;
                arrayChanged[2][l] = arrayChanged[3][l] = 0;
              } else {
                arrayChanged[0][l] = arrayChanged[1][l];
                arrayChanged[1][l] = arrayChanged[2][l];
                arrayChanged[2][l] = arrayChanged[3][l];
                arrayChanged[3][l] = 0;
              }
            }
          }
        }
      } else { // [0][l] != 0
        if (arrayChanged[1][l] !== 0) {
          if (arrayChanged[0][l] === arrayChanged[1][l]) {
            arrayChanged[0][l] = arrayChanged[1][l] * 2;
            if(arrayChanged[2][l] === arrayChanged[3][l]) {
              arrayChanged[1][l] = arrayChanged[2][l] * 2;
              arrayChanged[2][l] = arrayChanged[3][l] = 0;
            } else {
              arrayChanged[1][l] = arrayChanged[2][l];
              arrayChanged[2][l] = arrayChanged[3][l];
              arrayChanged[3][l] = 0;
            } //ok
          } else { //k != k+1
            if (arrayChanged[1][l] === arrayChanged[2][l]){
              arrayChanged[1][l] = arrayChanged[2][l] * 2;
              arrayChanged[2][l] = arrayChanged[3][l];
              arrayChanged[3][l] = 0;
            } else if (arrayChanged[2][l] === arrayChanged[3][l]) {
              arrayChanged[2][l] = arrayChanged[3][l] * 2;
              arrayChanged[3][l] = 0;
            } else {
              if (arrayChanged[2][l] === 0) {
                if (arrayChanged[1][l] === arrayChanged[3][l]) {
                  arrayChanged[1][l] = arrayChanged[3][l] * 2;
                  arrayChanged[3][l] = 0;
                } else {
                  arrayChanged[2][l] = arrayChanged[3][l];
                  arrayChanged[3][l] = 0;
                }
              } else { //k != k+1 && k+2 != 0
                if (arrayChanged[1][l] === arrayChanged[2][l]) {
                  arrayChanged[1][l] = arrayChanged[2][l] * 2;
                  arrayChanged[2][l] = arrayChanged[3][l];
                  arrayChanged[3][l] = 0;
                }
              }
            }
          }
        } else { //k+1 === 0
          if (arrayChanged[2][l] === 0) { //k != 0 && k+1 === 0 && k+2 === 0
            if (arrayChanged[0][l] === arrayChanged[3][l]) {
              arrayChanged[0][l] = arrayChanged[3][l] * 2;
              arrayChanged[3][l] = 0;
            } else {
              arrayChanged[1][l] = arrayChanged[3][l];
              arrayChanged[3][l] = 0
            }
          } else { //k != 0 && k+1 === 0 && k+2 != 0
            if (arrayChanged[0][l] === arrayChanged[2][l]) {
              arrayChanged[0][l] = arrayChanged[2][l] * 2;
              arrayChanged[1][l] = arrayChanged[3][l];
              arrayChanged[2][l] = arrayChanged[3][l] = 0;
            } else {
              if (arrayChanged[2][l] === arrayChanged[3][l]) {
                arrayChanged[1][l] = arrayChanged[2][l] * 2;
                arrayChanged[2][l] = arrayChanged[3][l] = 0;
              } else {
                arrayChanged[1][l] = arrayChanged[2][l];
                arrayChanged[2][l] = arrayChanged[3][l];
                arrayChanged[3][l] = 0;
              }
            }
          }
        }
      }
    }
    return arrayChanged;
  }

  mouvementDown(pArray) {
    let arrayChanged = pArray;

    for (let l=0; l<arrayChanged.length; l++) {
      if(arrayChanged[3][l] === 0) {
        if(arrayChanged[2][l] === 0) {
          if (arrayChanged[1][l] === 0) {
            if (arrayChanged[0][l] !== 0) {
              arrayChanged[3][l] = arrayChanged[0][l];
              arrayChanged[0][l] = 0;
            } // row empty, do nothing
          } else {
            if (arrayChanged[1][l] === arrayChanged[0][l]) {
              arrayChanged[3][l] = arrayChanged[1][l]*2;
              arrayChanged[1][l] = arrayChanged[0][l] = 0;
            } else {
              arrayChanged[3][l] = arrayChanged[1][l];
              arrayChanged[2][l] = arrayChanged[0][l];
              arrayChanged[1][l] = arrayChanged[0][l] = 0;
            }
          }
        } else {
          if (arrayChanged[1][l] === 0) {
            if (arrayChanged[2][l] === arrayChanged[0][l]) {
              arrayChanged[3][l] = arrayChanged[2][l] * 2;
              arrayChanged[2][l] = arrayChanged[1][l] = arrayChanged[0][l] = 0;
            } else {
              arrayChanged[3][l] = arrayChanged[2][l];
              arrayChanged[2][l] = arrayChanged[0][l];
              arrayChanged[0][l] = 0;
            }
          } else { //k = 0 && k+1 != 0 && k+2 != 0
            if (arrayChanged[2][l] === arrayChanged[1][l]) {
              arrayChanged[3][l] = arrayChanged[2][l] * 2;
              arrayChanged[2][l] = arrayChanged[0][l];
              arrayChanged[1][l] = arrayChanged[0][l] = 0;
            } else {
              if (arrayChanged[1][l] === arrayChanged[0][l]) {
                arrayChanged[3][l] = arrayChanged[2][l];
                arrayChanged[2][l] = arrayChanged[1][l] * 2;
                arrayChanged[1][l] = arrayChanged[0][l] = 0;
              } else {
                arrayChanged[3][l] = arrayChanged[2][l];
                arrayChanged[2][l] = arrayChanged[1][l];
                arrayChanged[1][l] = arrayChanged[0][l];
                arrayChanged[0][l] = 0;
              }
            }
          }
        }
      } else {
        if (arrayChanged[2][l] !== 0) {
          if (arrayChanged[3][l] === arrayChanged[2][l]) {
            arrayChanged[3][l] = arrayChanged[2][l] * 2;
            if(arrayChanged[1][l] === arrayChanged[0][l]) {
              arrayChanged[2][l] = arrayChanged[1][l] * 2;
              arrayChanged[1][l] = arrayChanged[0][l] = 0;
            } else {
              arrayChanged[2][l] = arrayChanged[1][l];
              arrayChanged[1][l] = arrayChanged[0][l];
              arrayChanged[0][l] = 0;
            }
          } else {
            if (arrayChanged[2][l] === arrayChanged[1][l]) {
              arrayChanged[2][l] = arrayChanged[1][l] * 2;
              arrayChanged[1][l] = arrayChanged[0][l];
              arrayChanged[0][l] = 0;
            } else if (arrayChanged[1][l] === arrayChanged[0][l]) {
              arrayChanged[1][l] = arrayChanged[0][l] * 2;
              arrayChanged[0][l] = 0;
            } else {
              if (arrayChanged[1][l] === 0) {
                if (arrayChanged[2][l] === arrayChanged[0][l]) {
                  arrayChanged[2][l] = arrayChanged[0][l] * 2;
                  arrayChanged[0][l] = 0;
                } else {
                  arrayChanged[1][l] = arrayChanged[0][l];
                  arrayChanged[0][l] = 0;
                }
              } else {
                if (arrayChanged[2][l] === arrayChanged[1][l]) {
                  arrayChanged[2][l] = arrayChanged[1][l] * 2;
                  arrayChanged[1][l] = arrayChanged[0][l];
                  arrayChanged[0][l] = 0;
                }
              }
            }
          }
        } else {
          if (arrayChanged[1][l] === 0) {
            if (arrayChanged[3][l] === arrayChanged[0][l]) {
              arrayChanged[3][l] = arrayChanged[0][l] * 2;
              arrayChanged[0][l] = 0;
            } else {
              arrayChanged[2][l] = arrayChanged[0][l];
              arrayChanged[0][l] = 0
            }
          } else {
            if (arrayChanged[3][l] === arrayChanged[1][l]) {
              arrayChanged[3][l] = arrayChanged[1][l] * 2;
              arrayChanged[2][l] = arrayChanged[0][l];
              arrayChanged[1][l] = arrayChanged[0][l] = 0;
            } else {
              if (arrayChanged[1][l] === arrayChanged[0][l]) {
                arrayChanged[2][l] = arrayChanged[1][l] * 2;
                arrayChanged[1][l] = arrayChanged[0][l] = 0;
              } else {
                arrayChanged[2][l] = arrayChanged[1][l];
                arrayChanged[1][l] = arrayChanged[0][l];
                arrayChanged[0][l] = 0;
              }
            }
          }
        }
      }
    }
    return arrayChanged;
  }

  mouvementLeft(pArray) {
    let arrayChanged = pArray;

    for (let l=0; l<arrayChanged.length; l++) {
      if(arrayChanged[l][0] === 0) {
        if(arrayChanged[l][1] === 0) {
          if (arrayChanged[l][2] === 0) {
            if (arrayChanged[l][3] !== 0) {
              arrayChanged[l][0] = arrayChanged[l][3];
              arrayChanged[l][3] = 0;
            } // row empty, do nothing
          } else { // k+2 != 0 && k = k+1 = 0
            if (arrayChanged[l][2] === arrayChanged[l][3]) {
              arrayChanged[l][0] = arrayChanged[l][2]*2;
              arrayChanged[l][2] = arrayChanged[l][3] = 0;
            } else { // k+2 !=  k+3
              arrayChanged[l][0] = arrayChanged[l][2];
              arrayChanged[l][1] = arrayChanged[l][3];
              arrayChanged[l][2] = arrayChanged[l][3] = 0;
            }
          }
        } else { // k = 0 && k+1 != 0
          if (arrayChanged[l][2] === 0) {
            if (arrayChanged[l][1] === arrayChanged[l][3]) {
              arrayChanged[l][0] = arrayChanged[l][1] * 2;
              arrayChanged[l][1] = arrayChanged[l][2] = arrayChanged[l][3] = 0;
            } else {
              arrayChanged[l][0] = arrayChanged[l][1];
              arrayChanged[l][1] = arrayChanged[l][3];
              arrayChanged[l][3] = 0;
            }
          } else { //k = 0 && k+1 != 0 && k+2 != 0
            if (arrayChanged[l][1] === arrayChanged[l][2]) {
              arrayChanged[l][0] = arrayChanged[l][1] * 2;
              arrayChanged[l][1] = arrayChanged[l][3];
              arrayChanged[l][2] = arrayChanged[l][3] = 0;
            } else {
              if (arrayChanged[l][2] === arrayChanged[l][3]) {
                arrayChanged[l][0] = arrayChanged[l][1];
                arrayChanged[l][1] = arrayChanged[l][2] * 2;
                arrayChanged[l][2] = arrayChanged[l][3] = 0;
              } else {
                arrayChanged[l][0] = arrayChanged[l][1];
                arrayChanged[l][1] = arrayChanged[l][2];
                arrayChanged[l][2] = arrayChanged[l][3];
                arrayChanged[l][3] = 0;
              }
            }
          }
        }
      } else {// [l][0] != 0
        if (arrayChanged[l][1] !== 0) {
          if (arrayChanged[l][0] === arrayChanged[l][1]) {
            arrayChanged[l][0] = arrayChanged[l][1] * 2;
            if(arrayChanged[l][2] === arrayChanged[l][3]) {
              arrayChanged[l][1] = arrayChanged[l][2] * 2;
              arrayChanged[l][2] = arrayChanged[l][3] = 0;
            } else {
              arrayChanged[l][1] = arrayChanged[l][2];
              arrayChanged[l][2] = arrayChanged[l][3];
              arrayChanged[l][3] = 0;
            } //ok
          } else { //k != k+1
            if (arrayChanged[l][1] === arrayChanged[l][2]) {
              arrayChanged[l][1] = arrayChanged[l][2] * 2;
              arrayChanged[l][2] = arrayChanged[l][3];
              arrayChanged[l][3] = 0;
            } else if (arrayChanged[l][2] === arrayChanged[l][3]) {
              arrayChanged[l][2] = arrayChanged[l][3] * 2;
              arrayChanged[l][3] = 0;
            } else {
              if (arrayChanged[l][2] === 0) {
                if (arrayChanged[l][1] === arrayChanged[l][3]) {
                  arrayChanged[l][1] = arrayChanged[l][3] * 2;
                  arrayChanged[l][3] = 0;
                } else {
                  arrayChanged[l][2] = arrayChanged[l][3];
                  arrayChanged[l][3] = 0;
                }
              } else { //k != k+1 && k+2 != 0
                if (arrayChanged[l][1] === arrayChanged[l][2]) {
                  arrayChanged[l][1] = arrayChanged[l][2] * 2;
                  arrayChanged[l][2] = arrayChanged[l][3];
                  arrayChanged[l][3] = 0;
                }
              }
            }
          }
        } else { //k+1 === 0
          if (arrayChanged[l][2] === 0) { //k != 0 && k+1 === 0 && k+2 === 0
            if (arrayChanged[l][0] === arrayChanged[l][3]) {
              arrayChanged[l][0] = arrayChanged[l][3] * 2;
              arrayChanged[l][3] = 0;
            } else {
              arrayChanged[l][1] = arrayChanged[l][3];
              arrayChanged[l][3] = 0
            }
          } else { //k != 0 && k+1 === 0 && k+2 != 0
            if (arrayChanged[l][0] === arrayChanged[l][2]) {
              arrayChanged[l][0] = arrayChanged[l][2] * 2;
              arrayChanged[l][1] = arrayChanged[l][3];
              arrayChanged[l][2] = arrayChanged[l][3] = 0;
            } else {
              if (arrayChanged[l][2] === arrayChanged[l][3]) {
                arrayChanged[l][1] = arrayChanged[l][2] * 2;
                arrayChanged[l][2] = arrayChanged[l][3] = 0;
              } else {
                arrayChanged[l][1] = arrayChanged[l][2];
                arrayChanged[l][2] = arrayChanged[l][3];
                arrayChanged[l][3] = 0;
              }
            }
          }
        }
      }
    }
    return arrayChanged;
  }

  mouvementRight(pArray) {
    let arrayChanged = pArray;

    for (let l=0; l<arrayChanged.length; l++) {
      if(arrayChanged[l][3] === 0) {
        if(arrayChanged[l][2] === 0) {
          if (arrayChanged[l][1] === 0) {
            if (arrayChanged[l][0] !== 0) {
              arrayChanged[l][3] = arrayChanged[l][0];
              arrayChanged[l][0] = 0;
            } // row empty, do nothing
          } else { // k+2 != 0 && k = k+1 = 0
            if (arrayChanged[l][1] === arrayChanged[l][0]) {
              arrayChanged[l][3] = arrayChanged[l][1]*2;
              arrayChanged[l][1] = arrayChanged[l][0] = 0;
            } else { // k+2 !=  k+3
              arrayChanged[l][3] = arrayChanged[l][1];
              arrayChanged[l][2] = arrayChanged[l][0];
              arrayChanged[l][1] = arrayChanged[l][0] = 0;
            }
          }
        } else { // k = 0 && k+1 != 0
          if (arrayChanged[l][1] === 0) {
            if (arrayChanged[l][2] === arrayChanged[l][0]) {
              arrayChanged[l][3] = arrayChanged[l][2] * 2;
              arrayChanged[l][2] = arrayChanged[l][1] = arrayChanged[l][0] = 0;
            } else {
              arrayChanged[l][3] = arrayChanged[l][2];
              arrayChanged[l][2] = arrayChanged[l][0];
              arrayChanged[l][0] = 0;
            }
          } else { //k = 0 && k+1 != 0 && k+2 != 0
            if (arrayChanged[l][2] === arrayChanged[l][1]) {
              arrayChanged[l][3] = arrayChanged[l][2] * 2;
              arrayChanged[l][2] = arrayChanged[l][0];
              arrayChanged[l][1] = arrayChanged[l][0] = 0;
            } else {
              if (arrayChanged[l][1] === arrayChanged[l][0]) {
                arrayChanged[l][3] = arrayChanged[l][2];
                arrayChanged[l][2] = arrayChanged[l][1] * 2;
                arrayChanged[l][1] = arrayChanged[l][0] = 0;
              } else {
                arrayChanged[l][3] = arrayChanged[l][2];
                arrayChanged[l][2] = arrayChanged[l][1];
                arrayChanged[l][1] = arrayChanged[l][0];
                arrayChanged[l][0] = 0;
              }
            }
          }
        }
      } else {// [l][3] != 0
        if (arrayChanged[l][2] !== 0) {
          if (arrayChanged[l][3] === arrayChanged[l][2]) {
            arrayChanged[l][3] = arrayChanged[l][2] * 2;
            if(arrayChanged[l][1] === arrayChanged[l][0]) {
              arrayChanged[l][2] = arrayChanged[l][1] * 2;
              arrayChanged[l][1] = arrayChanged[l][0] = 0;
            } else {
              arrayChanged[l][2] = arrayChanged[l][1];
              arrayChanged[l][1] = arrayChanged[l][0];
              arrayChanged[l][0] = 0;
            } //ok
          } else { //k != k+1
            if (arrayChanged[l][2] === arrayChanged[l][1]) {
              arrayChanged[l][2] = arrayChanged[l][1] * 2;
              arrayChanged[l][1] = arrayChanged[l][0];
              arrayChanged[l][0] = 0;
            } else if (arrayChanged[l][1] === arrayChanged[l][0]) {
              arrayChanged[l][1] = arrayChanged[l][0] * 2;
              arrayChanged[l][0] = 0;
            } else {
              if (arrayChanged[l][1] === 0) {
                if (arrayChanged[l][2] === arrayChanged[l][0]) {
                  arrayChanged[l][2] = arrayChanged[l][0] * 2;
                  arrayChanged[l][0] = 0;
                } else {
                  arrayChanged[l][1] = arrayChanged[l][0];
                  arrayChanged[l][0] = 0;
                }
              } else { //k != k+1 && k+2 != 0
                if (arrayChanged[l][2] === arrayChanged[l][1]) {
                  arrayChanged[l][2] = arrayChanged[l][1] * 2;
                  arrayChanged[l][1] = arrayChanged[l][0];
                  arrayChanged[l][0] = 0;
                }
              }
            }
          }
        } else { //k+1 === 0
          if (arrayChanged[l][1] === 0) { //k != 0 && k+1 === 0 && k+2 === 0
            if (arrayChanged[l][3] === arrayChanged[l][0]) {
              arrayChanged[l][3] = arrayChanged[l][0] * 2;
              arrayChanged[l][0] = 0;
            } else {
              arrayChanged[l][2] = arrayChanged[l][0];
              arrayChanged[l][0] = 0
            }
          } else { //k != 0 && k+1 === 0 && k+2 != 0
            if (arrayChanged[l][3] === arrayChanged[l][1]) {
              arrayChanged[l][3] = arrayChanged[l][1] * 2;
              arrayChanged[l][2] = arrayChanged[l][0];
              arrayChanged[l][1] = arrayChanged[l][0] = 0;
            } else {
              if (arrayChanged[l][1] === arrayChanged[l][0]) {
                arrayChanged[l][2] = arrayChanged[l][1] * 2;
                arrayChanged[l][1] = arrayChanged[l][0] = 0;
              } else {
                arrayChanged[l][2] = arrayChanged[l][1];
                arrayChanged[l][1] = arrayChanged[l][0];
                arrayChanged[l][0] = 0;
              }
            }
          }
        }
      }
    }
    return arrayChanged;
  }

  onKeyPressed(e) {
    // console.log(e.keyCode); //return a number
    /*
      * 37 : left
      * 38 : up
      * 39 : right
      * 40 : down
    */
    let squareState = this.state.squares;
    switch(e.keyCode) {
      case 37 : {
        squareState = this.mouvementLeft(squareState);
        squareState = this.generateRandomValueOnSquare(squareState);
        this.hasLostGame(squareState);
        this.hasWonGame(squareState);
        break;
      }
      case 38 : {
        squareState = this.mouvementUp(squareState);
        squareState = this.generateRandomValueOnSquare(squareState);
        this.hasLostGame(squareState);
        this.hasWonGame(squareState);
        break;
      }
      case 39 : {
        squareState = this.mouvementRight(squareState);
        squareState = this.generateRandomValueOnSquare(squareState);
        this.hasLostGame(squareState);
        this.hasWonGame(squareState);
        break;
      }
      case 40 : {
        squareState = this.mouvementDown(squareState);
        squareState = this.generateRandomValueOnSquare(squareState);
        this.hasLostGame(squareState);
        this.hasWonGame(squareState);
        break;
      }
      default : {
        //do nothing
      };
    }

    this.setState({
      squares : squareState
    });
  }

  render() {
    let affichage = [];
    for (let i=0; i<4; i++) {
      affichage.push(<div key={i} className='ligne'></div>);
      for (let j=0; j<4; j++) {
        let nomClass = 'square num num' + this.state.squares[i][j];
        affichage.push(<div key={i+','+j} className={nomClass} id={i+','+j}>{this.state.squares[i][j]}</div>);
      }
    }
    return (
      <div className='main' onKeyDown={this.onKeyPressed}>
        <p id='message'>{this.state.message}</p>
        {
          affichage
        }
      </div>
    );
  }
}

export default App2048;
