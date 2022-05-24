import { GLOBALTYPES } from "../actions/globalTypes";

const statusZoomReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUSZOOM:
      return action.payload;
    default:
      return state;
  }
};

export default statusZoomReducer;
