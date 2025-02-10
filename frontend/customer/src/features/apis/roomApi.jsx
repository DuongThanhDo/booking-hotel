import axiosClient from './axiosClient';

const getNonRepeatRoomType = async () => {
    const url = '/rooms/type';

    try {
        const response = await axiosClient.get(url);
        return response;
    } catch (error) {
        console.error('Có lỗi xảy ra khi gọi API:', error);
        throw error;
    }
};

const roomApi = { getNonRepeatRoomType };
export default roomApi;
