import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IUpdateVideoURLParams, IVideo } from "../../interfaces/Videos";
import { createVideo, getVideo, updateVideo } from "../../utils/videoService";

type TInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {
    const initialState: IVideo = {
        title: "",
        url: "",
        description: "",
    };

    const history = useHistory();
    const params = useParams<IUpdateVideoURLParams>();

    const [video, setVideo] = useState<IVideo>(initialState);

    const handleInputChange = (e: TInputChange) => {
        setVideo({
            ...video,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!params.id) {
            const resp = await createVideo(video);
            if (resp.status) {
                toast.success(resp.msg);
                history.push("/");
            } else {
                toast.error(resp.msg);
            }
        } else {
            const resp = await updateVideo(params.id, video);
            if (resp.status) {
                toast.success(resp.msg);
                history.push("/");
            } else {
                toast.error(resp.msg);
            }
        }

    };

    const getVideoToUpdate = async (id: string) => {
        const { title, description, url } = await getVideo(id);

        setVideo({
            title,
            description,
            url,
        });
    };

    useEffect(() => {
        if (params.id) getVideoToUpdate(params.id);
    }, []);

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>{params.id ? "Update Video" : "New Video"}</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    value={video.title}
                                    placeholder="Video Title"
                                    className="form-control"
                                    autoFocus
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="url"
                                    value={video.url}
                                    placeholder="https://somesite.com"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    value={video.description}
                                    rows={3}
                                    className="form-control"
                                    placeholder="Write a decription"
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <button className="btn btn-primary">
                                {params.id ? "Update Video" : "Create Video"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoForm;
