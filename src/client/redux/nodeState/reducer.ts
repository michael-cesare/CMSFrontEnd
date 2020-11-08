import reducerUtil from '@client/utils/reducer.util';

import { IVMNodeStore } from '@srcTypes/viewModels';

const initialState: IVMNodeStore = {
  value: undefined,
};

export default reducerUtil( initialState, {} );
