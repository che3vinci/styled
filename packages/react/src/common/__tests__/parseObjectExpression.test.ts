import { parseObjectExpression } from './../parseObjectExpression';
import { parse } from '@babel/parser';

describe('test cases', () => {
  it('basic ', () => {
    const expr = `const o = {color:'red'}`;
    const x = parse(expr, { sourceType: 'module' });
    const objexp = x.program.body[0].declarations[0].init;
    const runtime = parseObjectExpression(objexp);
    expect(runtime).toEqual({ color: 'red' });
  });

  /**
   * TODO:
   */
  it('with-memeber-function ', () => {
    const expr = `const o = {
        size:(x)=>({width:x}})
    }`;
  });

  /**
   * TODO:
   * 如果abs不在同一个文件中，那么就会报错，因为abs不在当前作用域中，如何导入？
   */
  it('with-callExpression ', () => {
    const expr = `
    const abs=()=>({position:'absolute'});
    const o = {
        color:'red',
        ...abs()
    }`;
  });
});
