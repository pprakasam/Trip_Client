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

export const ShowAllImages = (user, tripId) => {
  return axios({
    url: apiUrl + `/tripphotos/${tripId}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
