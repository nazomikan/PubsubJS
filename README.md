PubsubJS
========

Micro pubsub library


    //pubsub
    $(a).bind('click', function (evt, ...) {
        var context = pubsub.Context.create();
        context.subscribe('searched', function () {
            task3();
        });
        pubsub.publish('search', context, args);
    });

    $(b).bind('click', function (evt, ...) {
        pubsub.publish('search');
    });


    pubsub.subscribe('search', function (context, args/* [a, b...] */) {
        task1();
        context.publish('searched');
    });

    pubsub.subscribe('search', function (context) {
        task2();
    });
