import { DepTree } from './tree/index';
import { StyledComponent } from './component/StyledComponent';
import { traverse, parse } from '@babel/core';
import { run } from '@c3/cli';
import path from 'node:path';
import fs from 'node:fs';
import { isStyledComponentDecl } from './common/variableDecl';
import {
  getComponentByName,
  getJSXElementName,
  getStyledNodeByName,
} from './common/reactComponent';
import { StyledElement } from './component/StyledElement';
import { DNode } from './tree/Node';

const styledComponentSet: Set<StyledComponent> = new Set();
/**
 * 将所有的styledComponent构造一棵依赖树
 * @param node
 * @returns
 */

export const trees: DepTree[] = [];
export const makeDepTree = (styledComponents): DepTree[] => {
  return trees;
};

run({
  compile(options) {
    const { file } = options;
    const content = fs.readFileSync(path.resolve(file.path), 'utf-8');

    const ast = parse(content, { plugins: ['jsx'] });

    //构造styledComponents
    traverse(ast, {
      VariableDeclaration(path) {
        if (isStyledComponentDecl(path.node)) {
          const styledComp = new StyledComponent(path.node);
          styledComponentSet.add(styledComp);
        }
      },
    });
    const trees = makeDepTree(styledComponentSet);

    traverse(ast, {
      JSXElement(path) {
        const name = getJSXElementName(path.node);
        const styledNode = getStyledNodeByName(name);
        if (styledComponentSet.has(styledNode.data as StyledComponent)) {
          //添加子节点
          const element = new StyledElement(path.node);
          styledNode.addChild(new DNode(element));
        }
      },
    });
  },
});
