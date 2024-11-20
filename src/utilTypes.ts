type _ArrayOfLength<
  T extends number,
  _ extends unknown[] = [],
> = _["length"] extends T ? _ : _ArrayOfLength<T, [unknown, ..._]>;

type EnforceNumber<T> = T extends number ? T : never;

type AddOne<T extends number> = EnforceNumber<
  [..._ArrayOfLength<T>, unknown]["length"]
>;

type _Range<
  T1 extends number,
  T2 extends number,
  _ extends number[] = [],
> = T1 extends T2 ? [..._, T1] : _Range<AddOne<T1>, T2, [..._, T1]>;

export type Range<T1 extends number, T2 extends number> = _Range<T1, T2>;
