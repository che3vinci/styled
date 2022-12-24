import * as tt from '@babel/types';

export type Fun =
  | tt.FunctionDeclaration
  | tt.FunctionExpression
  | tt.ArrowFunctionExpression;

export const fn = {
  getRetValue(f: Fun) {
    const { body } = f;
    if (tt.isBlockStatement(body)) {
      for (let statement of body.body) {
        if (tt.isReturnStatement(statement)) {
          return (statement as tt.ReturnStatement).argument;
        }
      }
    } else {
      //形如()=>(<div>hello</div>)
      return body;
    }
  },
  getFnName(
    f: tt.FunctionDeclaration | tt.FunctionExpression | tt.VariableDeclaration
  ) {
    if (tt.isVariableDeclaration(f)) {
      const { declarations } = f;
      if (declarations.length > 0) {
        const { id } = declarations[0];
        if (tt.isIdentifier(id)) {
          return id.name;
        }
      }
    } else {
      const { id } = f;
      if (tt.isIdentifier(id)) {
        return id.name;
      }
    }
    throw new Error('没有找到函数名');
  },
};

// /**
//  * 获得一个react组件的返回的JSXElement
//  * @param decl
//  * - VariableDeclaration:
//  * 1. const Foo = ()=>{return <div>hello</div>} //init is arrow function expression
//  * 2. const Foo = function(){return <div>hello</div>} //init is function expression
//  * - ClassDeclaration:
//  * 3. class Foo extends React.Component{render(){return <div>hello</div>}} //class declaration
//  * - FunctionDeclaration:
//  * 4. function Foo(){return <div>hello</div>} //function declaration
//  *
//  * @returns JSXElement
//  * @todo:
//  * 如果是ts的话，可以通过类型推断来判断是否是一个react组件
//  */

// export const getReturnOfComponent = (
//   decl: tt.FunctionDeclaration | tt.ClassDeclaration | tt.VariableDeclaration
// ): tt.JSXElement | undefined => {
//   /**
//    * 1. const Foo = ()=>{}
//    */
//   if (tt.isVariableDeclaration(decl)) {
//     const { declarations } = decl;
//     if (declarations.length > 0) {
//       const { init } = declarations[0]; //TODO:可能是其他的declarations
//       if (tt.isArrowFunctionExpression(init) || tt.isFunctionExpression(init)) {
//         const body = init.body;
//         if (tt.isBlockStatement(body)) {
//           for (let statement of body.body) {
//             if (tt.isReturnStatement(statement)) {
//               const ret = (statement as tt.ReturnStatement).argument;
//               if (tt.isJSXElement(ret)) {
//                 return ret;
//               } else {
//                 throw new Error('返回的不是一个JSXElement');
//               }
//             }
//           }
//         } else {
//           //形如()=>(<div>hello</div>)
//           return body as tt.JSXElement;
//         }
//       }
//     }
//   } else if (tt.isClassDeclaration(decl)) {
//     throw new Error('ClassDeclaration not implement');
//   } else if (tt.isFunctionDeclaration(decl)) {
//     throw new Error('functionDeclaration not implement');
//   } else {
//     throw new Error('传入的不是一个react组件');
//   }
// };

// export const getParent = getReturnOfComponent;
