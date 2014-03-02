/*globals exports, require*/

(function (fairplay) {
	"use strict";

	var key = [
		["c", "h", "a", "r", "l"],
		["e", "s", "w", "t", "o"],
		["n", "b", "d", "f", "g"],
		["i", "k", "m", "p", "q"],
		["u", "v", "x", "y", "z"]
	];

	exports.utils = {
		index: function (test) {
			test.deepEqual(fairplay.index("d", key), {
				row: 2,
				col: 2
			});
			test.done();
		}
	};

	exports.generators = {
		"generateKey()": function (test) {
			test.deepEqual(fairplay.generateKey("Charles Wheatstone"), key);
			test.done();
		},
		"generateText()": function (test) {
			test.strictEqual(fairplay.generateText("Lord Playfair"), "lordplayfair");
			test.done();
		}
	};

	exports["printKey()"] = {
		"\\n": function (test) {
			test.strictEqual(fairplay.printKey("Charles Wheatstone"), "c h a r l\ne s w t o\nn b d f g\ni k m p q\nu v x y z");
			test.done();
		},
		"<br />": function (test) {
			test.strictEqual(fairplay.printKey("Charles Wheatstone", "<br />"), "c h a r l<br />e s w t o<br />n b d f g<br />i k m p q<br />u v x y z");
			test.done();
		}
	};

	exports["shift()"] = {
		"Horizontal Encrypt": function (test) {
			test.strictEqual(fairplay.shift(key, "s", "t", 1), "wo");
			test.done();
		},
		"Horizontal Decrypt": function (test) {
			test.strictEqual(fairplay.shift(key, "w", "o", -1), "st");
			test.done();
		},
		"Vertical Encrypt": function (test) {
			test.strictEqual(fairplay.shift(key, "s", "k", 1), "bv");
			test.done();
		},
		"Vertical Decrypt": function (test) {
			test.strictEqual(fairplay.shift(key, "b", "v", -1), "sk");
			test.done();
		},
		"Rectangle Encrypt": function (test) {
			test.strictEqual(fairplay.shift(key, "s", "p", 1), "tk");
			test.done();
		},
		"Rectangle Decrypt": function (test) {
			test.strictEqual(fairplay.shift(key, "t", "k", 1), "sp");
			test.done();
		}
	};

	exports["encrypt()/decrypt()"] = {
		"encrypt()": function (test) {
			test.strictEqual(fairplay.encrypt("Charles Wheatstone", "Lord Playfair"), "ogafqrrxdrpc");
			test.done();
		},
		"decrypt()": function (test) {
			test.strictEqual(fairplay.decrypt("Charles Wheatstone", "Ogaf Qrrxdrpc"), "lordplayfair");
			test.done();
		}
	};
}(require("../src/fairplay")));