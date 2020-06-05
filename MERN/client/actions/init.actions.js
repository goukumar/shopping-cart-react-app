import axios from 'axios'

const fetch = (api, payload={}, token='') =>{
    console.log(api)
    return axios({
        method: 'get',
        url: api,
        headers: {'x-access-token': token},
        params:{payload}
    }).then((response) => response.data)
    .catch(error => {
        console.log(error);
    });

    //return axios.get(api).then((response)=>response.data)
}

const post = (api, payload,token='') => {
    return axios({
                    method: 'post',
                    url: api,
                    headers: {'x-access-token': token},
                    data:payload
                }).then((response) => response.data)
                .catch(error => {
                    console.log(error);
                });
}

const put = (api, payload,token='') => {
    return axios({
                    method: 'put',
                    url: api,
                    headers: {'x-access-token': token},
                    data:payload
                }).then((response) => response.data)
                .catch(error => {
                    console.log(error);
                });
}
const deleteRecord = (api, payload) => {
    return axios({
                    method: 'delete',
                    url: api,
                    data:payload
                }).then((response) => response.data)
                .catch(error => {
                    console.log(error);
                });
}
const initAPI = {
    fetch,
    post,
    put,
    deleteRecord
}

export default initAPI;