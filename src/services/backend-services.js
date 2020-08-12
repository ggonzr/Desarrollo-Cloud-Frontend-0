import axios from 'axios';
import qs from 'qs';

const hostname = 'http://172.24.98.139:8080/';

export async function SignIn(usuario, contraseña) {
    let response = await axios({
        method: 'post',
        url: hostname + 'api/api-auth/',
        data: qs.stringify({
          username: usuario,
          password: contraseña
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
    return response;
}

export async function SignUp(usuario, contraseña, nombres, apellidos, email) {
  let formData = new FormData();
  formData.set('username', usuario);
  formData.set('password', contraseña);
  formData.set('first_name', nombres);
  formData.set('last_name', apellidos);
  formData.set('email', email);

  let response = await axios({
    method: 'post',
    url: hostname + 'api/create-user/',
    data: formData,
    headers: {
      'content-type': 'multipart/form-data'
    }
  });

  return response;
}

export async function getAllEvents() {
  let token = `Token ${localStorage.getItem('token')}`;
  let response = await axios({
    method: 'get',
    url: hostname + 'api/events/',
    headers: {
      'Authorization': token
    }
  });
  return response;
}

