
// Partial implementation of a Stack class,
// not all possible stack functions implemented
// documentation omitted for brevity
class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }

  push(element) {
    this.data[this.top] = element;
    this.top += 1;
  }

  length() {
    return this.length;
  }

  peek() {
    return this.data[this.top - 1];
  }

  isEmpty() {
    return this.top === 0;
  }

  pop() {
    if (!this.isEmpty()) {
      this.top -= 1;
      return this.data.pop();
    }
  }
}

class EventSourcer {
  constructor() {
    this.value = 0;
    this.undo_stack = new Stack(); // stores all previous actions in as a signed integer
    this.redo_stack = new Stack(); // stored all undone/future actions as a signed integer
  }

  add(num) {
    this.undo_stack.push(num); // save addition into undo stack
    this.value += num;
    this.redo_stack.pop(); // 'overwrite' the most recent redo
  }

  subtract(num) {
    this.undo_stack.push(-num); // save subtraction into undo stack
    this.value -= num;
    this.redo_stack.pop(); // 'overwrite' the most recent redo
  }

  // undo last action
  undo() {
    if (!this.undo_stack.isEmpty()) {
      this.redo_stack.push(this.undo_stack.peek()); // save undone action into redo stack
      this.value -= this.undo_stack.pop(); // perform undo
    }
  }

  // redo last undone action
  redo() {
    if (!this.redo_stack.isEmpty()) {
      this.undo_stack.push(this.redo_stack.peek()); // save redone action into undo stack
      this.value += this.redo_stack.pop(); // perform redo
    }
  }

  // call undo num times
  bulk_undo(num) {
    for (let i = 0; i < num; ++i) {
      if (!this.undo_stack.isEmpty()) {
        this.undo();
      } else {
        break; // if no more undos to perform, end
      }
    }
  }

  // call redo num times
  bulk_redo(num) {
    for (let i = 0; i < num; ++i) {
      if (!this.redo_stack.isEmpty()) {
        this.redo();
      } else {
        break; // if no more redos to perform, end
      }
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
