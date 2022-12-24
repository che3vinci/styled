import { parseStyled } from './../parseStyled';
import { parse } from '@babel/parser';
describe('test cases', () => {
  it('style host component ', () => {
    const expr = `const Button = styled('button',{color:'red'})`;
    const x = parse(expr, { sourceType: 'module' });
    const variableDeclarator = x.program.body[0].declarations[0];
    const result = parseStyled(variableDeclarator);
    expect(result.originalComponent).toBe('button');
    expect(result.styledComponent).toBe('Button');
    expect(result.styledObject).toEqual({ color: 'red' });
  });
  
  it('style custom component ', () => {
    const expr = `const RedButton = styled(Button,{color:'red'})`;
    const x = parse(expr, { sourceType: 'module' });
    const variableDeclarator = x.program.body[0].declarations[0];
    const result = parseStyled(variableDeclarator);
    expect(result.originalComponent).toBe('Button');
    expect(result.styledComponent).toBe('RedButton');
    expect(result.styledObject).toEqual({ color: 'red' });
  });
});
