/**
 * const Button = styled('button', {})
 * @param component
 * @param styleObj
 * @returns
 */
const cx = obj => {};

export const styled = (component, styleObj) => {
  throw new Error('not in runtime');
};

// /**
//  * 根据styled()在编译时生成Button组件的定义
//  * @param props 更近
//  * @returns 
//  */
// export const Button = (props)=>{
//     //根据obj生成css
//     /**
//      * {
//      *     props:className:'
//      * }
//      */
//     return <button>123</button>
// }