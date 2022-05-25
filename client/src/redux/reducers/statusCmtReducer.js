import { GLOBALTYPES } from "../actions/globalTypes";

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUSCMT:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
