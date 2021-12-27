const Matrix = require('.');

test('Creates a Matrix', () => {
    const m = new Matrix(4, 3);
    expect(m.m).toBe(4);
    expect(m.n).toBe(3);
});