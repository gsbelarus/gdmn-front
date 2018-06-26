function createCommand(erTranslatorRU: any, parsedTextPhrase: any) {
  if (!erTranslatorRU || !parsedTextPhrase) return;

  // try {
  const command = erTranslatorRU.process(<
    any // FIXME
  >parsedTextPhrase);

  return command;

  // TODO
  // } catch (err) {
  //   if (err instanceof Error) {
  //     dispatch(actions.setError(err.message));
  //   }
  // }
}

export { createCommand };
