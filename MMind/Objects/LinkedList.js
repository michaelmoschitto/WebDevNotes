'use strict';
var rls = require('readline-sync');

var InitLinkedList = function (list) {
    list.head = null;
    list.count = 0;

    //abstractly: each object has its own add and print
    //reality: all objects have only 1 add func and one print func and differentiate using "this"
    
    //"this" is passed to func automatically
    //python has "self"
    list.add = function (val) { //add function to list object

        this.head = {
            data: val,
            next: this.head
        };
        this.count++;
    };

    list.print = function () {
        for (var temp = this.head; temp; temp = temp.next)
            console.log(temp.data);
    };

    list.drop = function (val) {
        var prior;

        for (var temp = this.head; temp && temp.data !== val; temp = temp.next)
            prior = temp;

        if (temp) {
            if (prior)
                prior.next = temp.next;
            else
                head = temp.next;
            this.count--;
        }
    };
};

var LLDriver = function () {
    var cmd, action, list, data, lists = [{}, {}]; //<-- array of 2 empty objects
    var add;

    InitLinkedList(lists[0]);
    InitLinkedList(lists[1]);

    // A typical command might be add 0 42
    while ((cmd = rls.question().split(/\s+/)).length) {
        action = cmd[0];
        if (action === 'quit')
            break;

        list = lists[cmd[1]];
        data = parseInt(cmd[2]); // Devolves to NaN if cmd[2] is undefined
        if (action === 'add')
            list.add(data);
        else if (action === 'drop')
            list.drop(data);
        else if (action === 'count')
            console.log(`There are ${list.count} items in the list.`);
        else if (action === 'print')
            list.print();
    }

    // Playing around with functions
    add = lists[0].add; // Save a direct reference to a function

    // Functions have methods.  Some let you directly choose "this".
    add.call(lists[0], 42); // Same as lists[0].add(42).  
    add.apply(lists[0], [43]); // Also the same
    lists[0].print(); // 42 and 43 added

    // But the following offers no "this"
    // add(10); "this" is undefined with use strict, global space w/o strict
};

LLDriver();