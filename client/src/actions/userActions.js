import {
  SET_USER,
  CLEAR_USER,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_EXPERIENCES_REQUEST,
  FETCH_USER_EXPERIENCES_SUCCESS,
  FETCH_USER_EXPERIENCES_FAILURE,
  MODIFY_USER_EXPERIENCE_REQUEST,
  MODIFY_USER_EXPERIENCE_SUCCESS,
  MODIFY_USER_EXPERIENCE_FAILURE,
  APPLY_TO_JOB_REQUEST,
  APPLY_TO_JOB_SUCCESS,
  APPLY_TO_JOB_FAILURE
} from './userActionTypes';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const fetchUserProfile = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    const data = await response.json();
    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: data });
    dispatch(setUser(data));
  } catch (error) {
    dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const fetchUserExperiences = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_EXPERIENCES_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/experiences?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user experiences');
    }

    const data = await response.json();
    dispatch({ type: FETCH_USER_EXPERIENCES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USER_EXPERIENCES_FAILURE, payload: error.message });
  }
};

export const modifyUserExperience = (experienceId, updatedExperience) => async (dispatch) => {
  dispatch({ type: MODIFY_USER_EXPERIENCE_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/experiences/${experienceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(updatedExperience)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to modify user experience');
    }

    const data = await response.json();
    dispatch({ type: MODIFY_USER_EXPERIENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MODIFY_USER_EXPERIENCE_FAILURE, payload: error.message });
  }
};

export const applyToJob = (id, responseDiv) => {
  return async (dispatch) => {
    dispatch({ type: APPLY_TO_JOB_REQUEST });

    try {
      const response = await fetch('http://localhost:3030/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ "jobId": id }),
      });

      if (response.ok) {
        dispatch({ type: APPLY_TO_JOB_SUCCESS });
        console.log('Application successful');
        responseDiv.innerHTML = "Application successful";
      } else {
        dispatch({ type: APPLY_TO_JOB_FAILURE, payload: 'Failed to apply to job' });
        console.error('Application failed');
      }
    } catch (error) {
      dispatch({ type: APPLY_TO_JOB_FAILURE, payload: error.message });
      console.error('Error applying:', error);
    }
  };
};
