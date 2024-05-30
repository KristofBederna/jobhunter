import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE
} from '../actions/jobActionTypes';

const initialState = {
  jobs: [],
  job: null,
  loading: false,
  error: null
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
    case FETCH_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.data,
        loading: false
      };
    case FETCH_JOB_SUCCESS:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case FETCH_JOBS_FAILURE:
    case FETCH_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default jobReducer;
