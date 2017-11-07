# eslint-config: *gik-react*
> ESlint rules for React apps.

These are the rules we use on all of our frontend project using ReactJS.

Checkout other configs similar to this.

- __[@gik](http://github.com/gikmx/eslint-config)__ the base rules that this project inherits.
- __[@gik/cycle](http://github.com/gikmx/eslint-config-cycle)__ for generic CycleJS apps.
- __[@gik/node](http://github.com/gikmx/eslint-config-node)__ for generic NodeJS apps.

### Installation

```bash
npm i -D eslint @gik/eslint-config-react
```

### Usage

In the corresponding `.eslintrc` file (or equivalent) add the `extends` property.
``` json
{
  "extends": "@gik/react"
}
```
