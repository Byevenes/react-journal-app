import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notesAction';

jest.mock('../../../actions/notesAction', () => ({
  activeNote: jest.fn(),
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
    active: {
      id: '123',
      title: 'Hola Title test',
      body: 'Hola Body test',
    },
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <NoteScreen />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar el activeNote', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola title cambiado',
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith('123', {
      title: 'Hola title cambiado',
      body: 'Hola Body test',
      id: '123',
    });
  });
});
