'use strict';

var _WordFrequencyCounter = require('./WordFrequencyCounter');

var wordFrequencyCounter = new _WordFrequencyCounter.WordFrequencyCounter('test.txt');

// Populate tree
wordFrequencyCounter.countWords();