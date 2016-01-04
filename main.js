// main.js
(function(){
	var React = require('react');
	var ReactDOM = require('react-dom');
	var Modal = require('react-bootstrap').Modal;
	var Button = require('react-bootstrap').Button;

	var PLAYER1 = 'X';
	var PLAYER2 = 'O';
	var EMPTY = '\xA0';

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
				leaderboard : [],
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
		    this.setState(this.getInitialState);
		},
		handleLeaderboardSubmit: function() {
			var state = this.state;
			state.showLeaderboard = true;
			this.setState(state);
		},
		handleBackSubmit: function() {
			var state = this.state;
			state.showLeaderboard = false;
			this.setState(state);
		},
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
	  	render: function() {
	  		var gameContainer;

			if (this.state.newgame) {
				gameContainer = <NewGameForm onNewGameSubmit={this.handleNewGameSubmit}/>;
			} else {
				gameContainer = <Board show={!this.state.showLeaderboard}
										onGameResult={this.handleGameResult}/>;
			}

			return (
				<div className="container col-xs-12 col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
					<div className="row">
			        	<h1 className="title text-center">TicTacToe</h1>
			      	</div>
					<Score player1={this.state.player1} player2={this.state.player2} draws={this.state.draws}/>
					<div className="row game-container">
						{gameContainer}
						<Leaderboard show={this.state.showLeaderboard} leaderboard={this.state.leaderboard}
							onBackSubmit={this.handleBackSubmit}/>
					</div>
					<Menu show={!this.state.newgame && !this.state.showLeaderboard}
						onRestartSubmit={this.handleRestartSubmit}
						onLeaderboarSubmit={this.handleLeaderboardSubmit}/>
				</div>
			);
	  }
	});

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
		    if (!player1 || !player2) {
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
				if ((a === PLAYER1 && b === PLAYER1 && c === PLAYER1) ||
					(a === PLAYER2 && b === PLAYER2 && c === PLAYER2)) {
					return true;
				} else {
					return false;
				}
			};

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
		closeModal: function () {
			this.props.onGameResult(this.state.winner);
			this.setState(this.getInitialState());
		},
		render: function() {
			var css = '';
			if (!this.props.show) {
				css = 'hidden';
			}
			return (
				<div className={css}>
					<Modal show={this.state.showModal} onHide={this.closeModal} bsSize="small">
					  <Modal.Body>
					    <h4 className="text-center">{this.state.modalText}</h4>
					  </Modal.Body>
					  <Modal.Footer>
					    <Button className="btn btn-lg btn-primary" onClick={this.closeModal}>Close</Button>
					  </Modal.Footer>
					</Modal>
					<div className="game-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
					  <Cell cssClass="cell-border" value={this.state.cells[0]}
					  		onCellClick={this.handleCellClick} position={0} turn={this.state.turn}/>
					  <Cell cssClass="cell-border" value={this.state.cells[1]}
					  		onCellClick={this.handleCellClick} position={1} turn={this.state.turn}/>
					  <Cell cssClass="" value={this.state.cells[2]}
					  		onCellClick={this.handleCellClick} position={2} turn={this.state.turn}/>
			        </div>
			        <div className="game-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
			          <Cell cssClass="cell-border" value={this.state.cells[3]}
					  		onCellClick={this.handleCellClick} position={3} turn={this.state.turn}/>
					  <Cell cssClass="cell-border" value={this.state.cells[4]}
					  		onCellClick={this.handleCellClick} position={4} turn={this.state.turn}/>
					  <Cell cssClass="" value={this.state.cells[5]}
					  		onCellClick={this.handleCellClick} position={5} turn={this.state.turn}/>
			        </div>
			        <div className="game-row-last col-xs-12 col-sm-12 col-md-12 col-lg-12">
			          <Cell cssClass="cell-border" value={this.state.cells[6]}
					  		onCellClick={this.handleCellClick} position={6} turn={this.state.turn}/>
					  <Cell cssClass="cell-border" value={this.state.cells[7]}
					  		onCellClick={this.handleCellClick} position={7} turn={this.state.turn}/>
					  <Cell cssClass="" value={this.state.cells[8]}
					  		onCellClick={this.handleCellClick} position={8} turn={this.state.turn}/>
			        </div>
		        </div>
				);
		}
	});

	var Cell = React.createClass({
		cellClick: function() {
			if (this.props.value === EMPTY) {
				this.props.onCellClick(this.props.position, this.props.turn)
			}
		},
		render: function() {
			var className = 'cell ' + this.props.cssClass;
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

	ReactDOM.render(
	  <TicTacToe />,
	  document.getElementById('tictactoe')
	);

})();