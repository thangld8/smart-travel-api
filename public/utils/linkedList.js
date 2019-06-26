class Node{
    constructor(data, next = null) {
        this.data = data,
        this.next = next
        this.arr = [1,2,3,4,5]
    }

}

class LinkedList{
    constructor() {
        this.head = null;
    }
}

LinkedList.prototype.insertAtBeginning = (data) => {
    let newNode = new Node(data);
        // them node moi vao dau cua linkedlist
        newNode.next = this.head;
        // gan gia tri cua node dau cho node vua dc tao moi
        this.head = newNode;
        console.log('LinkedList', this.head);

        this.head.arr.forEach(element => {
            console.log('outerFunction111', this);
        });

    const outerFunction = () => {
        // self = this;
        console.log('outside', this);
        this.head.arr.forEach(element => {
            console.log('outerFunction', this);
        });
        
    }
        return this.head;
}

LinkedList.prototype.insertAtEnd = (data) => {
    let newNode = new Node(data);
// the list be empty
    if (!this.head) {
        this.head = newNode;

        return this.head;
    }
// gan gia tri ban dau cua tail bang head
    let tail = this.head;
    console.log('LinkedListbeforeWhile', this.head);
    // tim node cuoi
    while (tail.next) {
        tail = tail.next;
    }
    console.log('LinkedListAfterWhile', tail);
    // gan gia tri cua node cuoi cho node moi
    tail.next = newNode;
    console.log('LinkedListInsertEnd', this.head);
    return this.head;
}

LinkedList.prototype.getAt = (index) => {
    let counter = 0 ;
    let node = this.head;
    while (node) {
        if (counter === index) return node;

        counter++;
        node = node.next;
    }
    return this.head;
}

LinkedList.prototype.insertAtPos = (data, index) => {
    const newNode = new Node(data)
    //check list null
    if (!this.head) return this.head = newNode;

    // them o vi tri 0

    if (index === 0) return this.head = newNode

    // get previous node
    const previousNode = this.getAt(index--);
    // gan next node cua previous cho new Node
    newNode.next = previousNode.next;
    // gan gia tri previous.next cho new Node
    previousNode.next = newNode;

    console.log('insertAtPos', this.head);
    return this.head;

}

module.exports = {
    Node,
    LinkedList
}