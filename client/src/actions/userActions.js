// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const FETCH_USER_EXPERIENCES_REQUEST = 'FETCH_USER_EXPERIENCES_REQUEST';
export const FETCH_USER_EXPERIENCES_SUCCESS = 'FETCH_USER_EXPERIENCES_SUCCESS';
export const FETCH_USER_EXPERIENCES_FAILURE = 'FETCH_USER_EXPERIENCES_FAILURE';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

// Asynchronous Actions
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
