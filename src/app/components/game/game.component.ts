import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  board!: Array<string>;
  player_turn = "X";
  winning_board = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
  ];

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.board = new Array(9).fill("N");
    this.player_turn = "X";
  }

  handlePlayer(index: number) {
    if (this.board[index] != "N") {
      return;
    }

    // Display player on board
    this.board[index] = this.player_turn;

    setTimeout(() => {
      // Check if win
      for (let i = 0; i < this.winning_board.length; i++) {
        let winning_check = this.winning_board[i];
        const p1 = winning_check[0];
        const p2 = winning_check[1];
        const p3 = winning_check[2];
        if (this.board[p1] == this.player_turn &&
          this.board[p2] == this.player_turn &&
          this.board[p3] == this.player_turn) {
          alert("Player " + this.player_turn + " has won the game!");
          this.reset();
          return;
        }
      }

      // Check if full
      let full = true;
      for (let i = 0; i < this.board.length; i++) {
        if(this.board[i] == "N") {
          full = false;
        }
      }
      if (full) {
        alert("Tie!");
        this.reset();
        return;
      }

      // Swap player turn
      this.player_turn = (this.player_turn == "X") ? "O" : "X";
    }, 1)
  }

}
