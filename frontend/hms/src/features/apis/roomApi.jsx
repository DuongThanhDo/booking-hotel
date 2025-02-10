import axiosClient from './axiosClient';

const getRoom = async () => {
    try {
        const url = '/rooms';

        const response = await axiosClient.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const addRoom = async ({ room_number, type, price, status }) => {
    try {
        const data = { room_number, type, price, status };
        const url = '/rooms';

        const response = await axiosClient.post(url, data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteRoom = async (id) => {
    try {
        const url = `/rooms/${id}`;
        console.log(url);

        const response = await axiosClient.delete(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const editRoom = async (id, { room_number, type, price, status }) => {
    try {
        const data = { room_number, type, price, status };
        const url = `/rooms/${id}`;

        console.log(data);
        console.log(url);

        const response = await axiosClient.put(url, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const roomApi = {
    getRoom,
    addRoom,
    deleteRoom,
    editRoom,
};

export default roomApi;
