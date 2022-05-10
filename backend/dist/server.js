"use strict";
const test = 1;
async function example() {
    await setTimeout(() => fetch("https://github.com/users/lucaspedroabreu"), 1000);
    return "ok";
}
