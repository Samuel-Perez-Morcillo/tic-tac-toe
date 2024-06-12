import { useState } from "react"

const Square = ({ children, isSelected, updateBoard, index }) => {

  const selectPlayer = `square ${isSelected ? "is-selected" : ''}`

  const handleClick = () => {
    updateBoard()
  }

  return (
    <div onClick={handleClick} className={selectPlayer} >
      {children}
    </div >
  )
}

function App() {
  const Turns = {
    X: "x",
    O: "o"
  }

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(Turns.X)

  const updateBoard = () => {
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)
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
      </main>


    </>
  )
}

export default App
