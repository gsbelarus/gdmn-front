import { TWsMessageEventDataTypeEnum } from '@core/gdmn-api/ws/wsMessageEventDataType';

export interface IWsMessageEventData {
  type: TWsMessageEventDataTypeEnum;
  data: any;
}
