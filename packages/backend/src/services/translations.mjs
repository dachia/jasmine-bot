import en from '../i18n/en.mjs';
import * as polyglot from 'node-polyglot';

export class TranslationService {
  constructor() {
    this.en = new polyglot.default({ locale: 'en', phrases: en })
  }
}