import axiosClient from './axiosClient';

const register = async (user_name, email, password) => {
    const data = { user_name, email, password };
    const url = '/auth/register';

    const response = await axiosClient.post(url, data);
    return response;
};

const login = async (email, password) => {
    const data = { email, password };
    const url = '/auth/login';

    const response = await axiosClient.post(url, { ...data, web: 'hms' });
    return response;
};

const userApi = {
    register,
    login,
};

export default userApi;
