import { CSSObject, Position, Variants, Rule } from '../common/types';
import * as t from '@babel/types';
import { getComponentName } from '../common/reactComponent';
import { Component } from '../component/Component';
import { StyledElement } from '../component/StyledElement';
type AST = any;

export class DNode {
  parent: DNode;
  children: DNode[];

  constructor(public data: Component | StyledElement) {}

  get isLeaf() {
    return this.children.length === 0;
  }
  setParent(p: DNode) {
    this.parent = p;
  }
  addChild(child: DNode) {
    this.children.push(child);
  }

  /**
   * 生成css
   */
  genCss() {
    if (this.data instanceof StyledElement) {
      //需要读取parent的信息
      this.data.write();
    }
  }
}
