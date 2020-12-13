import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  login,
  logout,
  startLoginEmailPasswword,
  startLogout,
} from '../../actions/authAction';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('login y logout deben de crear la acción respectiva ', () => {
    const uid = 'asdad123';
    const displayName = 'Brayan';

    const loginAction = login(uid, displayName);

    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid, displayName },
    });

    const logoutAction = logout();

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test('debe de realizar el startLogout', async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.logout);
    expect(actions[1].type).toBe(types.notesLogoutCleaning);
  });

  test('debe de iniciar el startLoginEmailPasswword', async () => {
    await store.dispatch(
      startLoginEmailPasswword('test@testing.com', '123456')
    );

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: { uid: 'C66ij9jaKSPVMbM10nG16bwjron1', displayName: null },
    });
  });
});
