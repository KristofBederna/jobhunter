// userReducer.js

import {
  SET_USER,
  CLEAR_USER,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_EXPERIENCES_REQUEST,
  FETCH_USER_EXPERIENCES_SUCCESS,
  FETCH_USER_EXPERIENCES_FAILURE,
  APPLY_TO_JOB_REQUEST,
  APPLY_TO_JOB_SUCCESS,
  APPLY_TO_JOB_FAILURE,
} from '../actions/userActions';

const initialState = {
  id: null,
  email: '',
  fullname: '',
  role: '',
  loadingProfile: false,
  loadingExperiences: false,
  errorProfile: null,
  errorExperiences: null,
  experiences: [],
  applyingToJob: false,
  applyToJobError: null,
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
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loadingProfile: true,
        errorProfile: null
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        ...action.payload
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loadingProfile: false,
        errorProfile: action.payload
      };
    case FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        loadingExperiences: true,
        errorExperiences: null
      };
    case FETCH_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        loadingExperiences: false,
        experiences: action.payload.data
      };
    case FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        loadingExperiences: false,
        errorExperiences: action.payload
      };
    case APPLY_TO_JOB_REQUEST:
      return {
        ...state,
        applyingToJob: true,
        applyToJobError: null,
      };
    case APPLY_TO_JOB_SUCCESS:
      return {
        ...state,
        applyingToJob: false,
      };
    case APPLY_TO_JOB_FAILURE:
      return {
        ...state,
        applyingToJob: false,
        applyToJobError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
