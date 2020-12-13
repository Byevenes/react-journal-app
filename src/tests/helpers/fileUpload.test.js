import cloudinary from 'cloudinary';

import '@testing-library/jest-dom';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'byevenes',
  api_key: '533876499215132',
  api_secret: 'ugPDd_QyFbFbUautcd4L_AvFGMI',
});

describe('Pruebas en fileUpload', () => {
  test('debe de cargar un archivo y retonar el URL', async () => {
    const response = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    );
    const blob = await response.blob();

    const file = new File([blob], 'foto.png');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    //Borrar img por id
    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.v2.api.delete_resources(imgId);
  });

  test('debe de retonar un error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
