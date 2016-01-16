// tictactoe.js
(function(){

	var React = require('react');

	// importing the react-bootstap's components used in the Modal showed when a game finishes
	var Modal = require('react-bootstrap').Modal;
	var Button = require('react-bootstrap').Button;

	// constants
	var PLAYER1 = 'X';
	var PLAYER2 = 'O';
	var EMPTY = '\xA0';

	// the main component
	var TicTacToe = React.createClass({
		getInitialState: function() {
			return {
				player1 : {
					name: 'Player 1',
					wins: 0
				},
				player2 : {
					name: 'Player 2',
					wins: 0	
				},
				draws : 0,
				leaderboard : [],	// list of winners to be shown in the leaderboard
				showLeaderboard : false,
				newgame : true
			};
		},
		handleNewGameSubmit: function(players) {
			this.setState({
				player1: {
					name: players.player1,
					wins: 0
				},
				player2: {
					name: players.player2,
					wins: 0
				},
				draws : 0,
				leaderboard : [],
				showLeaderboard : false,
				newgame : false
			});
		},
		handleRestartSubmit: function() {
		    this.setState(this.getInitialState());
		},
		handleLeaderboardSubmit: function() {
			var state = this.state;
			state.showLeaderboard = true;
			this.setState(state);
		},
		// actions to be taken by the Leaderboard's Back button
		handleBackSubmit: function() {
			var state = this.state;
			state.showLeaderboard = false;
			this.setState(state);
		},
		// actions to be taken when a game finishes:
		// - update the players score
		// - include the game's result in the leaderboard list
		handleGameResult: function(result) {
			var state = this.state;
			if (result === PLAYER1) {
				state.player1.wins += 1;
				state.leaderboard.push(state.player1.name);
			} else if (result === PLAYER2) {
				state.player2.wins += 1;
				state.leaderboard.push(state.player2.name);
			} else {
				state.draws += 1;
				state.leaderboard.push('Draw');
			}
			this.setState(state);
		},
		// the TicTacToe component is formed by:
		// - a title
		// - Score component
		// - (NewGameForm || Board + Leaderboard) components
		// - Menu component
	  	render: function() {
	  		var gameContainer;


			if (this.state.newgame) {
				gameContainer = <div className="row game-container">
									<NewGameForm onNewGameSubmit={this.handleNewGameSubmit}/>
								</div>;
			} else {
				gameContainer = <div className="row game-container">
									<Board show={!this.state.showLeaderboard}
										onGameResult={this.handleGameResult}/>
									<Leaderboard show={this.state.showLeaderboard}
										leaderboard={this.state.leaderboard}
										onBackSubmit={this.handleBackSubmit}/>
								</div>;
			}

			return (
				<div className="container col-xs-12 col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
					<div className="row">
			        	<h1 className="title text-center">TicTacToe</h1>
			      	</div>
					<Score player1={this.state.player1} player2={this.state.player2} draws={this.state.draws}/>
					
					{gameContainer}
					
					<Menu show={!this.state.newgame && !this.state.showLeaderboard}
						onRestartSubmit={this.handleRestartSubmit}
						onLeaderboarSubmit={this.handleLeaderboardSubmit}/>
				</div>
			);
	  }
	});

	// the players' score shown above the Board
	var Score = React.createClass({
		render: function() {
		    return (
		      <div className="row text-center">
		        <div className="score score-player1">
		          <div className="player">{this.props.player1.name}</div>
		          <div className="text-center">{this.props.player1.wins}</div>
		        </div>
		        <div className="score score-player2">
		          <div className="player">{this.props.player2.name}</div>
		          <div className="text-center">{this.props.player2.wins}</div>
		        </div>
		        <div className="score score-draw">
		          <div className="player">Draw</div>
		          <div className="text-center">{this.props.draws}</div>
		        </div>
		      </div>
		    );
	  }
	});

	// form used to get the players name
	var NewGameForm =  React.createClass({
		getInitialState: function() {
			return {
				player1: '',
				player2: ''
			};
		},
		handlePlayer1Change: function(e) {
			this.setState({player1: e.target.value});
		},
		handlePlayer2Change: function(e) {
			this.setState({player2: e.target.value});
		},
		handleNewGame: function(e) {
			e.preventDefault();
			var player1 = this.state.player1.trim();
		    var player2 = this.state.player2.trim();
		    if (!player1 || !player2) {		// no action is taken if the names are empty
		      return;
		    }
		    this.props.onNewGameSubmit({player1: player1, player2: player2});
		    this.setState({player1: '', player2: ''});
		},
		render: function() {
			return (
				<div className="new-game col-xs-12 col-sm-12 col-md-12 col-lg-12">
		          <div className="form-group">
		            <label htmlFor="player1">Player 1: </label>
		            <input id="player1" type="text" className="form-control" placeholder="Player 1"
		            	value={this.state.player1} onChange={this.handlePlayer1Change}/>
		          </div>
		          <div className="form-group">
		            <label htmlFor="player2">Player 2: </label>
		            <input id="player2" type="text" className="form-control" placeholder="Player 2"
		            	value={this.state.player2} onChange={this.handlePlayer2Change}/>
		          </div>
		          <button type="button" className="btn btn-lg btn-primary start-btn"
		          		onClick={this.handleNewGame}>Start!</button>
		        </div>
				);
		}
	});

	// the game board
	var Board = React.createClass({
		getInitialState: function() {
			var cells = Array.from({length: 9}, () => EMPTY);
			return {
				cells : cells,
				turn : PLAYER1,
				showModal: false,
				modalText: '',
				winner: ''
			};
		},
		checkWinner: function() {
			var cells = this.state.cells;

			var hasWinner = function(a, b, c) {
				return ((a === PLAYER1 && b === PLAYER1 && c === PLAYER1) ||
					(a === PLAYER2 && b === PLAYER2 && c === PLAYER2));
			};

			// checking all possible combinations (rows, columns and diagonals)
			if (hasWinner(cells[0], cells[1], cells[2])) return cells[0];
			if (hasWinner(cells[3], cells[4], cells[5])) return cells[3];
			if (hasWinner(cells[6], cells[7], cells[8])) return cells[6];
			if (hasWinner(cells[0], cells[3], cells[6])) return cells[0];
			if (hasWinner(cells[1], cells[4], cells[7])) return cells[1];
			if (hasWinner(cells[2], cells[5], cells[8])) return cells[2];
			if (hasWinner(cells[0], cells[4], cells[8])) return cells[0];
			if (hasWinner(cells[2], cells[4], cells[6])) return cells[2];

			if (cells.indexOf(EMPTY) === -1) {
				return 'draw';
			}

			return 'continue';
		},
		handleCellClick: function(position, turn) {
			var cells = this.state.cells;
			cells[position] = turn;
			
			// updates the board and then check for a winner
			this.setState({cells: cells, turn: turn === PLAYER1 ? PLAYER2 : PLAYER1}, function () {
				var winner = this.checkWinner();
				if (winner !==  'continue') {
					this.showModal(winner);
				}
			});
		},
		showModal: function(winner) {
			var state = this.state;

			if (winner === PLAYER1) {
				state.modalText = 'Player 1 wins!';
			} else if (winner === PLAYER2) {
				state.modalText = 'Player 2 wins!';
			} else {
				state.modalText = 'Draw!';
			}

			state.winner = winner;
			state.showModal = true;
			this.setState(state);
		},
		// closes the modal and calls the method to update the players score
		// and leaderboad before restart the board state
		closeModal: function () {
			this.props.onGameResult(this.state.winner);
			this.setState(this.getInitialState());
		},
		render: function() {
			var css = '';
			if (!this.props.show) {
				css = 'hidden';
			}

			// building the array of cells for the Board
			var state = this.state;
			var handleCellClick = this.handleCellClick;
			var cells = state.cells.map(function (cell, index) {
				return (
					<Cell key={index} value={cell} onCellClick={handleCellClick}
							position={index} turn={state.turn}/>
				);
			});

			return (
				<div className={css}>

					{/* Modal that shows the game result */}
					<Modal show={this.state.showModal} onHide={this.closeModal} bsSize="small">
					  <Modal.Body>
					    <h4 className="text-center">{this.state.modalText}</h4>
					  </Modal.Body>
					  <Modal.Footer>
					    <Button className="btn btn-lg btn-primary" onClick={this.closeModal}>Close</Button>
					  </Modal.Footer>
					</Modal>

					{/* Board cells */}
					<div className="game-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
						{cells.slice(0,3)}
			        </div>
			        <div className="game-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
			        	{cells.slice(3,6)}
			        </div>
			        <div className="game-row-last col-xs-12 col-sm-12 col-md-12 col-lg-12">
						{cells.slice(6)}
			        </div>
		        </div>
				);
		}
	});

	// a cell of the game Board
	var Cell = React.createClass({
		cellClick: function() {
			if (this.props.value === EMPTY) {
				this.props.onCellClick(this.props.position, this.props.turn)
			}
		},
		render: function() {
			// setting the div class according to the player's turn and cell value
			var className = 'cell ' + (([2, 5, 8].indexOf(this.props.position) > -1)? '' : 'cell-border');
			if (this.props.value === EMPTY) {
				if (this.props.turn === PLAYER1) {
					className = className + ' cell-player1-hover';
				} else {
					className = className + ' cell-player2-hover';
				}
			} else if (this.props.value === PLAYER1) {
				className = className + ' cell-player1';
			} else {
				className = className + ' cell-player2';
			}

			return (
				<div className={className} onClick={this.cellClick}>{this.props.value}</div>
				);
		}
	});

	// Leaderboard and Restart buttons
	var Menu = React.createClass({
		render: function() {
			if (this.props.show) {
				return (
				<div className="row menu">
					<button className="btn btn-lg btn-primary col-xs-4 col-sm-4 col-md-4 col-lg-4"
			        	type="button"  onClick={this.props.onLeaderboarSubmit}>Leaderboard</button>
					<button className="btn btn-lg btn-primary pull-right col-xs-4 col-sm-4 col-md-4 col-lg-4"
			        	type="button" onClick={this.props.onRestartSubmit}>Restart</button>
				</div>
				);
			} else {
				return (
				<div className="row"></div>
				);
			}
		}
	});

	// table with all game results
	var Leaderboard = React.createClass({
		render: function() {
			var css = 'leaderboard col-xs-12 col-sm-12 col-md-12 col-lg-12';
			if (!this.props.show) {
				css = css + ' hidden';
			}

			var results = this.props.leaderboard.map(function (result, index) {
				return (
					<tr key={index}>
						<td>#{index + 1}</td>
		                <td>{result}</td>
					</tr>
				);
			});

			return (
				<div className={css}>
		          <table className="table">
		            <thead>
		              <tr>
		                <th className="text-center">Game</th>
		                <th className="text-center">Winner</th>
		              </tr>
		            </thead>
		            <tbody>
		               {results}
		            </tbody>
		          </table>
		          <button type="button" className="btn btn-lg btn-primary start-btn"
		          		onClick={this.props.onBackSubmit}>Back</button>
		        </div>
				);
		}
	});

	module.exports = TicTacToe;

})();