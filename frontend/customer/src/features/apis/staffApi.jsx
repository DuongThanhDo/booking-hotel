import axiosClient from './axiosClient';

const getAll = async () => {
    const url = '/staffs';

    const reponse = await axiosClient.get(url);
    return reponse;
};

const staffApi = { getAll };
export default staffApi;
