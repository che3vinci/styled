import { isHostComponent } from '../utils';
import { parseCode } from './util';

describe('test cases', () => {
  it('should work ', () => {
    const node = parseCode('const x=<div><p>hello</p></div>');
    expect(isHostComponent(node)).toBe(true);
  });
});
