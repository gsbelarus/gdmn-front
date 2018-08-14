import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { EQueryTranslator } from '@core/EQueryTranslator';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import { selectSemanticsState } from '@src/app/store/selectors';
import { TActions } from '@src/app/store/TActions';
import { ermodelActions } from '@src/app/scenes/ermodel/actions';
import { ermodelSelector } from '@src/app/scenes/ermodel/selectors';
import { actions } from '@src/app/scenes/semantics/actions';
import {
  ISemanticsBoxActionsProps,
  ISemanticsBoxSelectorProps,
  ISemanticsBoxStateProps,
  SemanticsBox,
  TSemanticsBoxProps
} from '@src/app/scenes/semantics/component';
import {
  commandSelector,
  dataTableBodyRowsSelector,
  dataTableMetaSelector,
  sqlQuerySelector
} from '@src/app/scenes/semantics/selectors';

const getSemanticsBoxContainer = (apiService: GdmnApi) =>
  connect(
    (state: IState, ownProps: TSemanticsBoxProps): ISemanticsBoxStateProps & ISemanticsBoxSelectorProps => {
      const { erTranslatorRU, tableData, ...props } = selectSemanticsState(state); // exclude, do not remove!

      return {
        ...props,
        ...dataTableMetaSelector(state, ownProps),
        dataTableBodyRows: dataTableBodyRowsSelector(state, ownProps),
        erModel: ermodelSelector(state, ownProps),
        command: commandSelector(state, ownProps),
        sqlQuery: sqlQuerySelector(state, ownProps)
      };
    },
    (dispatch: Dispatch<TActions>): ISemanticsBoxActionsProps => ({
      onSetText: bindActionCreators(actions.setSemText, dispatch),
      onClearText: () => dispatch(actions.setSemText('')),
      onParse: (text: string) => dispatch(actions.setParsedText(parsePhrase(text))),
      loadErModel: async () => {
        // // TODO async action
        // dispatch(ermodelActions.loadERModelRequest());
        // try {
        //   const erModel = await apiService.fetchEr();
        //   dispatch(ermodelActions.loadERModelRequestOk(erModel));
        // } catch (err) {
        //   dispatch(ermodelActions.loadERModelRequestError(err));
        // }
      },
      loadData: async (command: any) => {
        // TODO async action
        dispatch(actions.loadNlpDataRequest());

        const queries = EQueryTranslator.process(command);

        await Promise.all(
          queries.map(async query => {
            try {
              const res = await apiService.fetchEntityQuery(query, ''); // TODO
              dispatch(actions.loadNlpDataRequestOk(res));
            } catch (err) {
              dispatch(actions.loadNlpDataRequestError(err));
            }
          })
        );
      }
    })
  )(SemanticsBox);

export { getSemanticsBoxContainer };
