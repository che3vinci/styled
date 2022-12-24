import * as t from '@babel/types';
import {
  getComponentName,
  isClassComponent,
  isFunctionComponent,
  isReactComponent,
} from '../common/reactComponent';
import { getInitOfDecl, isFcDecl } from '../common/variableDecl';
import { ComponentDecl } from '../common/types';

export class Component {
  constructor(public ast: ComponentDecl) {
    if (!isReactComponent(ast)) {
      throw new Error('不是组件');
    }
  }
  get name() {
    return getComponentName(this.ast);
  }
  get isHostComponent() {
    return /^[a-z]/.test(this.name);
  }
  get isFunctionComponent() {
    return isFcDecl(this.ast) && isFunctionComponent(this.ast);
  }
  get isClassComponent() {
    return t.isClassDeclaration(this.ast) && isClassComponent(this.ast);
  }
  get isStyledComponent() {
    return true;
  }
  get id() {
    //TODO:添加文件信息
    return `${this.ast.loc?.start}-${this.ast.end}-${this.name}`;
  }
}
