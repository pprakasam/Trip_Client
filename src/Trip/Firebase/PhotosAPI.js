import apiUrl from '../../apiConfig'
import axios from 'axios'

export const AddImage = (user, photo) => {
  return axios({
    url: apiUrl + '/photos',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { photo }
  })
}

export const ShowAllImages = (user) => {
  return axios({
    url: apiUrl + '/photos',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
