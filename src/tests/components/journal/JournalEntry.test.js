import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notesAction';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: '123',
  title: 'Hola Title test',
  body: 'Hola Body test',
  date: 0,
  url: 'https://algunlugar.com/foto.jpg',
};

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry {...note} />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <JournalEntry />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de activar la nota', () => {
    //   Otra forma de poder mostrar del store los dispatch correspondientes
    wrapper.find('.journal__entry').prop('onClick')();
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note })
    );
  });
});
