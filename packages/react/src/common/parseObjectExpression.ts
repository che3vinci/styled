import { type ObjectExpression } from '@babel/types';
import generate from '@babel/generator';

export const parseObjectExpression = (
  exp: ObjectExpression
): Record<string, any> => {
  const objText = generate(exp).code;
  const code = `const x1 = ${objText};x1`;
  return eval(code);
};
