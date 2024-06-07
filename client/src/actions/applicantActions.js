import {
  FETCH_APPLICANTS_REQUEST,
  FETCH_APPLICANTS_SUCCESS,
  FETCH_APPLICANTS_FAILURE
} from './applicantActionTypes'

export const fetchApplicants = (params) => async (dispatch) => {
  dispatch({ type: FETCH_APPLICANTS_REQUEST });

  try {
    const response = await fetch(`http://localhost:3030/applicants?jobId=${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const data = await response.json();

    dispatch({ type: FETCH_APPLICANTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_APPLICANTS_FAILURE, payload: error.message });
  }
};