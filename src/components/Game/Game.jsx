import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "../Square/Square"
import WinnerModal from "../WinnerModal/WinnerModal"
import { winnerCombos, Turns } from "../../constants"
import './Game.css'

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(Turns.X)
    const [winner, setWinner] = useState(null)

    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square !== null)
    }

    const updateBoard = (index) => {
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

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
                return boardToCheck[a]
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
        <main className="board">
            <h1 className="title">TIC-TAC-TOE V.2</h1>

            <button className="win" onClick={resetGame}>
                Restart Game
            </button>

            <section className="game">
                {board.map((eachBoard, index) => (
                    <Square
                        key={index}
                        index={index}
                        updateBoard={updateBoard}
                    >
                        {board[index]}
                    </Square>
                ))}
            </section>
            <div className="turn">
                <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
                <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
            </div>
            <WinnerModal resetGame={resetGame} winner={winner} />
        </main>
    )
}

export default Game
