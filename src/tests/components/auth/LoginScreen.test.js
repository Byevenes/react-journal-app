import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import {
  startGoogleLogin,
  startLoginEmailPasswword,
} from '../../../actions/authAction';

jest.mock('../../../actions/authAction', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPasswword: jest.fn(),
}));

// con el ctrl + } puedo comentar todo lo que tenga marcado
// const middlewares = [thunk];

/* <LoginScreen /> */

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

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe de mostrar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar la acción de startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('debe de disparar el startLogin con los respectivos argumentos', () => {
    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });

    expect(startLoginEmailPasswword).toHaveBeenCalledWith(
      'brayan@gmail.com',
      '123456'
    );
  });
});
