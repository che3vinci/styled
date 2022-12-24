import * as t from '@babel/types';
import { FCDecl, StyledComponentDecl } from './types';
export const getInitOfDecl = (
  decl: t.VariableDeclaration
): t.Expression | undefined | null => {
  const { declarations } = decl;
  if (declarations.length > 0) {
    const { init } = declarations[0];
    return init;
  }
};

export const isStyledCallExpression = (
  exp: t.Expression
): exp is t.CallExpression => {
  return (
    t.isCallExpression(exp) &&
    exp.callee.type === 'Identifier' &&
    exp.callee.name === 'styled'
  );
};

export const isStyledComponentDecl = (
  node: t.Node
): node is StyledComponentDecl => {
  if (t.isVariableDeclaration(node)) {
    const { declarations } = node;
    if (declarations.length === 1) {
      return (
        !!declarations[0].init && isStyledCallExpression(declarations[0].init)
      );
    }
  }
  return false;
};

export const isFcDecl = (node: t.Node): node is FCDecl =>
  t.isFunctionDeclaration(node) || t.isVariableDeclaration(node);
