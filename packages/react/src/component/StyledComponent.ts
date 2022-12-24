import { parseStyled, StyledData } from './parseStyled';
import { ComponentDecl, CSSObject, StyledComponentDecl } from '../common/types';
import * as t from '@babel/types';
import { isStyledCallExpression } from '../common/variableDecl';
import { parseObjectExpression } from '../common/parseObjectExpression';
import { Component } from './Component';

export class StyledComponent extends Component {
  originalComponent: Component;
  //   styledObject: Record<string, any>;
  //保存的输出结果
  rules: Rule[];
  cssObj: CSSObject;
  _name:string;

  //   basestyle: CSSObject;
  //   variants: Variants;

  constructor(public ast: StyledComponentDecl) {
    super(ast);
    const parts = parseStyled(ast);
    this.originalComponent = parts.originalComponent;
    this.cssObj = parts.styledObject;
    this._name = parts.styledComponent;
  }

  write() {
    return `@layer ${this._name} {
           .xxxx {}
       }`;
  }

  _generateRules() {
    cx(this.cssObj);
    //1.为base-style生成rule
    const rule = cx(this.basestyle);
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
//   /**
//    * 生成一个reactComponent
//    */
//   transform() {
//     const map:Record<VariantValueName,ClassName> ={}
//     const code = `const ${this._name} = (props)=>{
//         const {className,...restProps} = props;
//         const map = JSON.parse(${JSON.stringify(map)});
//         const classname = 
//         return <${this.originalComponent}} className={className}/>
//     }`
    
//   }
}
