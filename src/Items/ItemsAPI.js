import apiUrl from '../apiConfig'
import axios from 'axios'

export const AddItem = (user, item) => {
  return axios({
    url: apiUrl + '/items',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { item }
  })
}

export const ShowItems = (user, id) => {
  return axios({
    url: apiUrl + `/showitems/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const ShowMyItems = (user, userName, tripId) => {
  return axios({
    url: apiUrl + `/showmyitems/${tripId}/${userName}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const UpdateTripItems = (user, tripId, itemsArray, userName, item) => {
  return axios({
    url: apiUrl + `/items/${tripId}/${itemsArray}/${userName}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { item }
  })
}

export const RemoveItem = (user, id, item) => {
  return axios({
    url: apiUrl + `/items/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { item }
  })
}
