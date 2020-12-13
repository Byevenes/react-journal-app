import '@testing-library/jest-dom';
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from '../../actions/uiAction';
import { types } from '../../types/types';

describe('Pruebas en ui-Action', () => {
  test('todas las acciones deben de funcionar', () => {
    const setErrorAction = setError('HEEEELP');

    expect(setErrorAction).toEqual({
      type: types.uiSetError,
      payload: 'HEEEELP',
    });

    const removeErrorAction = removeError();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });

    const startLoadingAction = startLoading();

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });

    const finishLoadingAction = finishLoading();

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
