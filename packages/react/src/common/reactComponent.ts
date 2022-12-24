// import { VariableDeclarator } from '@babel/types';
import * as tt from '@babel/types';
import { DNode } from '../tree/Node';
import {
  type JSXElement,
  type VariableDeclarator,
  type Expression,
  type ObjectExpression,
  type CallExpression,
  isCallExpression,
} from '@babel/types';
import { identity } from 'lodash';
import { fn } from './fn';
import { ComponentDecl, FCDecl } from './types';
import { Component } from '../component/Component';
import { StyledComponent } from '../component/StyledComponent';

export const isClassComponent = (delc: tt.ClassDeclaration) => {
  if (!delc.superClass) {
    return false;
  }
  return tt.react.isReactComponent(delc.superClass);
};

export const isFunctionComponent = (delc: FCDecl) => {
  if (!tt.isFunctionDeclaration(delc) && !tt.isVariableDeclaration(delc)) {
    return false;
  }

  let xdecl;
  if (tt.isVariableDeclaration(delc)) {
    const init = delc.declarations[0].init;
    if (tt.isFunctionExpression(init) || tt.isArrowFunctionExpression(init)) {
      xdecl = init;
    } else {
      xdecl = delc;
    }
  }
  const ret = fn.getRetValue(xdecl);
  return tt.isJSXElement(ret) || tt.isJSXFragment(ret);
};

/**
 * 获得一个react组件的返回的JSXElement
 * @param decl
 * - VariableDeclaration:
 * 1. const Foo = ()=>{return <div>hello</div>} //init is arrow function expression
 * 2. const Foo = function(){return <div>hello</div>} //init is function expression
 * - ClassDeclaration:
 * 3. class Foo extends React.Component{render(){return <div>hello</div>}} //class declaration
 * - FunctionDeclaration:
 * 4. function Foo(){return <div>hello</div>} //function declaration
 *
 * @returns JSXElement
 * @todo:
 * 如果是ts的话，可以通过类型推断来判断是否是一个react组件
 */

export const isReactComponent = (expr: ComponentDecl) => {
  if (tt.isClassDeclaration(expr)) {
    return isClassComponent(expr);
  } else if (tt.isVariableDeclaration(expr) || tt.isFunctionDeclaration(expr)) {
    return isFunctionComponent(expr);
  }
  throw new Error('不支持的类型222');
};

/**
 * 获得组件
 * @param declarator
 * @returns
 */
export const parseComponent = (
  declarator: tt.VariableDeclarator
): DNode | undefined => {
  const result = new DNode();
  const { init, id } = declarator;
  const type = init?.type;
  switch (type) {
    case 'ArrowFunctionExpression':
      if (tt.isJSXElement(fn.getRetValue(init))) {
        return result;
      }
      break;
    case 'FunctionExpression':
    case 'ClassExpression':
      //暂时不处理类组件
      throw new Error('not support now');
    default:
      throw new Error('not support now');
  }

  return result;
};

export const getJSXElementName = (element: JSXElement) => {
  const openingElementName = element.openingElement.name;
  switch (openingElementName.type) {
    case 'JSXIdentifier':
      return openingElementName.name;
    case 'JSXMemberExpression':
      return openingElementName.property.name;
    case 'JSXNamespacedName':
      throw new Error('not support now');
    default:
      throw new Error('Unknown element type');
  }
};

export const getStyledNodeByName = (name:string):DNode =>{
  return new DNode();
}


export const getComponentName = (
  element:
    | tt.VariableDeclaration
    | tt.ClassDeclaration
    | tt.FunctionDeclaration
    | tt.Identifier
) => {
  if (tt.isVariableDeclaration(element)) {
    const { declarations } = element;
    if (declarations.length > 0) {
      const { id } = declarations[0]; //TODO:支持多个连续的声明
      if (tt.isIdentifier(id)) {
        return id.name;
      }
    }
  } else if (
    tt.isClassDeclaration(element) ||
    tt.isFunctionDeclaration(element)
  ) {
    const { id } = element;
    if (tt.isIdentifier(id)) {
      return id.name;
    }
  } else if (tt.isIdentifier(identity)) {
    return element.name;
  }
  console.error(element);
  throw new Error('not support now');
};

export const isStyledComponent = (element: JSXElement) => {
  const name = getComponentName(element);
};
