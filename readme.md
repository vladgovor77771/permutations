# What is this?

You can use this script to find all commutations with your permutation.

# How to use?

First of all, install Node.js, then

```
git clone https://github.com/vladgovor77771/permutations
cd permutations
yarn install
```

Then modify `permutation.js` - set your permutation there (from 1 to n). Then

```
node index.js
```

Result will be cycles multiplication.

```
(1237)(456) // this is your permutation

(1)(2)(3)(4)(5)(6)(7)
(1)(2)(3)(456)(7)
(1)(2)(3)(465)(7)
(1237)(4)(5)(6)
(1237)(456)
(1237)(465)
(13)(27)(4)(5)(6)
(13)(27)(456)
(13)(27)(465)
(1732)(4)(5)(6)
(1732)(456)
(1732)(465)
```
