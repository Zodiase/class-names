import lib from './index';

describe('lib', () => {
    it('should return empty string there is no input', () => {
        expect(lib()).toEqual('');
    });

    it('should return empty string when input is a single falsy value', () => {
        expect(lib('')).toEqual('');
        expect(lib(0)).toEqual('');
        expect(lib(null)).toEqual('');
        expect(lib(undefined)).toEqual('');
        expect(lib(false)).toEqual('');
    });

    it('should return empty string when input is a number or a boolean value', () => {
        expect(lib(0)).toEqual('');
        expect(lib(1)).toEqual('');
        expect(lib(-1)).toEqual('');
        expect(lib(1.23)).toEqual('');
        expect(lib(-1.23)).toEqual('');
        expect(lib(NaN)).toEqual('');
        expect(lib(true)).toEqual('');
        expect(lib(false)).toEqual('');
    });

    it('should return empty string when input is an empty array', () => {
        expect(lib([])).toEqual('');
    });

    it('should return string form of input values', () => {
        expect(lib('abc')).toEqual('abc');
        expect(lib({ a: 1, toString: () => 'abc' })).toEqual('abc');
    });

    it('should return string form of the value of input functions', () => {
        expect(lib(() => 'abc')).toEqual('abc');
    });

    it('should collect property names of input objects the value of which are truthy', () => {
        expect(lib({ a: 1, b: 2, c: 0, d: false, e: true })).toEqual('a b e');
    });

    it('should use the return value of the functions when collecting property names of input objects the value of which are functions', () => {
        expect(
            lib({ a: 1, b: () => 2, c: () => 0, d: false, e: () => true }),
        ).toEqual('a b e');
    });

    it('should concat a list of inputs', () => {
        expect(lib('a', 'b', 'c')).toEqual('a b c');
    });

    it('should skip any falsy values in the list of inputs', () => {
        expect(lib('a', 0, 'b', null, 'c', false, 'd')).toEqual('a b c d');
    });

    it('should flattern an array input', () => {
        expect(lib(['a', 'b', 'c'])).toEqual('a b c');
        expect(lib(['a', false, 'b', 0, 'c'])).toEqual('a b c');
    });

    it('should recursively flattern an array input', () => {
        expect(lib(['a', 'b', ['c', 'd'], 'e'])).toEqual('a b c d e');
        expect(lib(['a', false, 'b', ['c', 0, 'd'], 'e'])).toEqual('a b c d e');
    });

    it('should not output unnecessary white spaces', () => {
        const space = String.fromCharCode(0x20);
        const formFeed = String.fromCharCode(0x0c);
        const lineFeed = String.fromCharCode(0x0a);
        const carriageReturn = String.fromCharCode(0x0d);
        const hTab = String.fromCharCode(0x09);
        const vTab = String.fromCharCode(0x0b);

        expect(lib(' a ', ' b ', ' ', ' c ')).toEqual('a b c');
        expect(
            lib(
                ` a ${space}${formFeed}${lineFeed}${carriageReturn}${hTab}${vTab} `,
                ' b ',
                `${space}${formFeed}${lineFeed}${carriageReturn}${hTab}${vTab}`,
                ' c ',
            ),
        ).toEqual('a b c');
        expect(lib(' a  b ', ' c  d ')).toEqual('a b c d');
    });
});
