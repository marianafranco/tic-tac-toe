var expect = require('chai').expect;

describe("test", function() {
  var arr;

  beforeEach(function() {
    arr = [3, 5, 6, 7];
  });
  
  afterEach(function() {
    arr = null;
  });

  describe("equals", function() {
    it("first element is 3", function() {
      expect(arr[0]).to.eql(3);
    });
  });
});