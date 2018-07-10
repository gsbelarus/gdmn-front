import { NLPDialog } from 'gdmn-nlp-agent';
import { TNLPDialogActions, actions } from '@src/app/scenes/app/actions';
import { getType } from 'typesafe-actions';

interface INLPDialogState {
  nlpDialog: NLPDialog;
}

const initialState = (): INLPDialogState => {
  const nlpDialog = new NLPDialog();

  nlpDialog.add(
    'me',
    `Мой родны кут, як ты мне мілы!..
  Забыць цябе не маю сілы!
  Не раз, утомлены дарогай,
  Жыццём вясны мае убогай,
  К табе я ў думках залятаю
  І там душою спачываю.`
  );

  nlpDialog.add(
    'me',
    `О, як бы я хацеў спачатку
  Дарогу жыцця па парадку
  Прайсці яшчэ раз, азірнуцца,
  Сабраць з дарог каменні тыя,
  Што губяць сілы маладыя, –
  К вясне б маёй хацеў вярнуцца. `
  );

  nlpDialog.add(
    'me',
    `Вясна, вясна! Не для мяне ты!
  Не я, табою абагрэты,
  Прыход твой радасны спаткаю, –
  Цябе навек, вясна, хаваю.
  Назад не прыйдзе хваля тая,
  Што з быстрай рэчкай уплывае.
  Не раз яна, зрабіўшысь парам,
  На крыллях сонца дойдзе к хмарам `
  );

  /*
  nlpDialog.add('me', `Ды йзноў дажджом на рэчку сыдзе –
  Ніхто з граніц сваіх не выйдзе,
  З законаў, жыццем напісаных,
  Або на дол спадзе ў туманах.
  Але хто нам яе пакажа?
  На дол вадой ці снегам ляжа?
  Не вернешся, як хваля тая,
  Ка мне, вясна ты маладая!.. `);
  */

  return {
    nlpDialog
  };
};

function reducer(state: INLPDialogState = initialState(), action: TNLPDialogActions): INLPDialogState {
  switch (action.type) {
    case getType(actions.addNLPDialogText): {
      state.nlpDialog.add('me', action.payload);
      return state;
    }

    default:
      return state;
  }
}

export { reducer, INLPDialogState };
