import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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
// store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe de mostrar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de hacer el dispatch de la acción respectiva', () => {
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    const action = store.getActions();

    expect(action[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid',
    });
  });
});
