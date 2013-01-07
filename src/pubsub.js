(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('pubsub', this, function () {
  function Context () {
    this.subscribers = {};
  }
  Context.create = function createContext(isGlobal) {
    var context = createObject(Context.prototype);
    args = Array.prototype.slice.call(arguments);
    Context.apply(context, args);
    return context;
  };

  Context.prototype.subscribe = function (eventName, handler) {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(handler);
  };

  Context.prototype.publish = function (eventName, args) {
    var subscribers = this.subscribers[eventName] || []
      , i
      , l
      ;

    for (i = 0, l = subscribers.length; i < l; i++) {
      subscribers[i].apply(null, args);
    }
  };

  function Pubsub () {
    this.Context = Context;
    this.globalContext = Context.create(true);
  }

  Pubsub.create = function () {
    var pubsub = createObject(Pubsub.prototype);
    args = Array.prototype.slice.call(arguments);
    Pubsub.apply(pubsub, args);
    return pubsub;
  }

  Pubsub.prototype.publish = function (eventName, context, args) {
    context = context || this.globalContext;
    context.publish(eventName, args);
  };

  Pubsub.prototype.subscribe = function (eventName, handler) {
    var context = this.globalContext;
    context.subslibe(eventName, handler);
  };

  function objectCreate(obj) {
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

  return Pubsub.create();
});
