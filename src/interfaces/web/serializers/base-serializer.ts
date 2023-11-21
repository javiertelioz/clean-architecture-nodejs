/**
 * Serializer Interface
 */
export interface ISerializer {
  serialize: (data: any) => any;
}

/**
 * Single Serializer Interface
 */
export interface ISingleSerializer {
  singleSerialize: (entity: any) => any;
}

/**
 * Base Serializer
 */
export interface BaseSerializer extends ISerializer, ISingleSerializer {}
