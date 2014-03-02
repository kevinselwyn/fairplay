/*globals define, module, window*/
/*jslint regexp: true*/

(function () {
	"use strict";

	var fairplay = {
		monograph: "x",
		cleanNumbers: function (text) {
			var digits = text.match(/\d/g),
				regex = {},
				replace = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
				i = 0,
				l = 0;

			if (!digits) {
				return text;
			}

			for (i = 0, l = digits.length; i < l; i += 1) {
				regex = new RegExp(digits[i], "g");

				text = text.replace(regex, replace[parseInt(digits[i], 10)]);
			}

			return text;
		},
		generateKey: function (phrase) {
			var alphabet = (function () {
				var alph = {},
					i = 0,
					l = 0;

				for (i = 97, l = 105; i <= l; i += 1) {
					alph[String.fromCharCode(i)] = false;
				}

				for (i = 107, l = 122; i <= l; i += 1) {
					alph[String.fromCharCode(i)] = false;
				}

				return alph;
			}()),
				keyphrase = "",
				key = [],
				i = 0,
				l = 0;

			phrase = phrase.toLowerCase().replace(/[^a-z0-9]/g, "").replace("j", "i");
			phrase = this.cleanNumbers(phrase);

			for (i = 0, l = phrase.length; i < l; i += 1) {
				if (!alphabet[phrase[i]]) {
					keyphrase += phrase[i];
					alphabet[phrase[i]] = true;
				}
			}

			for (i in alphabet) {
				if (alphabet.hasOwnProperty(i)) {
					if (!alphabet[i]) {
						keyphrase += i;
					}
				}
			}

			for (i = 0, l = 5; i < l; i += 1) {
				key.push(keyphrase.substring(i * 5, (i * 5) + 5).split(""));
			}

			return key;
		},
		generateText: function (plaintext) {
			var i = 0,
				l = 0;

			plaintext = plaintext.toLowerCase().replace(/[^a-z0-9]/g, "").replace("j", "i");
			plaintext = this.cleanNumbers(plaintext);
			plaintext = plaintext.split("");

			if (plaintext.length % 2) {
				plaintext.push(this.monograph);
			}

			for (i = 0, l = plaintext.length; i < l; i += 2) {
				if (plaintext[i] === plaintext[i + 1]) {
					plaintext[i + 1] = "x";
				}
			}

			return plaintext.join("");
		},
		printKey: function (phrase, newline) {
			var key = this.generateKey(phrase),
				output = [],
				i = 0,
				l = 0;

			for (i = 0, l = key.length; i < l; i += 1) {
				output.push(key[i].join(" "));
			}

			return output.join(newline || "\n");
		},
		index: function (char, key) {
			var row = 0,
				col = 0;

			for (col = 0; col < key.length; col += 1) {
				for (row = 0; row < key.length; row += 1) {
					if (key[col][row] === char) {
						return {
							row: row,
							col: col
						};
					}
				}
			}

			return {
				row: 0,
				col: 0
			};
		},
		shift: function (key, text1, text2, dir) {
			var output = "",
				coord = {
					a: this.index(text1, key),
					b: this.index(text2, key)
				};

			if (coord.a.row === coord.b.row) {
				output += key[Math.abs((coord.a.col + dir + 5) % 5)][coord.a.row];
				output += key[Math.abs((coord.b.col + dir + 5) % 5)][coord.b.row];
			} else if (coord.a.col === coord.b.col) {
				output += key[coord.a.col][Math.abs((coord.a.row + dir + 5) % 5)];
				output += key[coord.b.col][Math.abs((coord.b.row + dir + 5) % 5)];
			} else {
				output += key[coord.a.col][coord.b.row];
				output += key[coord.b.col][coord.a.row];
			}

			return output;
		},
		encrypt: function (keyphrase, plaintext) {
			var key = this.generateKey(keyphrase),
				text = this.generateText(plaintext),
				output = "",
				i = 0,
				l = 0;

			for (i = 0, l = text.length; i < l; i += 2) {
				output += this.shift(key, text[i], text[i + 1], 1);
			}

			return output;
		},
		decrypt: function (keyphrase, ciphertext) {
			var key = this.generateKey(keyphrase),
				text = this.generateText(ciphertext),
				output = "",
				i = 0,
				l = 0;

			for (i = 0, l = text.length; i < l; i += 2) {
				output += this.shift(key, text[i], text[i + 1], -1);
			}

			return output;
		}
	};

	if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = fairplay;
	} else {
		window.fairplay = fairplay;

		if (typeof define === "function" && define.amd) {
			define("fairplay", [], function () {
				return fairplay;
			});
		}
	}
}());