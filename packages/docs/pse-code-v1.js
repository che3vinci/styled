//=====================================================================================================
// 数据结构（inheritance aritchture ）
// 没有被使用的组件(比如SButton,RedButton)，会被删除，也不会生成样式。
//=====================================================================================================

/**
 * roots:[CNode,CNode,CNode] 
 * 
 * 
 *                    button                    button                      span
 *                   /      \                       \                           \
 *          Button(x)    VButto......n             AntdButton                   Text
 *                     /      \        \                  \
 *               RedBtn  VBlueBtn   YellowBtn         VAntdButton
 *               /           /          \                   \
 *          VRedBtn      <VBlueBtn/>   <YellowBtn/>     <VAntdButton/>
 *          /
 *      <VRedBtn/>
 */
//arithcture
/**
 * 1. 对叶子节点：
 *  -1. 如果是虚拟节点A，则向上找到第一个非虚拟节点P，则
 *      -- 1.1把P用来替换A,（这里有2种方案，如果A是有runtime的组件，则可以不用替换P，这样更简单，但是有运行时开销）
 *      -- 1.2. 把path上的所有使用到class应用到根节点上.(不能应用到P上，是因为P可能没有className属性. 在不考虑没有className的情况下，可以直接应用P上)
 *  -2. 如果是真实节点，则不做任何处理
 * 
 * 1.对所有虚拟节点的子节点:
 * - 如果子节点是虚拟节点：
 * - 如果子节点是真实节点：
 */
const RedBtn = () => {
    return <div>
        <Text>text</Text>
        <VButton>btn</VButton>
    </div>
}
const App = () => {
    return <div>
        <VRedBtn>login</VRedBtn>
        <VBlueBtn>login</VBlueBtn>
        <YellowBtn>yellow</YellowBtn>
        <VAntdButton />
        <div>不需要处理的host type</div>
    </div>
}


type CSSProperty = string | number;
type CSSValue 
  type CSSObject = Record < CSSProperty, string | number >;

type Rule = {
    //来自那条css样式。格式固定为'baseStyle'、'variants-x-y'、
    from: 'baseStyle' | 'variants-name-valuexx' | 'css-xxx';
    selector: string;
    declarations: CSSObject;
}

type VariantValueName = string;
type VariantName = string;
type VariantValue = Record<VariantValueName, Function | CSSObject>
type Variants = Record<VariantName, VariantValue>


const findBaseComponent = (origin: ASTNode) => {

}
const findParentComponent = (origin:ASTNode)=>{
    if(origin 是styldComponent){
        return findBaseComponent(origin)
    }else{
        //返回origin的实例化的最外层元素。比如Foo的parent是div#a
        // const Foo = ()=>{<div id="a">xxx</div>}
        return origin().jsxelements[0]
    }
}

class X {
    roots: CNode[]
    build(ast: ASTNode) {
        //遍历ast的所有节点，生成CNode树
        //jsx element的type是host component，name就忽略（不会是层级树的叶子节点）
        //jsx element的type是component，就需要查找到该组件的来源(1.可能是通过styled定义的，2.可能是一个普通的react 组件)

        //1.处理body元素
        if (ast.node.isHostComponent) {
            return;
        }
        if (!ast.node.isStyledNode) { //TODO:这里需要考虑是否是styled定义的组件
            return;
        }
        const ele = new CElement(ast.node);
        // const ast.node = styled(A,{}). 查找A节点
        for (base = findBaseComponent(ast.node); !!base; base = findBaseComponent(base)) {
            ele.parent = base;
            ele = base;
        }
        //此时的ele是根节点
        this.roots.push(ele);

        //2.处理所有children
        for (const c of body.children) {
            this.build(c);
        }
        return ele;
    }
    _optimize() {
        //TODO:删除不用的节点
    }
    writeLayers() {
        //1.遍历root，生成css （处理@layer的优先级。就是path的name)

    }
}


class CNode {
    parent: CNode;
    children: CNode[];
    id: string;//name-file-row-col

    //保存的输出结果
    rules: Rule[];

    //是否是虚拟节点(styled的节点都是虚拟节点)
    isVirtualNode: boolean;


    basestyle: CSSObject;
    variants: Variants;
    references: Number;//被使用的次数。（所有为element的叶子节点的数量）

