import { CSSObject, Rule } from './types';

export const css = (o: CSSObject): Rule => {
    return {
        from: 'baseStyle',
        selector: '',
        declarations: o,
    }
};
