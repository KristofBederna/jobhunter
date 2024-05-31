import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  MODIFY_JOB_REQUEST,
  MODIFY_JOB_SUCCESS,
  MODIFY_JOB_FAILURE
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

// Fetch jobs by user ID
export const fetchJobsByUserId = (userId) => fetchJobs({ userId });

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

// Create a new job
export const createJob = (jobData) => async (dispatch) => {
  dispatch({ type: CREATE_JOB_REQUEST });

  try {
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
    dispatch({ type: CREATE_JOB_FAILURE, payload: error.message });
  }
};

// Delete a job
export const deleteJob = (id) => async (dispatch) => {
  dispatch({ type: DELETE_JOB_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete job');
    }

    dispatch({ type: DELETE_JOB_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_JOB_FAILURE, payload: error.message });
  }
};

// Modify a job
export const modifyJob = (id, jobData) => async (dispatch) => {
  dispatch({ type: MODIFY_JOB_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/jobs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(jobData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to modify job');
    }

    const data = await response.json();
    dispatch({ type: MODIFY_JOB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MODIFY_JOB_FAILURE, payload: error.message });
  }
};
