import { transformFromAstSync, traverse } from '@babel/core';
import { parse } from '@babel/parser';
import * as tt from '@babel/types';
import { getParent, getReturnOfComponent } from '../getReturn';
import { parseCode } from './util';
describe('test cases', () => {
  it('block ', () => {
    const exprs = [
      `
        const App = () => {return <Button><p>hello</p></Button>}
        render(<App/>,'#app')
    `,
      `
        const App = () =>  <Button><p>hello</p></Button>;
        render(<App/>,'#app')
        `,
    ];
    for (const expr of exprs) {
      const app = parseCode(expr);
      const parent = getReturnOfComponent(app);
      expect(tt.isJSXElement(parent)).toBe(true);
      expect(parent?.openingElement.name.name).toBe('Button');
    }
  });
});
