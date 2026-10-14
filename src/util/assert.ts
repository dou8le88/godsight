export function assertNotNull<T>(v: T): T {
  if (v === null) {
    throw new Error('Value was null!');
  }
  return v;
}

export function assertNotUndefined<T>(v: T): T {
  if (v === undefined) {
    throw new Error('Value was undefined!');
  }
  return v;
}

export function assertNotNullOrUndefined<T>(v: T): T {
  return assertNotNull(assertNotUndefined(v));
}
