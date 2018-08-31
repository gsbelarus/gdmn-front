import { ICommand } from 'gdmn-nlp-agent';

function createCommand(erTranslatorRU: any, parsedTextPhrase: any): ICommand | undefined | Error {
  if (!erTranslatorRU || !parsedTextPhrase) return;

  try {
    return erTranslatorRU.process(parsedTextPhrase);
  } catch (e) {
    return e;
  }
}

export { createCommand };
