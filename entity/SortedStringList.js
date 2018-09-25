const SortedList = require('./SortedList');

class SortedStringList extends SortedList {

  constructor(isAscending) {
    super(isAscending);
  }

  isGreater(node1, node2) {
    return node1.value.trim() >= node2.value.trim();
  }

}

module.exports = SortedStringList;