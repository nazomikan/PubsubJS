(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Pubsub', this, function () {
  var arrayProto = Array.prototype
    , slice = arrayProto.slice
    ;

  function Context() {
    this.subscribers = {};
  }

  Context.create = function createContext() {
    var context = createObject(Context.prototype)
      , args = slice.call(arguments);

    Context.apply(context, args);
    return context;
  };

  Context.prototype.subscribe = function (eventName, handler) {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(handler);
  };

  Context.prototype.publish = function (/*eventName, context, args*/) {
    var args = slice.call(arguments)
      , eventName = args.shift()
      , context = args.shift()
      , subscribers = this.subscribers[eventName] || []
      , i
      , l
      ;

    for (i = 0, l = subscribers.length; i < l; i++) {
      subscribers[i].apply(null, [context].concat(args));
    }
  };

  function Pubsub() {
    this.Context = Context;
    this.globalContext = Context.create();
  }

  Pubsub.create = function () {
    var pubsub = createObject(Pubsub.prototype)
      , args = slice.call(arguments);

    Pubsub.apply(pubsub, args);
    return pubsub;
  };

  Pubsub.prototype.publish = function (/*eventName, context, args*/) {
    var args = slice.call(arguments)
      , eventName = args.shift()
      , globalContext = this.globalContext
      , context = args.shift()
      ;

    globalContext.publish.apply(globalContext, [eventName, context].concat(args));
  };

  Pubsub.prototype.subscribe = function (eventName, handler) {
    var context = this.globalContext;
    context.subscribe(eventName, handler);
  };

  function createObject(obj) {
    if (Object.create) {
      return Object.create(obj);
    }

    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = obj;
    return new F();
  }

  return Pubsub;
});
