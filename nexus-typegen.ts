/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./api/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  ErrorBody: { // root type
    field: string; // String!
    message: string; // String!
    status: number; // Int!
  }
  FieldError: { // root type
    error?: NexusGenRootTypes['ErrorBody'] | null; // ErrorBody
    success: boolean; // Boolean!
  }
  Mutation: {};
  Query: {};
  SuccessResponse: { // root type
    success: boolean; // Boolean!
    user?: NexusGenRootTypes['User'] | null; // User
  }
  User: { // root type
    email: string; // String!
    id: string; // String!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
  UserUnion: NexusGenRootTypes['FieldError'] | NexusGenRootTypes['SuccessResponse'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  ErrorBody: { // field return type
    field: string; // String!
    message: string; // String!
    status: number; // Int!
  }
  FieldError: { // field return type
    error: NexusGenRootTypes['ErrorBody'] | null; // ErrorBody
    success: boolean; // Boolean!
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['UserUnion']; // UserUnion!
  }
  Query: { // field return type
    users: Array<NexusGenRootTypes['User'] | null>; // [User]!
  }
  SuccessResponse: { // field return type
    success: boolean; // Boolean!
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string; // String!
    id: string; // String!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  ErrorBody: { // field return type name
    field: 'String'
    message: 'String'
    status: 'Int'
  }
  FieldError: { // field return type name
    error: 'ErrorBody'
    success: 'Boolean'
  }
  Mutation: { // field return type name
    createUser: 'UserUnion'
  }
  Query: { // field return type name
    users: 'User'
  }
  SuccessResponse: { // field return type name
    success: 'Boolean'
    user: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      confirmPassword: string; // String!
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  UserUnion: "FieldError" | "SuccessResponse"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "UserUnion";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}