
const styled = () => {
    throw new Error('canot be run in runtime')
    return {}
}
const extract = () => { return '' }
const transform = () => { }



test.skip('包裹primitive element', () => {

    const Button = styled('button', {
        background: 'red',
    });

    const res = transform('<Button>login</Button>')
    const res1 = `<button className="btn-xx">login</button>`
    expect(res).toBe(res1)
})
test.skip('包裹自定义组件', () => {
    //AntdButton是第三方库的Button或者自定义组件（非styled生成的组件)
    //如何知道是styled生成的，还是第三方的组件呢？
    const MyButton = styled(AntdButton, {
        background: 'red',
    });
    const res = transform('<MyButton>login</MyButton>')
    expect(res).toBe(`<AntdButton className="btn-xx">login</AntdButton>`)
})

test.skip('包裹styled定义的组件', () => {
    const Button = styled('button', {
        background: 'red',
    });
    const MyButton = styled(Button, {
        background: 'red',
    });

    //TODO: 维护lookup table（跨模块怎么办？）
    const res = transform('<MyButton>login</MyButton>')
    expect(res).toBe(`<button className="btn-xx">login</button>`)
})