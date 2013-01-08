PubsubJS
========

Micro pubsub library

    var pubsub = require('pubsubjs').create();

    //pubsub
    $(a).bind('click', function (evt, ...) {
        var context = pubsub.Context.create();
        context.subscribe('searched', function () {
            task3();
        });
        pubsub.publish('search', context, args1, arg2..);
    });

    $(b).bind('click', function (evt, ...) {
        pubsub.publish('search', null, arg1, arg2);
    });


    pubsub.subscribe('search', function (context, arg1, arg2..) {
        task1();
        context && context.publish('searched');
    });

    pubsub.subscribe('search', function (context, arg1, arg2..) {
        task2();
    });
