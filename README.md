# Usage

Firstly install:

`npm install`

<><><><><><><>

The best way to test is to run karma / jasmine unit tests.

This is done by having `gulp` installed, and running `gulp test`

To add a unit test, create new stubs, and run `gulp test:watch` 
to evaluate tests when files change.

<><><><><><><>

Written in TypeScript, transpiled to ES5.

<><><><><><><>

Usage:

```javascript
const computation = new Lazy();
const timesTwo = (a: number) =>  a * 2;
const plus = (a: number, b: number) => a + b;

const result = computation
                .add(timesTwo)
                .add(plus, 1)
                .add(Math.sqrt)
                .evaluate([1, 2, 3]);
expect(isEqual(result, [Math.sqrt(3), Math.sqrt(5), Math.sqrt(7)])).toBe(true);
```