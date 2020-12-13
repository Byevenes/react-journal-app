import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/authAction';
import { startNewNote } from '../../../actions/notesAction';

jest.mock('../../../actions/authAction', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../../actions/notesAction', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    name: 'Brayan',
  },
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
      <Sidebar />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <Sidebar />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el startLogout', () => {
    wrapper.find('button').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
  });

  test('debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();

    expect(startNewNote).toHaveBeenCalled();
  });
});
