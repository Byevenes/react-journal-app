import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUpLoading,
} from '../../actions/notesAction';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://hola-mundo.com/cosa.jpg';
    // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: '2Dz31ukwQI2QWl3EtkmE',
      title: 'Chao',
      body: 'QL!',
    },
  },
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('debe de crear una nueva nota starNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    const { uid } = store.getState().auth;
    const { id } = actions[0].payload;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
  });

  test('startLoadingNotes debe cargar las notas', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe de actualizar la nota', async () => {
    const note = {
      id: 'BNslnbOtXlmeUfQtQrZV',
      title: 'Titulo xd',
      body: 'Bodyyy',
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdate);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test('startUpLoading debe de actualizar el url del entry', async () => {
    const file = new File([], 'foto.jpg');

    await store.dispatch(startUpLoading(file));

    const docRef = await db
      .doc(`/TESTING/journal/notes/2Dz31ukwQI2QWl3EtkmE`)
      .get();

    expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
  });
});
