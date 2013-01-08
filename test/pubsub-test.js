var assert = require('assert')
  , PubSub = require('../src/pubsub.js');
  ;

describe('pubsub apis', function () {
  describe('when globalContext\'s subscriber has only one', function () {
    var pubsub = PubSub.create()
      , actual = {callCount: 0}
      ;

    pubsub.subscribe('event', function (context, cnt) {
console.log(cnt);
      actual.callCount += cnt;
    });

    describe('call globalContext\'s publish', function () {
      it('should call only one subscriber', function () {
        pubsub.publish('event', null, [1]);
        assert.equal(1, actual.callCount);
      });
    });
  });
});

describe('context apis', function () {

});
