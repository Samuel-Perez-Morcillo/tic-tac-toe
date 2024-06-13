import { useState } from "react"
import confetti from "canvas-confetti"

const Square = ({ children, isSelected, updateBoard, index }) => {

  const selectPlayer = `square ${isSelected ? "is-selected" : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={selectPlayer} >
      {children}
    </div >
  )
}

const Turns = {
  X: "x",
  O: "o"
}

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]

]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(Turns.X)

  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {

    if (board[index] || winner) return {}

    const newBoard = [...board]
    setBoard(newBoard)
    newBoard[index] = turn

    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)

    const newWinner = winnerCheck(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  const winnerCheck = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {

        return (
          boardToCheck[a]
        )

      }
    }
    return null

  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
  }


  return (
    <>
      <main className="board">
        <section className="game">
          {
            board.map((eachBoard, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <div className="turn">
          <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
          <Square isSelected={turn === Turns.O}>{Turns.O}</Square>

        </div>

        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                      ?
                      'Empate'
                      :
                      `Ganó: `
                  }
                </h2>
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>
                    Empezar de nuevo
                  </button>
                </footer>

              </div>

            </section>

          )
        }



      </main>


    </>
  )
}

export default App
