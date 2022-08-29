import type { MapMatrix } from './map-matrix.type';
import type { ObjectMatrix } from './object-matrix.type';
import { Matrix } from './matrix';

describe('Matrix', () => {
  describe('.fromMap()', () => {
    describe('when matrix is **NOT** complete', () => {
      it('should throw', () => {
        const map: MapMatrix<string, number> = new Map([
          ['a', new Map([['b', 1]])],
          ['c', new Map([['d', 2]])],
        ]);

        expect(() => Matrix.fromMap(map)).toThrowError(
          'Matrix is not complete'
        );
      });
    });

    describe('when Of = string, Value = number', () => {
      it('should create', () => {
        const map: MapMatrix<string, number> = new Map([
          ['a', new Map([['a', 1]])],
        ]);
        const matrix = Matrix.fromMap(map);

        expect(matrix).toBeInstanceOf(Matrix);
      });
    });

    describe('when Of = string, Value = string', () => {
      it('should create', () => {
        const map: MapMatrix<string, string> = new Map([
          ['a', new Map([['a', 'a']])],
        ]);
        const matrix = Matrix.fromMap(map);

        expect(matrix).toBeInstanceOf(Matrix);
      });
    });

    describe('when Of = CustomType, Value = number', () => {
      type CustomType = 'a' | 'b';

      it('should create', () => {
        const map: MapMatrix<CustomType, number> = new Map([
          [
            'a',
            new Map([
              ['a', 1],
              ['b', 1],
            ]),
          ],
          [
            'b',
            new Map([
              ['a', 1],
              ['b', 1],
            ]),
          ],
        ]);
        const matrix = Matrix.fromMap(map);

        expect(matrix).toBeInstanceOf(Matrix);
      });
    });
  });

  describe('.fromObject()', () => {
    describe('when matrix is **NOT** complete', () => {
      it('should throw', () => {
        const object: ObjectMatrix<string, number> = {
          a: { c: 1 },
          b: { d: 2 },
        };

        expect(() => Matrix.fromObject(object)).toThrowError(
          'Matrix is not complete'
        );
      });
    });

    describe('when Of = string, Value = number', () => {
      it('should create', () => {
        const object: ObjectMatrix<string, number> = {
          a: { a: 1 },
        };
        const matrix = Matrix.fromObject(object);

        expect(matrix).toBeInstanceOf(Matrix);
      });
    });

    describe('when Of = string, Value = string', () => {
      it('should create', () => {
        const object: ObjectMatrix<string, string> = {
          a: { a: 'a' },
        };
        const matrix = Matrix.fromObject(object);

        expect(matrix).toBeInstanceOf(Matrix);
      });
    });

    describe('when Of = CustomType, Value = number', () => {
      type CustomType = 'a' | 'b';

      it('should create', () => {
        const object: ObjectMatrix<CustomType, number> = {
          a: { a: 1, b: 1 },
          b: { a: 1, b: 1 },
        };
        const matrix = Matrix.fromObject(object);

        expect(matrix).toBeInstanceOf(Matrix);
      });
    });
  });

  describe('#get()', () => {
    let matrix: Matrix<string, string>;

    beforeEach(() => {
      matrix = Matrix.fromObject({
        a: { a: 'a-a', b: 'a-b', c: 'a-c' },
        b: { a: 'b-a', b: 'b-b', c: 'b-c' },
        c: { a: 'c-a', b: 'c-b', c: 'c-c' },
      });
    });

    it('should return corresponding value', () => {
      expect(matrix.get('a', 'a')).toBe('a-a');
      expect(matrix.get('a', 'b')).toBe('a-b');
      expect(matrix.get('a', 'c')).toBe('a-c');

      expect(matrix.get('b', 'a')).toBe('b-a');
      expect(matrix.get('b', 'b')).toBe('b-b');
      expect(matrix.get('b', 'c')).toBe('b-c');

      expect(matrix.get('c', 'a')).toBe('c-a');
      expect(matrix.get('c', 'b')).toBe('c-b');
      expect(matrix.get('c', 'c')).toBe('c-c');
    });
  });
});
