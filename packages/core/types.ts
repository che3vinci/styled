export type CSSObject = Record<string, any>

export type Rule = {
    //来自那条css样式。格式固定为'baseStyle'、'variants-x-y'、
    from: 'baseStyle' | 'variants-name-valuexx' | 'css-xxx';
    selector: string;
    declarations: CSSObject;
  };
  