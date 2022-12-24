import { DNode } from '../tree/Node';
import * as t from '@babel/types';
import { type JSXElement } from '@babel/types';
import { CSSObject } from '../common/types';
import { traverse } from '@babel/core';

export class StyledElement {
  cssObj: CSSObject;

  constructor(public ast: t.JSXElement) {}

  /**
   * 写入到css文件中
   */
  write() {}

  /**
   * 对ast进行转换
   */
  transform() {
    traverse(this.ast, {
      JSXElement(path) {
        //1.把css属性提取出来，获得classname
        //2.根据variant生成classname
      },
    });
  }
}
