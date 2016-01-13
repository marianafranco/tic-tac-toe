var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var TicTacToe = require('../src/tictactoe.js');

var expect = require('chai').expect;

describe("TicTacToe", function() {
  beforeEach(function() {
    this.component = ReactTestUtils.renderIntoDocument(<TicTacToe />);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it("renders the tictactoe", function() {
    expect(this.renderedDOM().tagName).to.equal("DIV");
  });

  // testing the real DOM
  it("initially, shows the new game form and an empty menu", function() {
    var children = this.renderedDOM().children;
    expect(children.length).to.equal(4);  // title, Score, NewGameForm and Menu

    var gameContainer = children[2];
    expect(gameContainer.classList[1]).to.equal('game-container');
    expect(gameContainer.children[0].classList[0]).to.equal('new-game');

    var menu = children[3];
    expect(menu.classList[0]).to.equal('row');
    expect(menu.children.length).to.equal(0);    
  });

  // testing with Simulate
  it("new game form submit", function() {
    // checking if the new game form is present
    var newGameForm = ReactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'new-game');
    expect(newGameForm.length).to.equal(1);

    // retrieving the inputs
    var inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');
    expect(inputs.length).to.equal(2);

    var player1Input = inputs.find((el) => { return el.id == 'player1' });
    var player2Input = inputs.find((el) => { return el.id == 'player2' });

    // changing the input's values
    ReactTestUtils.Simulate.change(player1Input, { target: { value: 'foo' } });
    ReactTestUtils.Simulate.change(player2Input, { target: { value: 'bar' } });
    
    // clicking the start button
    var button = ReactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');
    ReactTestUtils.Simulate.click(button);

    // checking if the new game form is no more present in the page
    newGameForm = ReactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'new-game');
    expect(newGameForm.length).to.equal(0);

    // checking if the game board is present
    var boardRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'game-row');
    var lastBoardRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'game-row-last');
    expect(boardRows.length).to.equal(2);
    expect(lastBoardRows.length).to.equal(1);
  });

});