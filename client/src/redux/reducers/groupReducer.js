import { DeleteData } from "../actions/globalTypes";
import { GROUP_TYPES } from "../actions/groupAction";

const intial = {
  group: [],
  loading: false,
  getGroup: [],
  deGroup: [],
};
const groupReducer = (state = intial, action) => {
  switch (action.type) {
    case GROUP_TYPES.ADD_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case GROUP_TYPES.GET_GROUP:
      return {
        ...state,
        getGroup: action.payload,
      };
    case GROUP_TYPES.DE_GROUP:
      return {
        ...state,
        deGroup: action.payload,
      };
    case GROUP_TYPES.DELETE_GROUP:
      return {
        ...state,
        getGroup: DeleteData(state.getGroup, action.payload._id),
      };
    default:
      return state;
  }
};

export default groupReducer;
