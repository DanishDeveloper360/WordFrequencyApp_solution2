# Node.Js Word Frequency Count App 
 ```NodeJS/ES6``` The program that takes a text file and outputs a unique list of all words found within the document and the count for how many times that word appeared.

As a data structure, a simple JavaScript object was used to represent a tree, where the properties are used as links and the node holds a count to represent how many times the word (from the root down to the node) appears in the input text. In the resultant tree, any node with a positive `count` represents a word in the file.

The algorithm takes, at a higher level, the folowing steps:
  1. Read the file line by line
  2. For each line of text encountered:
```javascript

    /**
     * Updates tree with the words contained in line
     * @param line {String}
     * @private
     */
    _readLine(line = '') {
        var node = this.tree;
        for (var i = 0, char; i < line.length; i++) {                // Loop through every char in the line
            char = line.charAt(i).toString().toLowerCase();          // Make char lowercase to avoid duplicates
            if (char && /[A-Za-z0-9]/.test(char)) {                  // Validate char(alphanumeric only)
                if (!node.hasOwnProperty(char)) {                    // Node does not contain char
                    node[char] = {count: 0};                         // Initialize new node for char
                }
                if(i === line.length - 1){                           // Last character in line
                    node[char].count++;                              // Increment count in node
                }
                node = node[char];                                   // Otherwise move down to the next node
            } else if (node !== this.tree) {                         // Invalid char found(end of word)
                node.count++;                                        // Increment count in node
                node = this.tree;                                    // Point node back to root
            }
        }
    }
```

```
### Usage
run `npm install` and then run `npm run dev` or npm start to start the server locally and run the code.

// once you run the above commands dist folder will have the ES5 code...
