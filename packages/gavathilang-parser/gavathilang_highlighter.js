import {LRLanguage, LanguageSupport} from '@codemirror/language';
import {styleTags, tags as t} from '@lezer/highlight';
import { parser } from './src/parser';
 
export const gavathi = LRLanguage.define({
 parser: parser.configure({
   props: [
     styleTags({
       Keyword :  t.keyword,
       String: t.string,
       Operator: t.operator,
       Number: t.number,
       Comment : t.comment,
       Brackets : t.bracket,
     }),
   ],
 }),
});
 
export const gavathiLang = () => {
 return new LanguageSupport(gavathi);
};