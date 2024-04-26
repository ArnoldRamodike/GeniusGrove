const { default: axios } = require("axios");

const apiKey= process.env.NEXT_PUBLIC_REST_API_KEY;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization : `Bearer ${apiKey}`,
    },
});


const getLatestProducts= () => axiosClient.get('/products?populate=*');

export default {
    getLatestProducts
}