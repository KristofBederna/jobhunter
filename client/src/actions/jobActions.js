import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE
} from './jobActionTypes';

// Fetch all jobs
export const fetchJobs = (params) => async (dispatch) => {
  dispatch({ type: FETCH_JOBS_REQUEST });

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:3030/jobs?${query}`);
    const data = await response.json();

    dispatch({ type: FETCH_JOBS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message });
  }
};

// Fetch a single job by ID
export const fetchJobById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_JOB_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/jobs/${id}`);
    const data = await response.json();

    dispatch({ type: FETCH_JOB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_JOB_FAILURE, payload: error.message });
  }
};
