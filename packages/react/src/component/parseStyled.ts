import {
  type JSXElement,
  type VariableDeclarator,
  type Expression,
  type ObjectExpression,
  isCallExpression,
  isObjectExpression,
  isIdentifier,
} from '@babel/types';
import { parseObjectExpression } from '../common/parseObjectExpression';
import { isStyledCallExpression } from '../common/variableDecl';

export type StyledData = {
  styledComponent: string; //?
  originalComponent: string;
  styledObject: Record<string, any>;
};

//TODO:好像有问题，应该判断t.isAssignmentExpression(node, opts)
export const parseStyled = (declarator: VariableDeclarator): StyledData => {
  const result = {} as StyledData;
  const { init, id } = declarator;
  if (init && isStyledCallExpression(init)) {
    const { arguments: args } = init;
    result.styledComponent = id.name;

    //TODO:判断arguments，获取originalComponent和styledObject

    const type = args[0].type;
    switch (type) {
      case 'StringLiteral':
        result.originalComponent = args[0].value;
        break;
      case 'Identifier':
        result.originalComponent = args[0].name;
        break;
      default:
        console.error('type', type);
        throw new Error('Unknown element type');
    }

    if (isObjectExpression(args[1])) {
      result.styledObject = parseObjectExpression(args[1]);
    }
  }
  return result;
};
