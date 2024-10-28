export type GeneratorReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer TReturnType
  ? TReturnType extends Promise<infer TPromiseType>
    ? TPromiseType
    : TReturnType extends Iterator<any, infer TIteratorReturnType, any>
    ? TIteratorReturnType
    : TReturnType
  : T;

export type GRT<T extends (...args: any) => any> = GeneratorReturnType<T>;

export interface IKeyValue<T> {
  [key: string]: T;
}

export type ValueOf<T> = T[keyof T] extends (...args: any) => infer TReturnType
  ? TReturnType
  : T[keyof T];

export type KeyValueOf<T, K extends keyof T> = T[K] extends (
  ...args: any
) => infer TReturnType
  ? TReturnType
  : T[K];

/**
 * Change required keys of object to optional;
 *
 * @example
 * type BaseObject = {
 *    key1: number;
 *    key2: string;
 *    key3: boolean
 * };
 *
 * type BaseObjectWithRequiredOnlyKey1 = PartialKeys<BaseObject, 'key2' | 'key3'>
 *
 * //Result Type
 * {
 *    key1: number;
 *    key2?: string;
 *    key3?: boolean
 * }
 */
export type PartialKeys<T extends {}, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
} & {
  [Key in K]?: T[Key];
};

/**
 * Get value of object type
 *
 * @example
 * type TestObject = {
 *    ACCEPTED: 'Accepted',
 *    IN_REVIEW: 'InReview',
 * }
 *
 * type ObjectValues = ValueOfObject<TestObject> // 'Accepted' | 'InReview'
 */
export type ValueOfObject<TObj extends Record<string, unknown>> =
  TObj[keyof TObj];

export type PromiseOrGeneratorType<T> =
  | Promise<T>
  | Generator<any, T extends Response ? void : T>;

export type StyledComponentProps = {
  classNamePrefix?: string;
};

export type ObjectType<
  TValue = any,
  TKey extends string | number | symbol = string | number | symbol
> = Record<TKey, TValue>;

/**
 * Change all keys in object to required
 * @example
 * type MyObject = {
 *    level1key1?: number;
 *    level1key2?: {
 *      level2key1?: {
 *        level3key1?: string
 *      }
 *    }
 * };
 *
 * type RequiredKeyOfMyObject = DeepRequired<MyObject>
 *
 * //Result Type
 * {
 *    level1key1: number;
 *    level1key2: {
 *      level2key1: {
 *        level3key1: string
 *      }
 *    }
 * };
 */
export type DeepRequired<T extends ObjectType> = {
  [Key in keyof T]-?: ObjectType extends T[Key] ? DeepRequired<T[Key]> : T[Key];
};

export type RequiredKeys<T extends {}, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
} & {
  [Key in K]-?: T[Key];
};
