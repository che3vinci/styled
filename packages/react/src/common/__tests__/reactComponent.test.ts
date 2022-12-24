import { getComponentName, isHostElement } from './../reactComponent';
import {
  isClassComponent,
  isFunctionComponent,
  isReactComponent,
} from '../reactComponent';
import { parseCode } from './util';
import tt from '@babel/types';

describe('isClassComponent', () => {
  it('isClassComponent ', () => {
    const c = parseCode(
      'class App extends React.Component {}'
    ) as tt.ClassDeclaration;
    expect(isClassComponent(c)).toBe(true);
  });
  it('isClassComponent ', () => {
    const c = parseCode(
      'class App extends SOMETHING {}'
    ) as tt.ClassDeclaration;
    expect(isClassComponent(c)).not.toBe(true);
  });
});

describe('isFunctionComponent1', () => {
  it('return JSXElement', () => {
    const c = parseCode(
      'function App(){return <div>x</div>}'
    ) as tt.FunctionDeclaration;
    expect(isFunctionComponent(c)).toBe(true);
  });
  it('return JSXFragment', () => {
    const c = parseCode(
      'function App(){return <>foo</>}'
    ) as tt.FunctionDeclaration;
    expect(isFunctionComponent(c)).toBe(true);
  });
  it('return number', () => {
    const c = parseCode('function App(){return 2}') as tt.FunctionDeclaration;
    expect(isFunctionComponent(c)).toBe(false);
  });
  it('variable declaration', () => {
    const c = parseCode('const App= ()=>{return <div>x</div>}') as any;
    expect(isFunctionComponent(c)).toBe(true);
    expect(getComponentName(c)).toBe('App');
  });
  it('variable declaration=>Arrow Function Without body', () => {
    const c = parseCode('const App= ()=> <div>x</div>') as any;
    expect(isFunctionComponent(c)).toBe(true);
    expect(getComponentName(c)).toBe('App');
  });

  it('isHostComponent', () => {
    const c = parseCode('const App= ()=> <div>x</div>') as any;
    expect(getComponentName(c)).toBe('App');
    expect(isHostElement(c)).toBe(false);
  });
  it('isHostComponent', () => {
    const c = parseCode('<fast.ui.div>hello</fast.ui.div>').expression as any;
    c
    expect(getComponentName(c)).toBe('div');
    expect(isHostElement(c)).toBe(true);
  });
});
