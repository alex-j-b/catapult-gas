const { parseGas10 } = require('../src/parser.js');
const gas10Pg = require('./gas10Pg.json');

describe('Parser tests', () => {
    it('should parse data in appropriate format', () => {
        expect(parseGas10(gas10Pg)).toMatchSnapshot();
    });
});
