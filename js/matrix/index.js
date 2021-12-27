// Internal init for various static creators
function initMatrix(mat, spec) {
  if (spec.type === "array") {
    const rows = spec.data;
    mat.m = rows.length;
    mat.n = rows[0].length;
    mat.push(...rows);
  }
}

function Matrix(m, n, deafultValue) {
  // shorcut / internal constructor
  if (typeof m === "object") {
    initMatrix(this, m);
    return;
  }

  this.m = m;
  this.n = n;

  const defaultV = deafultValue === undefined ? 0 : deafultValue;
  for (let j = 0; j < m; j++) {
    this.push(new Array(n).fill(defaultV));
  }
}

Matrix.fromString = function (str) {
  const lines = str.split("\n");
  let rows = [];
  lines.forEach((l) => {
    l = l.trim();

    if (l.length) {
      const row = l.split(/\s+/).map((v) => parseInt(v));
      rows.push(row);
    }
  });

  return new Matrix({
    type: "array",
    data: rows,
  });
};

Matrix.prototype = [];

Matrix.prototype.rows = function () {
  return this.m;
};

Matrix.prototype.cols = function () {
  return this.n;
};

Matrix.prototype.at = function (i, j) {
  if (i < 0 || j < 0) return undefined;
  if (i >= this.m || j >= this.n) return undefined;
  return this[i][j];
};

Matrix.prototype.eachRow = function (f) {
  for (let j = 0; j < this.m; j++) {
    f(this[j], j);
  }
};

Matrix.prototype.eachElement = function (f) {
  for (let i = 0; i < this.m; i++) {
    for (let j = 0; j < this.n; j++) {
      f(this[i][j], i, j, this);
    }
  }
};

Matrix.prototype.print = function () {
  this.eachRow((r) => {
    console.log(r.join(" "));
  });
};

Matrix.prototype.transform = function (vec) {
  let i, j;
  let ret = new Array(vec.length).fill(0);
  for (j = 0; j < vec.length; j++) {
    for (i = 0; i < this.n; i++) {
      ret[j] += this[j][i] * vec[i];
    }
  }
  return ret;
};

Matrix.prototype.mult = function (b) {
  let i, j;
  const m = this.m;
  const n = this.n; // === b.m
  const p = b.n;
  let ret = new Matrix(m, p);
  for (i = 0; i < m; i++) {
    for (j = 0; j < p; j++) {
      for (k = 0; k < n; k++) ret[i][j] += this[i][k] * b[k][j];
    }
  }
  return ret;
};

Matrix.prototype.identity = function (n) {
  let ret = new Matrix(n, n);
  ret.eachRow((r, i) => {
    r[i] = 1;
  });

  return ret;
};

Matrix.prototype.pow = function (n) {
  if (n === 0) return Matrix.identity(n);
  if (n === 1) return this;
  if (n % 2 === 0) {
    const m2 = this.pow(n / 2);
    return m2.mult(m2);
  }

  const m2 = this.pow((n - 1) / 2);
  return m2.mult(m2).mult(this);
};

module.exports = Matrix;
