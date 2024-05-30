// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const clearUser = () => ({
  type: CLEAR_USER
});

// You can also define async actions if needed
