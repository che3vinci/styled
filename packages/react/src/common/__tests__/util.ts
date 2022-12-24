import { parse } from '@babel/parser';

export function parseCode(x: string) {
  return parse(x, {
    allowReturnOutsideFunction: true,
    plugins: ['jsx', 'typescript'],
  }).program.body[0];
}
