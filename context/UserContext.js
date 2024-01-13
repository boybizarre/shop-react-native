import createDataContext from './createDataContext';

// reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
  }
};

// action creators
const setUserId = (dispatch) => (userId) => {
  dispatch({
    type: 'SET_USER_ID',
    payload: userId,
  });
};

export const { Context, Provider } = createDataContext(
  userReducer,
  { setUserId },
  { userId: '' }
);
