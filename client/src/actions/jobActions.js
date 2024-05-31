import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE
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

export const createJob = (jobData) => async (dispatch) => {
  dispatch({ type: CREATE_JOB_REQUEST });

  try {
    console.log('Job data being sent:', jobData); // Log the jobData to check its format
    const response = await fetch(`http://localhost:3030/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(jobData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create job');
    }

    const data = await response.json();
    dispatch({ type: CREATE_JOB_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error creating job:', error.message);
    dispatch({ type: CREATE_JOB_FAILURE, payload: error.message });
  }
};