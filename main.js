// main.js
// var React = require('react');
// var ReactDOM = require('react-dom');

(function(){
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
				newgame : false
		    });
		},
		handleRestartSubmit: function(players) {
		    this.setState(this.getInitialState);
		},
	  	render: function() {
	  		var gameContainer;

			if (this.state.newgame) {
			  gameContainer = <NewGameForm onNewGameSubmit={this.handleNewGameSubmit}/>;
			} else {
			  gameContainer = <Board />;
			}

			return (
				<div className="container col-xs-12 col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
					<div className="row">
			        	<h1 className="title text-center">TicTacToe</h1>
			      	</div>
					<Score player1={this.state.player1} player2={this.state.player2} draws={this.state.draws}/>
					<div className="row game-container">
						{gameContainer}
						{/*<Leaderboard />*/}
					</div>
					<Restart show={!this.state.newgame} onRestartSubmit={this.handleRestartSubmit}/>
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
		          <button type="button" className="btn btn-lg btn-success start-btn" onClick={this.handleNewGame}>Start!</button>
		        </div>
				);
		}
	});

	var Board = React.createClass({
		render: function() {
			return (
				<div>
					<div className="game-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
			          <div className="cell cell-border">X</div>
			          <div className="cell cell-border">O</div>
			          <div className="cell">X</div>
			        </div>
			        <div className="game-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
			          <div className="cell cell-border">X</div>
			          <div className="cell cell-border">O</div>
			          <div className="cell">X</div>
			        </div>
			        <div className="game-row-last col-xs-12 col-sm-12 col-md-12 col-lg-12">
			          <div className="cell cell-border">X</div>
			          <div className="cell cell-border">O</div>
			          <div className="cell">X</div>
			        </div>
		        </div>
				);
		}
	});

	var Restart = React.createClass({
		render: function() {
			if (this.props.show) {
				return (
				<div className="row">
			        <button type="button" className="btn btn-lg btn-success col-xs-offset-2 col-xs-8 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8"
			        	onClick={this.props.onRestartSubmit}>Restart</button>
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
		render: function(){
			return (
				<div className="leaderboard col-xs-12 col-sm-12 col-md-12 col-lg-12">
		          <table className="table">
		            <thead>
		              <tr>
		                <th className="text-center">Game</th>
		                <th className="text-center">Winner</th>
		              </tr>
		            </thead>
		            <tbody>
		              <tr>
		                <td>#3</td>
		                <td>Doe</td>
		              </tr>
		              <tr>
		                <td>#2</td>
		                <td>Moe</td>
		              </tr>
		              <tr>
		                <td>#1</td>
		                <td>Draw</td>
		              </tr>
		            </tbody>
		          </table>
		          <button type="button" className="btn btn-lg btn-success start-btn">Back</button>
		        </div>
				);
		}
	});

	ReactDOM.render(
	  <TicTacToe />,
	  document.getElementById('tictactoe')
	);

})();