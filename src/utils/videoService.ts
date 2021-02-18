import axios from "axios";
import {
    IApiError,
    ICreatePutDeleteVideo,
    IGetVideo,
    IGetVideos,
    IVideo,
} from "../interfaces/Videos";

const API = "http://localhost:3001/videos";

type GetVideosData = {
    data: IGetVideos;
};

export const getVideos = async () => {
    try {
        const { data }: GetVideosData = await axios.get(API);
        return data.videos;
    } catch (error) {
        console.error("getVideos Error:", error);
        return [];
    }
};

export const getVideo = async (id: string) => {
    try {
        const { data }: { data: IGetVideo } = await axios.get(`${API}/${id}`);
        return data.video;
    } catch (error) {
        console.log("getVideo Error:", error);
        return {} as IVideo;
    }
};

export const createVideo = async (newVideo: IVideo) => {
    try {
        const { data }: { data: ICreatePutDeleteVideo } = await axios.post(
            API,
            newVideo
        );
        return data;
    } catch (error) {
        console.warn("createVideo Error:", error);
        const resp: IApiError = error.response.data;
        return resp;
    }
};

export const updateVideo = async (id: string, newVideo: IVideo) => {
    try {
        const { data }: { data: ICreatePutDeleteVideo } = await axios.put(
            `${API}/${id}`,
            newVideo
        );
        return data;
    } catch (error) {
        console.warn("updateVideo Error:", error);
        const resp: IApiError = error.response.data;
        return resp;
    }
};

export const deleteVideo = async (id: string) => {
    try {
        const { data }: { data: ICreatePutDeleteVideo } = await axios.delete(
            `${API}/${id}`
        );
        return data;
    } catch (error) {
        console.warn("deleteVideo Error:", error);
        const resp: IApiError = error.response.data;
        return resp;
    }
};
