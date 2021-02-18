import React, { useEffect, useState } from "react";
import { IVideo } from "../../interfaces/Videos";
import { getVideos } from "../../utils/videoService";
import VideoItem from "./VideoItem";

const VideoList = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    const loadVideos = async () => {
        const videoList = await getVideos();

        const formatedVideos = videoList
            .map((video) => {
                return {
                    ...video,
                    createdAt: video.createdAt
                        ? new Date(video.createdAt)
                        : new Date(),
                    updatedAt: video.updatedAt
                        ? new Date(video.updatedAt)
                        : new Date(),
                };
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        setVideos(formatedVideos);
    };

    useEffect(() => {
        loadVideos();
    }, []);

    const getVideoList = () => {
        if (videos.length) {
            return videos.map((video, key) => (
                <VideoItem video={video} key={key} loadVideos={loadVideos} />
            ));
        }

        return <p>There are no videos!</p>;
    };

    return <div className="row">{getVideoList()}</div>;
};

export default VideoList;
