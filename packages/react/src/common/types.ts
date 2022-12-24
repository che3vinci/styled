import * as t from '@babel/types';
import { isStyledCallExpression } from './variableDecl';
export type CSSObject = Record<string, any>; //TODO:具体化

export type Rule = {
  //来自那条css样式。格式固定为'baseStyle'、'variants-x-y'、
  from: 'baseStyle' | 'variants-name-valuexx' | 'css-xxx';
  selector: string;
  declarations: CSSObject;
};

export type Position = { file: string; row: number; col: number };

/**
 * shape:{
 *  round:{bordeRadius:1000},
 *  rect:{bordeRadius:0},
 *  foo(x)=>{bordeRadius:x}
 * }
 * 
 * 其中:VariantName就是shape
 */
export type VariantValueName = string;
export type VariantName = string;
export type VariantValue = Record<VariantValueName, CSSObject> | Function;
export type Variants = Record<VariantName, VariantValue>;

export type HostComponentType = t.Identifier;
export type FCDecl = t.FunctionDeclaration | t.VariableDeclaration;
export type ClassComponentDecl = t.ClassDeclaration;
export type StyledComponentDecl = t.VariableDeclaration;

export type ComponentDecl =
  | ClassComponentDecl
  | FCDecl
  | StyledComponentDecl
  | HostComponentType;
