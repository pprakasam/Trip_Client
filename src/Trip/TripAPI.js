import apiUrl from '../apiConfig'
import axios from 'axios'

export const createTrip = (user, trip) => {
  return axios({
    url: apiUrl + '/trips',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { trip }
  })
}

export const ShowAllTrips = (user) => {
  return axios({
    url: apiUrl + '/trips',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const ShowOneTrip = (user, id) => {
  return axios({
    url: apiUrl + `/trips/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const EditTrip = (user, id, trip) => {
  return axios({
    url: apiUrl + `/trips/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { trip }
  })
}

export const DeleteTrip = (user, id, trip) => {
  return axios({
    url: apiUrl + `/trips/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { trip }
  })
}

export const JoinTrip = (user, tripfamily) => {
  return axios({
    url: apiUrl + '/tripfamilies',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { tripfamily }
  })
}

export const ShowMyTrips = (user) => {
  return axios({
    url: apiUrl + '/tripfamilies',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const DeleteMyTrip = (user, id) => {
  return axios({
    url: apiUrl + `/tripfamilies/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
