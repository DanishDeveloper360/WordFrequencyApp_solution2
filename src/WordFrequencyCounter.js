import { createInterface } from 'readline';
import { createReadStream } from 'fs';

export class WordFrequencyCounter {

    /**
     * Constructor
     * @param filePath {String}
     */
    constructor(filePath) {
        this.filePath = filePath;
        this.tree = { count: 0 };
    }

    /**
     * Reads and processes file line by line
     */
    countWords() {
        try {
            let reader = createInterface({
                input: createReadStream(this.filePath)
            });
            reader.on('line', line => this._readLine(line));
            reader.on('close', line => this._logTree());
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Updates tree with the words contained in line
     * @param line {String}
     * @private
     */
    _readLine(line = '') {
        console.log(line);
        var node = this.tree;
        for (var i = 0, char; i < line.length; i++) {                // Loop through every char in the line
            char = line.charAt(i).toString().toLowerCase();          // Make char lowercase to avoid duplicates
            if (char && /[A-Za-z0-9]/.test(char)) {                  // Validate char(alphanumeric only)
                if (!node.hasOwnProperty(char)) {                    // Node does not contain char
                    node[char] = { count: 0 };                         // Initialize new node for char
                }
                if (i === line.length - 1) {                           // Last character in line
                    node[char].count++;                              // Increment count in node
                }
                node = node[char];                                   // Otherwise move down to the next node
            } else if (node !== this.tree) {                         // Invalid char found(end of word)
                node.count++;                                        // Increment count in node
                node = this.tree;                                    // Point node back to root
            }
        }
    }

    _readLine(line = '') {
        var node = this.tree;
        for (var i = 0, char; i < line.length; i++) {                // Loop through every char in the line
            char = line.charAt(i).toString().toLowerCase();          // Make char lowercase to avoid duplicates
            if (char && /[A-Za-z0-9]/.test(char)) {                  // Validate char(alphanumeric only)
                if (!node.hasOwnProperty(char)) {                    // Node does not contain char
                    node[char] = { count: 0 };                         // Initialize new node for char
                }
                if (i === line.length - 1) {                           // Last character in line
                    node[char].count++;                              // Increment count in node
                }
                node = node[char];                                   // Otherwise move down to the next node
            } else if (node !== this.tree) {                         // Invalid char found(end of word)
                node.count++;                                        // Increment count in node
                node = this.tree;                                    // Point node back to root
            }
        }
    }


    /**
     * Checks if a number is prime or not
     * @param num {Number} 
     */
    _isPrime(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++)
            if (num % i === 0) return false;
        return num !== 1;
    }

    /**
     * Recursive function to traverse and print the words and counts stored
     * in the tree
     * @param node {Object}
     * @param buffer {String}
     */
    _logTree(node = this.tree, buffer = '') {
        
        if (node.count > 0) {
            let isPrime = this._isPrime(node.count) ? "Yes" : "No";
            console.log(`"${buffer}" -> count: ${node.count} -> Is Prime: ${isPrime}`);
        }
        for (let i in node) {
            if (node.hasOwnProperty(i) && i !== 'count') {
                this._logTree(node[i], `${buffer}${i}`)
            }
        }
    }
}
