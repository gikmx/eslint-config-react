# eslint-config: *gik-cycle*
*GIK's approach to writing Cycle.js SPAs using valid EcmaScript*

These are the rules we use on all of our frontend project using CycleJS.

Checkout other configs similar to this.

- __[@gik](http://github.com/gikmx/eslint-config)__ the base rules that this project inherits.
- __[@gik/node](http://github.com/gikmx/eslint-config-node)__ for generic NodeJS apps.

### Installation

```bash
npm i -D eslint @gik/eslint-config-cycle
```

### Usage

In the corresponding `.eslintrc` file (or equivalent) add the `extends` property.
``` json
{
  "extends": "@gik/cycle"
}
```
