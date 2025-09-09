### 1 ---> Difference between 'var', 'let', 'and' 'const'

var -> Function-scoped, can be redeclared and updated. It gets hoisted, but often leads to unexpected bugs.
let -> Block-scoped, can be updated but not redeclared in the same scope. Safer than 'var'.
const -> Block-scoped, cannot be reassigned. Best for values that should remain constant.

---

### 2 ---> Difference between 'map()', 'forEach(),' and 'filter()'

map() -> Creates and returns a new array with transformed values based on the callback.
forEach() -> Loops through the array but does not return a new array. Mainly used for side effects (e.g., logging).
filter() -> Returns a new array containing only elements that satisfy the given condition.

---

### 3 ---> Arrow Functions in ES6

Arrow functions provide a shorter syntax for functions. They don’t have their own 'this' binding, which makes them useful inside callbacks.

Example:

```js
const add = (a, b) => a + b;
```

---

### 4 ---> Destructuring Assignment in ES6

Destructuring allows you to extract values from arrays or objects into variables.

Array example:

```js
const [x, y] = [10, 20];
```

Object example:

```js
const { name, age } = { name: "Alex", age: 25 };
```

---

### 5 ---> Template Literals in ES6

Template literals use backticks ( ` ) instead of quotes. They allow embedding variables and writing multi-line strings easily.

Example:

```js
const name = "Alex";
console.log(`Hello, my name is ${name}.`);
```

Difference from string concatenation:

* Easier to read and write.
* No need for '+' operator.
* Supports multi-line strings directly.

---

