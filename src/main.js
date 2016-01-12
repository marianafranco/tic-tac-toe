// main.js
(function(){
	
	var React = require('react');
	var ReactDOM = require('react-dom');
	var TicTacToe = require('./tictactoe.js');

	ReactDOM.render(
	  <TicTacToe />,
	  document.getElementById('tictactoe')
	);

})();