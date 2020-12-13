import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Pruebas en <types />', () => {
  test('debe de retonar el objeto completo', () => {
    const copyTypes = {
      /** Authentication */

      login: '[Auth] Login',
      logout: '[Auth] Logout',

      /** UI */

      uiSetError: '[UI] SetError',
      uiRemoveError: '[UI] RemoveError',

      uiStartLoading: '[UI] StartLoading',
      uiFinishLoading: '[UI] FinishLoading',

      /** Notes  */

      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load notes',
      notesUpdate: '[Notes] Updated note',
      notesFileUrl: '[Notes] Updated image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning',
    };

    expect(types).toEqual(copyTypes);
  });
});