    /**
     * 
     * @param {*} vcname :虚拟组件的名字，Bi如Button,RedButton,BlueButton
     * @param {*} css 
     */

    constructor(public vcname: name, css: CSSObject) {
        //get basestyle from css
        //get variants from css
    }
    get layername() {
        return this.vcname
    }
    write() {
        return `@layer ${this.layername} {
             .xxxx {}
         }`
    }

    generateRuleset() {
        //1.为base-style生成rule
        const rule = cx(this.basestyle)
        this.rules.push(rule);

        //2.为variant生成rule
        //如果是函数形式，获得传入的参数，并计算出结果
        if (typeof varaint === 'function') {
            //不处理，因为不属于当前组件的范畴，应该是element中处理。rule属于element
        } else {
            const rule = cx(varaint);
            this.rules.push(rule);
        }
    }

    get isLeaf() { return this.children.length === 0 }

}

class Variants {
    constructor(public variants) {

    }
    generate() {
        for (const variantName of Object.keys(this.variants)) {
            const varaintValue = this.variants[variantName];
            if (typeof varaintValue === 'function') {
                continue;
            } else { //普通的cssObject
                const rule = cx(variant);
                this.rules.push(rule);
            }
        }
        return this.rules;
    }
}
//Element是实例化的组件，一定在继承树的根节点上
class CElement extends Node {


    appliedRules: Rule[];
    constructor(component: Component, public applyVariants: Record<VariantName, VariantValueName>, public cx) {
    }
    get variantsValueNames() {
        return _.flatten(Object.values(this.variants).map(e => Object.keys(e)))
    }
    generate() {
        //只收集有用到的selector
        if (this.applyVariants) {
            for (const applyVariantName of Object.keys(this.applyVariants)) {
                const VariantValueName = this.applyVariants[applyVariantName];
                if (!this.variantsValueNames.includes(VariantValueName)) {//不是关键词值，则认为其中就应用到函数中
                    const cssobj = this.variants[VariantValueName][funcname](VariantValueName)
                    const rule = this.cx(cssobj)
                    appliedRules.push(rule);
                }
            }
        }
        if (this.cx) {
            const rule = css(cx)
            appliedRules.push(rule)

        }
    }
    /**
     * 写入到css文件中
     */
    write() {

    }

    get classNames() {
        return appliedRules.map(e => e.selector).join(' ')
    }
}

//=====================================================================================================
// 增加styled函数，为了不在编译时进行type替换。实现更简单
// 但是会增加runtime的开销。但是问题不大
//=====================================================================================================

const styled = (component, cssObj) => {
    throw new Error('run time error')
    // const X = (props) => {
    //     const { className, ...rest } = props;
    //     const cls = 'cls-xxx cls-yyy';//编译时计算出cls=cx(cssObj)
    //     return React.createElement(component, { className: `${cls} ${className}`, ...rest })
    // }
    // return X;
}


//=====================================================================================================
// 在编译时会变为
// const Btn = (props)=>{
//     const {className,...rest} = props;
//     const cls = 'cls-xxx cls-yyy';//编译时计算出cls=cx(baseStyle)
//     return React.createElement('button',{className:`${cls} ${className}`,...rest})
//}
//=====================================================================================================
const Btn = styled('button', {
    background: 'black'
})

const App = () => {
    return <div>
        <Btn css={{ background: 'red' }}>hello</Btn>
        <Btn size="big">hello</Btn>
        <Btn size="100" >hello</Btn>
    </div>
}


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
    vairants: {
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
    vairants: {
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
 
 
 
 
test('base style', () => {
    const btn = transform('<RedBtn>login</RedBtn>');
    expect(btn).toBe(`<button className="btn-bstyle-x0 red-btn-bstyle-x1">login</button>`)
})
test('variant style', () => {
    const btn = transform('<RedBtn size="big">login</RedBtn>');
    //variants的查找规则:，是从当前组件开始，一直向根节点查找，直到找到为止
    expect(btn).toBe(`<button className="btn-bstyle-x0 red-btn-bstyle-x1 red-btn-vairants-size-big-x1">login</button>`)
})

test('style ovrride', () => {
    const { lookupTable } = transform('<RedBtn>login</RedBtn>');
    expect(res).toBe(`<button className="btn-xx">login</button>`)
})
