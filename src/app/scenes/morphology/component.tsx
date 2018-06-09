import React, { ChangeEvent, MouseEvent, Component } from 'react';
import { IToken } from 'chevrotain';
import classNames from 'classnames';
import {
  Involvement,
  RusAdjective,
  RusAdjectiveLexeme,
  RusAdjectiveMorphSigns,
  RusAspect,
  RusCase,
  RusConjunction,
  RusGender,
  RusMood,
  RusNoun,
  RusNounLexeme,
  RusNounMorphSigns,
  RusPreposition,
  RusPronoun,
  RusPronounLexeme,
  RusTense,
  RusVerb,
  RusVerbLexeme,
  RusVerbMorphSigns,
  WhiteSpace,
  Word,
  Words
} from 'gdmn-nlp';
import CSSModules from 'react-css-modules';

const styles = require('./styles.css');

interface IMorphBoxProps extends CSSModules.InjectedCSSModuleProps {
  readonly text: string;
  readonly tokens: IToken[];
  readonly selectedToken: number;
  readonly words: Words;
  readonly onSetText: (text: string) => any;
  readonly onClickToken: (key: number) => any;
  readonly onClearText: () => any;
  readonly onSetVerbs: () => any;
  readonly onSetNouns: () => any;
  readonly onSetAdjectives: () => any;
  readonly onSetPrepositions: () => any;
  readonly onSetPronouns: () => any;
  readonly onSetConjunctions: () => any;
}

@CSSModules(styles, { allowMultiple: true })
class MorphBox extends Component<IMorphBoxProps, {}> {
  public render() {
    const {
      text,
      tokens,
      words,
      selectedToken,
      onSetText,
      onClearText,
      onSetVerbs,
      onSetNouns,
      onSetAdjectives,
      onSetPrepositions,
      onSetPronouns,
      onSetConjunctions
    } = this.props;

    return (
      <div styleName={'MorphBox' + (text === tokens.reduce((p, c) => p + c.image, '') ? '' : ' Error')}>
        <div styleName="MorphInput">
          <div styleName="MorphText">
            <textarea
              value={text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onSetText(e.currentTarget.value)}
            />
            <div styleName="MorphTextButtons">
              <button onClick={onClearText}>Clear</button>
              <button onClick={onSetNouns}>Nouns</button>
              <button onClick={onSetVerbs}>Verbs</button>
              <button onClick={onSetAdjectives}>Adjs</button>
              <button onClick={onSetPrepositions}>Preps</button>
              <button onClick={onSetPronouns}>Pron</button>
              <button onClick={onSetConjunctions}>Conj</button>
            </div>
          </div>
          <div styleName="TokenList">
            {tokens.map((t, idx) => (
              <span
                className={classNames('Token', 'tkn-' + t.tokenType!.tokenName, { selected: idx === selectedToken })}
                key={idx}
                onClick={(e: MouseEvent<HTMLSpanElement>) => this.props.onClickToken(idx)}
              >
                {t.tokenType === WhiteSpace ? t.image.replace(' ', String.fromCharCode(9251)) : t.image}
              </span>
            ))}
          </div>
        </div>
        <div styleName="MorphOutput">
          {words.map((w, idx) => (
            <span key={idx}>
              <div>
                <div>{w.getDisplayText()}</div>
                <div>{w.getSignature()}</div>
              </div>
              {this.formatWordForms(w, onSetText)}
            </span>
          ))}
        </div>
      </div>
    );
  }

