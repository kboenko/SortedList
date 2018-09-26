const Node = require('./Node');

class OrderedList {

  constructor(isAscending) {
    this.head = null;
    this.tail = null;
    this.isAscending = isAscending;
  }

  funcCheck(node1, node2, isAscending) {
    if (isAscending) {
      return this.isGreater(node1, node2);
    } else {
      return !this.isGreater(node1, node2);
    }
  }

  checkPlaceAndInsert(node, newNode, isAscending) {
    while (node !== null) {
      if(node.next !== null && this.funcCheck(newNode, node, isAscending) && this.funcCheck(node.next, newNode, isAscending)) {
        this.insertAfter(newNode, node.value);
        break;
      } else if (node.next === null && this.funcCheck(newNode, node, isAscending)) {
        this.addInTail(newNode);
        break;
      } else if (node.prev === null && this.funcCheck(node, newNode, isAscending)) {
        this.addInHead(newNode);
        break;
      }

      node = node.next;
    }

  }

  isGreater(node1, node2) {
    return node1.value >= node2.value;
  }

  add(newNode) {
    if (this.head === null) {
      this.head = newNode;
      newNode.prev = null;
      newNode.next = null;
      this.tail = newNode;
    } else {

      let node = this.head;

      this.checkPlaceAndInsert(node, newNode, this.isAscending);

    }
  }

  addInTail(node) {

    if (this.head === null) {
      this.head = node;
      node.prev = null;
      node.next = null;
    } else {
      this.tail.next = node;
      node.prev = this.tail
    }

    this.tail = node;

  }

  addInHead(newNode) {
    let node = this.head;

    if (node.prev === null) {
      node.prev = newNode;
      newNode.next = node;
      this.head = newNode;
    }
  }

  deleteByValue(value) {
    let node = this.head;

    while (node !== null) {

      if (node.value === value) {
        node.prev.next = node.next;
        break;
      }

      node = node.next;
    }
  }

  deleteByValue2(value) {
    let targetNode = this.find(value);
    let before;
    let target;

    if (targetNode) {
      before = targetNode.before;
      target = targetNode.target;

      target.next.prev = target.prev;
      target = target.next;
      target.prev.next = target.next;

      while (target !== null) {
        before.addInTail(new Node(target.value));
        target = target.next;
      }

      this.head = before.head;
    }
  }

  insertAfter(newNode, existedValue) {
    if (this.getValues().indexOf(existedValue) === -1) {
      console.log(`Введённое значение ${existedValue} отсутствует в списке!`);
    } else {

      //console.log(`Будем вставлять значение ${newNode.value} после узла ${existedValue}`);
      let node = this.head;

      while (node !== null) {
        if (node.value === existedValue) {
          newNode.prev = node;
          newNode.next = node.next;
          node.next = newNode;
        }
        node = node.next;
      }
    }
  }

  getValues() {
    let node = this.head;
    let values = [];

    while (node !== null) {
      values.push(node.value);
      node = node.next;
    }

    return values;
  }

  find(value) {
    let node = this.head;
    let before = new OrderedList();
    let target;

    if ((this.isAscending && (value < this.head.value || value > this.tail.value)) ||
          (!this.isAscending && (value > this.head.value || value < this.tail.value))) {
      return 'Нет такого элемента!';
    }

    while (node !== null) {
      if (node.value === value) {
        target = node;
        break;
      } else {
        before.addInTail(new Node(node.value));
      }
      node = node.next;
    }

    return {
      before: before,
      target: target
    }
  }

}

module.exports = OrderedList;