import axiosClient from './axiosClient';

const getStaff = async () => {
    try {
        const url = '/staffs';

        const response = await axiosClient.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const getStaffById = async (id) => {
    try {
        const url = `/users/${id}`;

        const response = await axiosClient.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const addStaff = async ({ user_name, password, email, role, position, name, phone, address }) => {
    try {
        const data = { user_name, password, email, role, position, name, phone, address };
        const url = '/auth/register';

        const response = await axiosClient.post(url, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteStaff = async (id) => {
    try {
        const url = `/users/${id}`;
        console.log(url);

        const response = await axiosClient.delete(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const editStaff = async (id, { position, name, phone, address }) => {
    try {
        const urlStaff = `/staffs/${id}`;
        const urlProfile = `/profiles/${id}`;

        await axiosClient.put(urlStaff, { position });
        await axiosClient.put(urlProfile, { name, phone, address });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const staffApi = {
    getStaff,
    getStaffById,
    addStaff,
    deleteStaff,
    editStaff,
};

export default staffApi;