  private formatWordForms(w: Word, onSetText: Function): JSX.Element {
    if (w instanceof RusPronoun) {
      const l = w.lexeme as RusPronounLexeme;
      const f = (c: RusCase) => (
        <div onClick={(e: MouseEvent<HTMLDivElement>) => onSetText(e.currentTarget.innerText)}>
          {l.getWordForm(c).word}
        </div>
      );

      return (
        <div styleName="MorphOutputFlex">
          <span>
            {f(RusCase.Nomn)}
            {f(RusCase.Gent)}
            {f(RusCase.Datv)}
            {f(RusCase.Accs)}
            {f(RusCase.Ablt)}
            {f(RusCase.Loct)}
          </span>
        </div>
      );
    }
    if (w instanceof RusConjunction) return <div />;

    if (w instanceof RusPreposition) return <div />;

    if (w instanceof RusAdjective) {
      const l = (w as RusAdjective).lexeme as RusAdjectiveLexeme;
      const f = (morphSigns: RusAdjectiveMorphSigns) => (
        <div onClick={(e: MouseEvent<HTMLElement>) => onSetText(e.currentTarget.innerText)}>
          {l.getWordForm(morphSigns).word}
        </div>
      );
      const getShortForm = () => {
        if (!l.hasShortForm()) return null;

        return (
          <tr>
            <th colSpan={2}>Кратк. форма</th>
            <td>{f({ singular: true, gender: RusGender.Masc, short: true })}</td>
            <td>{f({ singular: true, gender: RusGender.Neut, short: true })}</td>
            <td>{f({ singular: true, gender: RusGender.Femn, short: true })}</td>
            <td>{f({ singular: false, short: true })}</td>
          </tr>
        );
      };

      return (
        <div styleName="MorphOutputFlex">
          <table>
            <thead>
              <tr>
                <th rowSpan={2} colSpan={2}>
                  падеж
                </th>
                <th colSpan={3}>ед. ч.</th>
                <th rowSpan={2}>мн. ч.</th>
              </tr>
              <tr>
                <th>муж.р.</th>
                <th>ср.р.</th>
                <th>жен.р.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={2}>Им.</th>
                <td>{f({ c: RusCase.Nomn, singular: true, gender: RusGender.Masc })}</td>
                <td>{f({ c: RusCase.Nomn, singular: true, gender: RusGender.Neut })}</td>
                <td>{f({ c: RusCase.Nomn, singular: true, gender: RusGender.Femn })}</td>
                <td>{f({ c: RusCase.Nomn, singular: false })}</td>
              </tr>
              <tr>
                <th colSpan={2}>Рд.</th>
                <td>{f({ c: RusCase.Gent, singular: true, gender: RusGender.Masc })}</td>
                <td>{f({ c: RusCase.Gent, singular: true, gender: RusGender.Neut })}</td>
                <td>{f({ c: RusCase.Gent, singular: true, gender: RusGender.Femn })}</td>
                <td>{f({ c: RusCase.Gent, singular: false })}</td>
              </tr>
              <tr>
                <th colSpan={2}>Дт.</th>
                <td>{f({ c: RusCase.Datv, singular: true, gender: RusGender.Masc })}</td>
                <td>{f({ c: RusCase.Datv, singular: true, gender: RusGender.Neut })}</td>
                <td>{f({ c: RusCase.Datv, singular: true, gender: RusGender.Femn })}</td>
                <td>{f({ c: RusCase.Datv, singular: false })}</td>
              </tr>
              <tr>
                <th rowSpan={2}>Вн.</th>
                <th>одуш.</th>
                <td>{f({ c: RusCase.Accs, singular: true, gender: RusGender.Masc, animate: true })}</td>
                <td rowSpan={2}>{f({ c: RusCase.Accs, singular: true, gender: RusGender.Neut })}</td>
                <td rowSpan={2}>{f({ c: RusCase.Accs, singular: true, gender: RusGender.Femn })}</td>
                <td>{f({ c: RusCase.Accs, singular: false, animate: true })}</td>
              </tr>
              <tr>
                <th>неодуш.</th>
                <td>{f({ c: RusCase.Accs, singular: true, gender: RusGender.Masc, animate: false })}</td>
                <td>{f({ c: RusCase.Accs, singular: false, animate: false })}</td>
              </tr>
              <tr>
                <th colSpan={2}>Тв.</th>
                <td>{f({ c: RusCase.Ablt, singular: true, gender: RusGender.Masc })}</td>
                <td>{f({ c: RusCase.Ablt, singular: true, gender: RusGender.Neut })}</td>
                <td>{f({ c: RusCase.Ablt, singular: true, gender: RusGender.Femn })}</td>
                <td>{f({ c: RusCase.Ablt, singular: false })}</td>
              </tr>
              <tr>
                <th colSpan={2}>Пр.</th>
                <td>{f({ c: RusCase.Loct, singular: true, gender: RusGender.Masc })}</td>
                <td>{f({ c: RusCase.Loct, singular: true, gender: RusGender.Neut })}</td>
                <td>{f({ c: RusCase.Loct, singular: true, gender: RusGender.Femn })}</td>
                <td>{f({ c: RusCase.Loct, singular: false })}</td>
              </tr>
              {getShortForm()}
            </tbody>
          </table>
        </div>
      );
    }

    if (w instanceof RusVerb) {
      const l = (w as RusVerb).lexeme as RusVerbLexeme;
      const f = (morphSigns: RusVerbMorphSigns) => (
        <div onClick={(e: MouseEvent<HTMLElement>) => onSetText(e.currentTarget.innerText)}>
          {l.getWordForm(morphSigns).word}
        </div>
      );

      if (l.aspect === RusAspect.Perf) {
        return (
          <div styleName="MorphOutputFlex">
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>будущее</th>
                  <th>прош.</th>
                  <th>повелит.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Я</th>
                  <td>{f({ tense: RusTense.Futr, singular: true, person: 1, mood: RusMood.Indc })}</td>
                  <td>
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Masc, mood: RusMood.Indc })}
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Femn, mood: RusMood.Indc })}
                  </td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <th>Ты</th>
                  <td>{f({ tense: RusTense.Futr, singular: true, person: 2, mood: RusMood.Indc })}</td>
                  <td>
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Masc, mood: RusMood.Indc })}
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Femn, mood: RusMood.Indc })}
                  </td>
                  <td>
                    {l.hasImprMood() ? f({ singular: true, mood: RusMood.Impr, involvement: Involvement.Excl }) : '-'}
                  </td>
                </tr>
                <tr>
                  <th>
                    Он<br />Она<br />Оно
                  </th>
                  <td>{f({ tense: RusTense.Futr, singular: true, person: 3, mood: RusMood.Indc })}</td>
                  <td>
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Masc, mood: RusMood.Indc })}
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Femn, mood: RusMood.Indc })}
                    {f({ tense: RusTense.Past, singular: true, gender: RusGender.Neut, mood: RusMood.Indc })}
                  </td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <th>Мы</th>
                  <td>{f({ tense: RusTense.Futr, singular: false, person: 1, mood: RusMood.Indc })}</td>
                  <td>{f({ tense: RusTense.Past, singular: false, mood: RusMood.Indc })}</td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <th>Вы</th>
                  <td>{f({ tense: RusTense.Futr, singular: false, person: 2, mood: RusMood.Indc })}</td>
                  <td>{f({ tense: RusTense.Past, singular: false, mood: RusMood.Indc })}</td>
                  <td>
                    {l.hasImprMood() ? f({ singular: false, mood: RusMood.Impr, involvement: Involvement.Excl }) : '-'}
                  </td>
                </tr>
                <tr>
                  <th>Они</th>
                  <td>{f({ tense: RusTense.Futr, singular: false, person: 3, mood: RusMood.Indc })}</td>
                  <td>{f({ tense: RusTense.Past, singular: false, mood: RusMood.Indc })}</td>
                  <td>&mdash;</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <div styleName="MorphOutputFlex">
          <table>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>наст.</th>
                <th>прош.</th>
                <th>повелит.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Я</th>
                <td>{f({ tense: RusTense.Pres, singular: true, person: 1, mood: RusMood.Indc })}</td>
                <td>
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Masc, mood: RusMood.Indc })}
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Femn, mood: RusMood.Indc })}
                </td>
                <td>&mdash;</td>
              </tr>
              <tr>
                <th>Ты</th>
                <td>{f({ tense: RusTense.Pres, singular: true, person: 2, mood: RusMood.Indc })}</td>
                <td>
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Masc, mood: RusMood.Indc })}
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Femn, mood: RusMood.Indc })}
                </td>
                <td>
                  {l.hasImprMood() ? f({ singular: true, mood: RusMood.Impr, involvement: Involvement.Excl }) : '-'}
                </td>
              </tr>
              <tr>
                <th>
                  Он<br />Она<br />Оно
                </th>
                <td>{f({ tense: RusTense.Pres, singular: true, person: 3, mood: RusMood.Indc })}</td>
                <td>
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Masc, mood: RusMood.Indc })}
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Femn, mood: RusMood.Indc })}
                  {f({ tense: RusTense.Past, singular: true, gender: RusGender.Neut, mood: RusMood.Indc })}
                </td>
                <td>&mdash;</td>
              </tr>
              <tr>
                <th>Мы</th>
                <td>{f({ tense: RusTense.Pres, singular: false, person: 1, mood: RusMood.Indc })}</td>
                <td>{f({ tense: RusTense.Past, singular: false, mood: RusMood.Indc })}</td>
                <td>&mdash;</td>
              </tr>
              <tr>
                <th>Вы</th>
                <td>{f({ tense: RusTense.Pres, singular: false, person: 2, mood: RusMood.Indc })}</td>
                <td>{f({ tense: RusTense.Past, singular: false, mood: RusMood.Indc })}</td>
                <td>
                  {l.hasImprMood() ? f({ singular: false, mood: RusMood.Impr, involvement: Involvement.Excl }) : '-'}
                </td>
              </tr>
              <tr>
                <th>Они</th>
                <td>{f({ tense: RusTense.Pres, singular: false, person: 3, mood: RusMood.Indc })}</td>
                <td>{f({ tense: RusTense.Past, singular: false, mood: RusMood.Indc })}</td>
                <td>&mdash;</td>
              </tr>
              <tr>
                <th>Будущее</th>
                <td colSpan={3}>буду/будешь {f({ infn: true })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      const l = (w as RusNoun).lexeme as RusNounLexeme;

      const f = (morphSigns: RusNounMorphSigns) => (
        <div onClick={(e: MouseEvent<HTMLDivElement>) => onSetText(e.currentTarget.innerText)}>
          {l.getWordForm(morphSigns).word}
        </div>
      );

      if (l.hasPlural()) {
        return (
          <div styleName="MorphOutputFlex">
            <span>
              {f({ c: RusCase.Nomn, singular: true })}
              {f({ c: RusCase.Gent, singular: true })}
              {f({ c: RusCase.Datv, singular: true })}
              {f({ c: RusCase.Accs, singular: true })}
              {f({ c: RusCase.Ablt, singular: true })}
              {f({ c: RusCase.Loct, singular: true })}
            </span>
            <span>
              {f({ c: RusCase.Nomn, singular: false })}
              {f({ c: RusCase.Gent, singular: false })}
              {f({ c: RusCase.Datv, singular: false })}
              {f({ c: RusCase.Accs, singular: false })}
              {f({ c: RusCase.Ablt, singular: false })}
              {f({ c: RusCase.Loct, singular: false })}
            </span>
          </div>
        );
      } else {
        return (
          <div styleName="MorphOutputFlex">
            <span>
              {f({ c: RusCase.Nomn, singular: true })}
              {f({ c: RusCase.Gent, singular: true })}
              {f({ c: RusCase.Datv, singular: true })}
              {f({ c: RusCase.Accs, singular: true })}
              {f({ c: RusCase.Ablt, singular: true })}
              {f({ c: RusCase.Loct, singular: true })}
            </span>
          </div>
        );
      }
    }
  }
}

export { MorphBox, IMorphBoxProps };

/*

              <tr>
                <th>Пр. действ. наст.</th>
                <td colSpan={3}>делающий</td>
              </tr>
              <tr>
                <th>Пр. действ. прош.</th>
                <td colSpan={3}>делавший</td>
              </tr>
              <tr>
                <th>Деепр. наст.</th>
                <td colSpan={3}>делая</td>
              </tr>
              <tr>
                <th>Деепр. прош.</th>
                <td colSpan={3}>делав, делавши</td>
              </tr>
              <tr>
                <th>Пр. страд. наст.</th>
                <td colSpan={3}>делаемый</td>
              </tr>
              <tr>
                <th>Пр. страд. прош.</th>
                <td colSpan={3}>деланный</td>
              </tr>

*/
