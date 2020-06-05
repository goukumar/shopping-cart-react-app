import axios from 'axios'

const getProducts = () =>  {
    return axios.get('http://localhost:3000/api/products')
    .then((response)=>response.data)
    .catch(function (error) {
        console.log(error);
      })
}
const productService = {
    getProducts
}
export default productService;