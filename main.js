// main.js
// var React = require('react');
// var ReactDOM = require('react-dom');

(function(){
	var TicTacToe = React.createClass({
	  	render: function() {
			return (
				<div className="container col-xs-12 col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
					<div className="row">
			        	<h1 className="title text-center">TicTacToe</h1>
			      	</div>
					<Score />
					<div className="row game-container">
						{/*<NewGame />*/}
						<Board />
						{/*<Leaderboard />*/}
					</div>
					<Restart />
				</div>
			);
	  }
	});

	var Score = React.createClass({
		render: function() {
		    return (
		      <div className="row text-center">
		        <div className="score score-player1">
		          <div className="player">Player 1</div>
		          <div className="text-center">10</div>
		        </div>
		        <div className="score score-player2">
		          <div className="player">Player 2</div>
		          <div className="text-center">8</div>
		        </div>
		        <div className="score score-draw">
		          <div className="player">Draw</div>
		          <div className="text-center">4</div>
		        </div>
		      </div>
		    );
	  }
	});

	var NewGame =  React.createClass({
		render: function() {
			return (
				<div className="new-game col-xs-12 col-sm-12 col-md-12 col-lg-12">
		          <div className="form-group">
		            <label for="player1">Player 1: </label>
		            <input id="player1" type="text" className="form-control" placeholder="Player 1"/>
		          </div>
		          <div className="form-group">
		            <label for="player2">Player 2: </label>
		            <input id="player2" type="text" className="form-control" placeholder="Player 2"/>
		          </div>
		          <button type="button" className="btn btn-lg btn-success start-btn">Start!</button>
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
			return (
				<div className="row">
			        <button type="button" className="btn btn-lg btn-success col-xs-offset-2 col-xs-8 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">Restart</button>
				</div>
				);
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