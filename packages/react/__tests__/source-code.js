
//=====================================================================================================
// 数据结构（inheritance aritchture ）
// 没有被使用的组件(比如SButton,RedButton)，会被删除，也不会生成样式。
//=====================================================================================================

/**
 *  
 *                    butto.....................n
 *                   /      \
 *DeprecatedButton(x)    StyledButton             \
 *                      /          \
 *              RedBtn        StyledBlueBtn            AntdButton
 *                   /               |                 \
 *            StyledRedBtn   <StyledBlueBtn/>      StyleAntdButton
 */

//=====================================================================================================
// 每个组件生成的样式
//=====================================================================================================

/**
 *  @layer btn{
 * .btn-bstyle-x0{background:black;}
 * .btn-vairants-size-big-x0{width:100px;}
 * }
 * 
 */

const Button = styled('button', {
    background: 'black',
    variants: {
        size: {
            big: {
                width: 100,
            }
        }
    }
});


/**
 * @layer red-btn{
 * .red-btn-bstyle-x1{background:red;}
 * .red-btn-vairants-size-big-x1{width:200px;}
 * }
 */
const RedButton = styled(Button, {
    background: 'red',
    variants: {
        size: {
            big: {
                width: 200,
            },
             (x) => ({ width: x }) //variable-variants //TODO:
         },
     }
 });


/**
 * @layer blue-btn{
 *  .blue-btn-bstyle-x2{background:blue;}
 * }
 */
const BlueBtn = styled(Button, {
    background: 'blue',
}




/**
 * 因为源码中使用该组件，所以不会被写入到css文件中
 * @returns 
 */
const DeprecatedButton = styled(Button, {
    background: 'yellow',
})



//=====================================================================================================
// 使用上述的定义的虚拟组件
// 1. 其中有些不会被使用
//=====================================================================================================
export const App = () => {
    return <div>
        <Button>btn</Button>
        <RedButton>red-btn</RedButton>
        <BlueBtn>blue-btn</BlueBtn>
    </div>
}