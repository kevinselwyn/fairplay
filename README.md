# fairplay

Javascript implementation of the [Playfair cipher](http://en.wikipedia.org/wiki/Playfair_cipher)

## Demo

[fairplay](http://kevinselwyn.com/fairplay/)

## Usage

Include the script in your document:

```html
<script src="dist/fairplay.min.js"></script>
```

If you are using a module loader like [RequireJS](http://requirejs.org), require the module:

```js
require(["dist/fairplay.min"], function (fairplay) {

});
```

## Functions

### fairplay.generateKey()

Providing a keyphrase to this function will generate a key square:

```js
fairplay.generatekey("Charles Wheatstone");
// Returns: [
//  ["c", "h", "a", "r", "l"],
//  ["e", "s", "w", "t", "o"],
//  ["n", "b", "d", "f", "g"],
//  ["i", "k", "m", "p", "q"],
//  ["u", "v", "x", "y", "z"]
// ]
```

### fairplay.printKey()

In addition to generating a key square, it will print the key with the newline character(s) of your choice (`\n` by default):

```js
fairplay.printKey("Charles Wheatstone", "<br />");
// Returns:
// "c h a r l<br />
//  e s w t o<br />
//  n b d f g<br />
//  i k m p q<br />
//  u v x y z"
```

### fairplay.encrypt()

Given a keyphrase and plaintext, it will encrypt the plaintext using the Playfair cipher:

```js
fairplay.encrypt("Charles Wheatstone", "Lord Playfair");
// Returns: "ogafqrrxdrpc"
```

### fairplay.decrypt()

Given a keyphrase and ciphertext, it will decrypt the ciphertext using the Playfair cipher:

```js
fairplay.decrypt("Charles Wheatstone", "ogafqrrxdrpc");
// Returns: "lordplayfair"
```

## Configuration

In situations where there is an odd number of characters in the plaintext and double-letter digraphs, by default an `x` is used to pad the plaintext or replace the duplicated letter.

You may change the monograph directly:

```js
fairplay.monograph = "x";
```

Note: This implementation of the Playfair cipher changes all letter `j`s to `i`s to facilitate perfect 5x5 key squares.

## Testing

Test with [nodeunit](https://github.com/caolan/nodeunit):

```bash
nodeunit test/test.js
```
