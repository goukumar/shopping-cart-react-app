import axios from 'axios'

export const fetchProfile = (api, payload={}, token='', callback) =>{
    return axios({
        method: 'get',
        url: api,
        headers: {'x-access-token': token},
        params:{email:payload}
    }).then((response) => callback(response.data))
    .catch(error => {
        console.log(error);
    });

    //return axios.get(api).then((response)=>response.data)
}