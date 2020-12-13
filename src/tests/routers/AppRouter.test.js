import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { firebase } from '../../firebase/firebase-config';

import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/authAction';
import { act } from '@testing-library/react';

jest.mock('../../actions/authAction', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
  test('debe de llamar el login si estoy autenticado', async () => {
    let user;

    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword('test@testing.com', '123456');

      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith('C66ij9jaKSPVMbM10nG16bwjron1', null);
  });
});
