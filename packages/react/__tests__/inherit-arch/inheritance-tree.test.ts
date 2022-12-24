// const { parse } = require('@babel/parser');
import { parse } from '@babel/parser';
import fs from 'node:fs';
import path from 'node:path';

//=====================================================================================================
// 测试用例
//=====================================================================================================
const transform = x => x;

test.skip('build tree', () => {
  const source = fs.readFileSync(path.resolve(__dirname, 'code.js'), 'utf8');
  const ast = parse(source, { plugins: ['jsx'], sourceType: 'module' });
  console.log('code', ast);
  // yue.build(ast);
});

test.skip('base style', () => {
  const btn = transform('<RedBtn>login</RedBtn>');
  expect(btn).toBe(
    `<button className="btn-bstyle-x0 red-btn-bstyle-x1">login</button>`
  );
});
test.skip('variant style', () => {
  const btn = transform('<RedBtn size="big">login</RedBtn>');
  //variants的查找规则:，是从当前组件开始，一直向根节点查找，直到找到为止
  expect(btn).toBe(
    `<button className="btn-bstyle-x0 red-btn-bstyle-x1 red-btn-vairants-size-big-x1">login</button>`
  );
});

test.skip('style ovrride', () => {
  const { lookupTable } = transform('<RedBtn>login</RedBtn>');
  expect(res).toBe(`<button className="btn-xx">login</button>`);
});
