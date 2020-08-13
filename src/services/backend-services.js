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

export async function deleteEvent(id) {
  let token = `Token ${localStorage.getItem('token')}`;
  let response = await axios({
    method: 'delete',
    url: hostname + 'api/events/' + id,
    headers: {
      'Authorization': token
    }
  });
  return response;
}

export async function updateEvent(event) {
  let formData = new FormData();
  formData.set('event_address', event.event_address);
  formData.set('event_category', event.event_category);
  formData.set('event_final_date', event.event_final_date);
  formData.set('event_initial_date', event.event_initial_date);
  formData.set('event_name', event.event_name);
  formData.set('event_place', event.event_place);
  formData.set('event_type', event.event_type);

  let token = `Token ${localStorage.getItem('token')}`;
  let response = await axios({
    method: 'put',
    url: hostname + 'api/events/' + event.id,
    data: formData,
    headers: {
      'Authorization': token,
      'content-type': 'multipart/form-data'
    }
  });
  return response;
}

export async function createEvent(event) {  
  let formData = new FormData();
  formData.set('event_address', event.event_address);
  formData.set('event_category', event.event_category);
  formData.set('event_final_date', event.event_final_date);
  formData.set('event_initial_date', event.event_initial_date);
  formData.set('event_name', event.event_name);
  formData.set('event_place', event.event_place);
  formData.set('event_type', event.event_type);
  formData.set('thumbnail', event.thumbnail, event.thumbnail.name);
  
  try {
    let token = `Token ${localStorage.getItem('token')}`;
    let response = await axios({
      method: 'post',
      url: hostname + 'api/events/',
      data: formData,
      headers: {
        'Authorization': token,
        'content-type': 'multipart/form-data'
      }
    });

    return response;  
  } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log('Error message', error.message);
  }  
}
