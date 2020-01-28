import { expect } from 'chai';

import lib from './index';

describe('lib', () => {
    it('should return empty string there is no input', () => {
        expect(lib()).to.equal('');
    });

    it('should return empty string when input is a single falsy value', () => {
        expect(lib('')).to.equal('');
        expect(lib(0)).to.equal('');
        expect(lib(null)).to.equal('');
        expect(lib(undefined)).to.equal('');
        expect(lib(false)).to.equal('');
    });

    it('should return empty string when input is a number or a boolean value', () => {
        expect(lib(0)).to.equal('');
        expect(lib(1)).to.equal('');
        expect(lib(-1)).to.equal('');
        expect(lib(1.23)).to.equal('');
        expect(lib(-1.23)).to.equal('');
        expect(lib(NaN)).to.equal('');
        expect(lib(true)).to.equal('');
        expect(lib(false)).to.equal('');
    });

    it('should return empty string when input is an empty array', () => {
        expect(lib([])).to.equal('');
    });

    it('should return string form of input values', () => {
        expect(lib('abc')).to.equal('abc');
        expect(lib({ a: 1, toString: () => 'abc' })).to.equal('abc');
    });

    it('should return string form of the value of input functions', () => {
        expect(lib(() => 'abc')).to.equal('abc');
    });

    it('should collect property names of input objects the value of which are truthy', () => {
        expect(lib({ a: 1, b: 2, c: 0, d: false, e: true })).to.equal('a b e');
    });

    it('should use the return value of the functions when collecting property names of input objects the value of which are functions', () => {
        expect(
            lib({ a: 1, b: () => 2, c: () => 0, d: false, e: () => true }),
        ).to.equal('a b e');
    });

    it('should concat a list of inputs', () => {
        expect(lib('a', 'b', 'c')).to.equal('a b c');
    });

    it('should skip any falsy values in the list of inputs', () => {
        expect(lib('a', 0, 'b', null, 'c', false, 'd')).to.equal('a b c d');
    });

    it('should flattern an array input', () => {
        expect(lib(['a', 'b', 'c'])).to.equal('a b c');
        expect(lib(['a', false, 'b', 0, 'c'])).to.equal('a b c');
    });

    it('should recursively flattern an array input', () => {
        expect(lib(['a', 'b', ['c', 'd'], 'e'])).to.equal('a b c d e');
        expect(lib(['a', false, 'b', ['c', 0, 'd'], 'e'])).to.equal(
            'a b c d e',
        );
    });

    it('should not output unnecessary white spaces', () => {
        const space = String.fromCharCode(0x20);
        const formFeed = String.fromCharCode(0x0c);
        const lineFeed = String.fromCharCode(0x0a);
        const carriageReturn = String.fromCharCode(0x0d);
        const hTab = String.fromCharCode(0x09);
        const vTab = String.fromCharCode(0x0b);

        expect(lib(' a ', ' b ', ' ', ' c ')).to.equal('a b c');
        expect(
            lib(
                ` a ${space}${formFeed}${lineFeed}${carriageReturn}${hTab}${vTab} `,
                ' b ',
                `${space}${formFeed}${lineFeed}${carriageReturn}${hTab}${vTab}`,
                ' c ',
            ),
        ).to.equal('a b c');
        expect(lib(' a  b ', ' c  d ')).to.equal('a b c d');
    });
});
