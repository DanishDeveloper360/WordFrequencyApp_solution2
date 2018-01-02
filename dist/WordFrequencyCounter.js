'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WordFrequencyCounter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _readline = require('readline');

var _fs = require('fs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WordFrequencyCounter = exports.WordFrequencyCounter = function () {

    /**
     * Constructor
     * @param filePath {String}
     */
    function WordFrequencyCounter(filePath) {
        _classCallCheck(this, WordFrequencyCounter);

        this.filePath = filePath;
        this.tree = { count: 0 };
    }

    /**
     * Reads and processes file line by line
     */


    _createClass(WordFrequencyCounter, [{
        key: 'countWords',
        value: function countWords() {
            var _this = this;

            try {
                var reader = (0, _readline.createInterface)({
                    input: (0, _fs.createReadStream)(this.filePath)
                });
                reader.on('line', function (line) {
                    return _this._readLine(line);
                });
                reader.on('close', function (line) {
                    return _this._logTree();
                });
            } catch (e) {
                console.log(e);
            }
        }

        /**
         * Updates tree with the words contained in line
         * @param line {String}
         * @private
         */

    }, {
        key: '_readLine',
        value: function _readLine() {
            var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            console.log(line);
            var node = this.tree;
            for (var i = 0, char; i < line.length; i++) {
                // Loop through every char in the line
                char = line.charAt(i).toString().toLowerCase(); // Make char lowercase to avoid duplicates
                if (char && /[A-Za-z0-9]/.test(char)) {
                    // Validate char(alphanumeric only)
                    if (!node.hasOwnProperty(char)) {
                        // Node does not contain char
                        node[char] = { count: 0 }; // Initialize new node for char
                    }
                    if (i === line.length - 1) {
                        // Last character in line
                        node[char].count++; // Increment count in node
                    }
                    node = node[char]; // Otherwise move down to the next node
                } else if (node !== this.tree) {
                    // Invalid char found(end of word)
                    node.count++; // Increment count in node
                    node = this.tree; // Point node back to root
                }
            }
        }
    }, {
        key: '_readLine',
        value: function _readLine() {
            var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var node = this.tree;
            for (var i = 0, char; i < line.length; i++) {
                // Loop through every char in the line
                char = line.charAt(i).toString().toLowerCase(); // Make char lowercase to avoid duplicates
                if (char && /[A-Za-z0-9]/.test(char)) {
                    // Validate char(alphanumeric only)
                    if (!node.hasOwnProperty(char)) {
                        // Node does not contain char
                        node[char] = { count: 0 }; // Initialize new node for char
                    }
                    if (i === line.length - 1) {
                        // Last character in line
                        node[char].count++; // Increment count in node
                    }
                    node = node[char]; // Otherwise move down to the next node
                } else if (node !== this.tree) {
                    // Invalid char found(end of word)
                    node.count++; // Increment count in node
                    node = this.tree; // Point node back to root
                }
            }
        }

        /**
         * Checks if a number is prime or not
         * @param num {Number} 
         */

    }, {
        key: '_isPrime',
        value: function _isPrime(num) {
            for (var i = 2, s = Math.sqrt(num); i <= s; i++) {
                if (num % i === 0) return false;
            }return num !== 1;
        }

        /**
         * Recursive function to traverse and print the words and counts stored
         * in the tree
         * @param node {Object}
         * @param buffer {String}
         */

    }, {
        key: '_logTree',
        value: function _logTree() {
            var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tree;
            var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


            if (node.count > 0) {
                var isPrime = this._isPrime(node.count) ? "Yes" : "No";
                console.log('"' + buffer + '" -> count: ' + node.count + ' -> Is Prime: ' + isPrime);
            }
            for (var i in node) {
                if (node.hasOwnProperty(i) && i !== 'count') {
                    this._logTree(node[i], '' + buffer + i);
                }
            }
        }
    }]);

    return WordFrequencyCounter;
}();