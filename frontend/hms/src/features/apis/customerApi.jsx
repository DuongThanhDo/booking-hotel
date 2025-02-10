import axiosClient from './axiosClient';

const getCustomer = async () => {
    try {
        const url = '/customers';

        const response = await axiosClient.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const getCustomerById = async (id) => {
    try {
        const url = `/users/${id}`;

        const response = await axiosClient.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const customerApi = { getCustomer, getCustomerById };

export default customerApi;
