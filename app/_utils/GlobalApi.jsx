const { default: axios } = require("axios");

const apiKey= process.env.NEXT_PUBLIC_REST_API_KEY;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization : `Bearer ${apiKey}`,
    },
});


const getLatestProducts= () => axiosClient.get('/products?populate=*');

const getProductById = (id) => axiosClient.get('/products/'+id+'?populate=*');

const getProductByCategory = (category) => axiosClient.get('/products?filters[product_cat][Name][$eq]='+category+"&populate=*");

const addToCart = (data) => axiosClient.post('/carts', data);

const getUserCartItems = (email) =>  axiosClient.get('/carts?[0][populate][product][populate]=banner&filters[email][$eq]='+email+"&populate=*");

const deleteCartItem = (id) => axiosClient.delete('/carts/'+id);

const createOrder = (data) => axiosClient.post('/orders', data)

export default {
    getLatestProducts, getProductById, getProductByCategory, addToCart, getUserCartItems, deleteCartItem, createOrder
}