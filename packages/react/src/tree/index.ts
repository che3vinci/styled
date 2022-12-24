import { type JSXElement } from '@babel/types';
import { DNode } from './Node';

export class DepTree {
  _root: DNode;
  constructor() {
    console.log('tree');
  }

  /**
   * roots:[YComponent,YComponent,YComponent]
   *
   *
   *                    button                    button                      span
   *                   /      \                       \                           \
   *          Button(x)    VButto......n             AntdButton                   Text
   *                     /      \        \                  \
   *               RedBtn  VBlueBtn   YellowBtn         VAntdButton
   *               /           /          \                   \
   *          VRedBtn      <VBlueBtn/>   <YellowBtn/>     <VAntdButton/>
   *          /      \
   *      <VRedBtn/>  <VRedBtn/>
   */
  /**
   * const App = ()=>{
   *  return <Box>
   *      <Button/>
   *  </Box>
   * }
   * render(<App/>,'#app')
   * @param ast 
   */

  /**
   * treeNodeMap:Record<ASTNode,YComponent>
   * V开头的组件是虚拟节点，会被替换成真实节点
   */

  /**
  const q = [];
  buildPath(jsx){
  const jsxcomponent = getYComponent(jsx)//new YComponent(jsx)或者从treeNodeMap中取
  const parent = getYComponent(jsx.rettype)
  jsxcomponent.parent = parent
  parent.addChildren(jsx)

  for each-child of jsx.children:
     if(each-child 是非host component) { 
      q.push(each-child)
    }
  if(parent ===host component){     
      !roots.includes(parent) && roots.push(parent)
  }else {
      buildPath(jsx.rettype)
  }
}

build(){
  while(q.length>0){
    buildPath(q.pop())
  }
}

 */

  build(ast: JSXElement) {
    // this._root = new Root();
  }
  /**
   * 为整个树的节点组件都添加一个className,目的是为了能传递className到hostComponent
   */
  forwardClassName() {}

  /**
   * path中有virutalNode的path，就是virtualPath
   */
  isVirtualPath() {}
}
