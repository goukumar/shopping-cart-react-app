import axios from 'axios'

const getNavigation = () =>  {
    return axios.get('http://localhost:3000/api/navigation')
    .then((response)=>response.data)
    .catch(function (error) {
        console.log(error);
      })
}
const navigationService = {
    getNavigation
}
export default navigationService;