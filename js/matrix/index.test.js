const Matrix = require(".");

test("Creates a Matrix", () => {
  const m = new Matrix(4, 3);
  expect(m.m).toBe(4);
  expect(m.rows()).toBe(4);
  expect(m.n).toBe(3);
  expect(m.cols()).toBe(3);
});

test("Accessor at() works", () => {
  const m = new Matrix(4, 3);
  m.eachElement((_v, i, j) => {
    m[i][j] = 100 * i + j;
  });

  m.eachElement((_v, i, j) => {
    expect(m.at(i, j)).toBe(100 * i + j);
  });

  expect(m.at(-1, 1)).toBeUndefined();
  expect(m.at(1, -1)).toBeUndefined();
  expect(m.at(4, 1)).toBeUndefined();
  expect(m.at(1, 3)).toBeUndefined();
});

test(".fromString works", () => {
  const m = Matrix.fromString(`
    1 2 3
    4 5 6 
`);

  expect(m[0][0]).toBe(1);
  expect(m[1][2]).toBe(6);
});
