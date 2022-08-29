export type ObjectMatrix<Of extends string, Value> = Record<
  Of,
  Record<Of, Value>
>;
