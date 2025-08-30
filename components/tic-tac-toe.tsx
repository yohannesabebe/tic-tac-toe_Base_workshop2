"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Player = "X" | "O" | null
type Board = Player[]

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
]

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)
  const [isDraw, setIsDraw] = useState(false)

  const checkWinner = (newBoard: Board): Player => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    return null
  }

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsDraw(true)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setIsDraw(false)
  }

  const getGameStatus = () => {
    if (winner) return `Player ${winner} wins! 🎉`
    if (isDraw) return "It's a draw! 🤝"
    return `Player ${currentPlayer}'s turn`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Tic Tac Toe</CardTitle>
        <div className="flex items-center justify-center gap-2">
          <Badge variant={winner || isDraw ? "secondary" : "default"}>{getGameStatus()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 aspect-square">
          {board.map((cell, index) => (
            <Button
              key={index}
              variant="outline"
              className="aspect-square text-2xl font-bold hover:bg-accent transition-colors border-2 border-gray-400 bg-white hover:border-gray-600"
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !!winner || isDraw}
            >
              {cell}
            </Button>
          ))}
        </div>
        <Button onClick={resetGame} className="w-full" variant={winner || isDraw ? "default" : "secondary"}>
          {winner || isDraw ? "Play Again" : "Reset Game"}
        </Button>
      </CardContent>
    </Card>
  )
}
