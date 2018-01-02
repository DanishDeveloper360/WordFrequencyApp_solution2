import { WordFrequencyCounter } from './WordFrequencyCounter';

let wordFrequencyCounter = new WordFrequencyCounter('test.txt');

// Populate tree
wordFrequencyCounter.countWords();