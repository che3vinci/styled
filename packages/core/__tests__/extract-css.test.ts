import { css } from "..";
test('parse plain object correctly ', () => {

  const rule = css({
    background: 'red',
  });


  // expect(rule.className).toBe('xxx-123')
  // expect(rule.cssText).toBe('.xxx-123{background:red;}')
});

test('parse variants css object correctly ', () => {

  const style1 = css({
    background: 'red',
    variants: {
      size: {
        small: { width: 100 },
      }
    }
  });

  // expect(style1.className).toBe('xxx-123')
  // expect(style1.className).toBe('xxx-123')
  // expect(style1.cssText).toBe('.xxx-123{background:red;} .size-small{width:100px;}')
});

it('parse variable-variants  css object correctly ', () => {

  const style1 = css({
    background: 'red',
    variants: {
      size: {
        small: { width: 100 },
        foo(x) { return { width: x } },
      }
    }
  });
  //一定要执行x=>({width:x})，否则无法知道生成的cssText
  // 所以这个cssText的生成要延后，直到找到了对variable-variants的调用


  // expect(style1.className).toBe('xxx-123')
  // expect(style1.cssText).toBe('.xxx-123{background:red;},.size-small{width:100px;},.size-x{width:var(--size-x);}')
});
test('自定义属性', () => {
  const A = css('div', {
    color: 'red',
    __before: {} //before只一个自定义属性。本质是一个函数。值o是传入—__before()函数的参数
  })
})
