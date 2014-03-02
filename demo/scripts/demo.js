/*globals define, document, fairplay, module, window*/

(function (document, window) {
	"use strict";

	var demo = {
		vars: {
			passphrase: {},
			plaintext: {},
			ciphertext: {},
			key: {},
			encrypt: {},
			decrypt: {}
		},
		setup: function () {
			var i;

			for (i in this.vars) {
				if (this.vars.hasOwnProperty(i)) {
					this.vars[i] = document.getElementById(i);
				}
			}

			return this;
		},
		events: function () {
			var passphrase = this.vars.passphrase,
				encrypt = this.vars.encrypt,
				decrypt = this.vars.decrypt;

			passphrase.onkeyup = this.keyup;
			encrypt.onclick = this.encrypt;
			decrypt.onclick = this.decrypt;

			return this;
		},
		keyup: function () {
			var $this = demo,
				key = $this.vars.key,
				text = this.value;

			key.innerHTML = fairplay.printKey(text, "<br />");
		},
		encrypt: function () {
			var $this = demo,
				passphrase = $this.vars.passphrase,
				plaintext = $this.vars.plaintext,
				ciphertext = $this.vars.ciphertext;

			ciphertext.value = fairplay.encrypt(passphrase.value, plaintext.value);
		},
		decrypt: function () {
			var $this = demo,
				passphrase = $this.vars.passphrase,
				plaintext = $this.vars.plaintext,
				ciphertext = $this.vars.ciphertext;

			plaintext.value = fairplay.decrypt(passphrase.value, ciphertext.value);
		},
		init: function () {
			this.setup().events();
		}
	};

	if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = demo;
	} else {
		window.demo = demo;

		if (typeof define === "function" && define.amd) {
			define("demo", [], function () {
				return demo;
			});
		}
	}
}(document, window));