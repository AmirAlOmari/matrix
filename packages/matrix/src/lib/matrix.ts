import type { MapMatrix } from './map-matrix.type';
import type { ObjectMatrix } from './object-matrix.type';

export class Matrix<Of extends string, Value> {
  public static fromMap<Of extends string, Value>(
    map: MapMatrix<Of, Value>
  ): Matrix<Of, Value> {
    return new Matrix(map);
  }

  public static fromObject<Of extends string, Value>(
    object: ObjectMatrix<Of, Value>
  ): Matrix<Of, Value> {
    const objectEntries = Object.entries(object) as [Of, Record<Of, Value>][];
    const mapEntries = objectEntries.map(([of, innerObject]) => {
      const innerObjectEntries = Object.entries(innerObject) as [Of, Value][];
      const innerMap = new Map(innerObjectEntries);

      return [of, innerMap] as [Of, Map<Of, Value>];
    });
    const mapMatrix: MapMatrix<Of, Value> = new Map(mapEntries);

    return new Matrix(mapMatrix);
  }

  constructor(private readonly map: MapMatrix<Of, Value>) {
    if (!this.isComplete()) {
      throw new Error('Matrix is not complete');
    }
  }

  private isComplete(): boolean {
    const valuesArr = Array.from(this.map.values());

    return valuesArr.every((innerMap) => innerMap.size === this.map.size);
  }

  public get(from: Of, to: Of): Value {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.map.get(from)!.get(to)!;
  }

  public toObject(): ObjectMatrix<Of, Value> {
    const mapEntries = Array.from(this.map.entries());
    const objectEntries = mapEntries.map(([from, innerMap]) => {
      const innerObjectEntries = Array.from(innerMap.entries());
      const innerObject = innerObjectEntries.reduce((acc, [to, value]) => {
        acc[to] = value;

        return acc;
      }, {} as Record<Of, Value>);

      return [from, innerObject] as [Of, Record<Of, Value>];
    });

    const objectMatrix = objectEntries.reduce((acc, [of, innerObject]) => {
      acc[of] = innerObject;

      return acc;
    }, {} as ObjectMatrix<Of, Value>);

    return objectMatrix;
  }
}
