const getImmutable = (val: any) => Object.freeze(val);

export const emptyObject = getImmutable({});

export const emptyList = getImmutable([]);

export const noOp = () => {};

export const alwaysTrue = () => true;
