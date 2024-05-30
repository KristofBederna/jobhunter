import { SET_USER, CLEAR_USER } from '../actions/userActions';

const initialState = {
  id: null,
  email: '',
  fullname: '',
  role: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;
