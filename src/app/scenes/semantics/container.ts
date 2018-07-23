import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { deserializeERModel, IERModel } from 'gdmn-orm';

import { EQueryTranslator } from '@core/EQueryTranslator';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IRootState } from '@src/app/store/rootReducer';
import { selectSemanticsState } from '@src/app/store/selectors';
import { TRootActions } from '@src/app/store/RootActions';
import { actions as erModelActions } from '@src/app/scenes/ermodel/actions';
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
    (state: IRootState, ownProps: TSemanticsBoxProps): ISemanticsBoxStateProps & ISemanticsBoxSelectorProps => {
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
    (dispatch: Dispatch<TRootActions>): ISemanticsBoxActionsProps => ({
      onSetText: bindActionCreators(actions.setSemText, dispatch),
      onClearText: () => dispatch(actions.setSemText('')),
      onParse: (text: string) => dispatch(actions.setParsedText(parsePhrase(text))),
      loadErModel: () => {
        apiService
          .fetchEr()
          .then(res => dispatch(erModelActions.loadERModelOk(deserializeERModel(<IERModel>res))))
          .catch((err: Error) => dispatch(erModelActions.loadError(err.message)));
      },
      loadData: (command: any) => {
        dispatch(actions.tableDataLoadStart());

        const queries = EQueryTranslator.process(command);

        Promise.all(
          queries.map(query =>
            apiService
              .fetchQuery(query, 'command')
              .then(res => dispatch(actions.setTableData(res))) // TODO command id
              .catch((err: Error) => console.log(err))
          )
        );
      }
    })
  )(SemanticsBox);

export { getSemanticsBoxContainer };
