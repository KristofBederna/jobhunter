import {
  FETCH_APPLICANTS_REQUEST,
  FETCH_APPLICANTS_SUCCESS,
  FETCH_APPLICANTS_FAILURE
} from '../actions/applicantActionTypes';

const initialState = {
  loading: false,
  applicants: [],
  error: ''
};

const applicantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPLICANTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case FETCH_APPLICANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        applicants: action.payload,
        error: ''
      };
    case FETCH_APPLICANTS_FAILURE:
      return {
        ...state,
        loading: false,
        applicants: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default applicantReducer;
