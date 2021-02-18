export interface IVideo {
    _id?: string;
    title: string;
    url: string;
    description: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IVideoItem {
    video: IVideo;
    loadVideos: () => Promise<void>;
}

export interface IGetVideos {
    status: boolean;
    videos: IVideo[];
}

export interface IGetVideo {
    status: boolean;
    video: IVideo;
}

export interface ICreatePutDeleteVideo {
    status: boolean;
    video: IVideo;
    msg: string;
}

export interface IApiError {
    status: boolean;
    msg: string;
    error: any;
}

export interface IApiResponses {
    status: boolean;
    message: string;
    id?: string;
    error?: string;
    url?: string;
    video?: IVideo;
    videos: IVideo[];
}

export interface IUpdateVideoURLParams {
    id: string;
}
