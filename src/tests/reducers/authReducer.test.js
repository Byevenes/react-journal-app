import '@testing-library/jest-dom';

import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en <authReducer />', () => {
  test('debe de realizar el login', () => {
    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'asdasdsadasdas',
        displayName: 'Brayan',
      },
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({
      uid: action.payload.uid,
      name: action.payload.displayName,
    });
  });

  test('debe de realizar el logout', () => {
    const initialState = { uid: 'asdsadadas', displayName: 'Brayan' };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({});
  });

  test('no debe de hacer cambios en el state', () => {
    const initialState = { uid: 'asdsadadas', displayName: 'Brayan' };

    const action = {
      type: 'asdad',
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
