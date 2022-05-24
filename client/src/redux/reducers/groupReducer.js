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
    default:
      return state;
  }
};

export default groupReducer;
