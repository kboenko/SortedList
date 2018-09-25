const util = require('util');
const SortedList = require('./entity/SortedList');
const SortedStringList = require('./entity/SortedStringList');
const Node = require('./entity/Node');

(() => {

  let list = new SortedList(false);

  list.add(new Node(12));
  list.add(new Node(15));
  list.add(new Node(8));
  list.add(new Node(3));
  list.add(new Node(5));
  list.add(new Node(42));

  console.log(list.getValues());

  let stringList = new SortedStringList(true);

  stringList.add(new Node(' Миша'));
  stringList.add(new Node('Ира '));
  stringList.add(new Node(' Лева '));

  console.log(stringList.getValues());

  console.log(list.find(12));

  console.log(list.find(100));


})();