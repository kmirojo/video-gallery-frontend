import React from "react";
import { IVideoItem } from "../../interfaces/Videos";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { deleteVideo } from "../../utils/videoService";
import { toast } from "react-toastify";

const VideoItem = ({ video, loadVideos }: IVideoItem) => {
    const history = useHistory();

    const handleCardClick = () => {
        history.push(`/update/${video._id}`);
    };

    const handleDeleteVideo = async () => {
        if (!video._id) return console.error("Id not fount");
        const resp = await deleteVideo(video._id);

        if (resp.status) {
            toast.success(resp.msg);
        } else {
            toast.error(resp.msg);
        }

        loadVideos();
    };

    return (
        <div className="col-md-4">
            <div className="card card-body video-card">
                <div className="d-flex justify-content-between">
                    <h4
                        onClick={handleCardClick}
                        className="video-title"
                        title={video.title}
                    >
                        {video.title}
                    </h4>
                    <span
                        className="text-danger video-delete"
                        onClick={handleDeleteVideo}
                    >
                        x
                    </span>
                </div>
                <p>{video.description}</p>
                <div className="video-container embed-responsive">
                    <ReactPlayer url={video.url} />
                </div>
            </div>
        </div>
    );
};

export default VideoItem;
