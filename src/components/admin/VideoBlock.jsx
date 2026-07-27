import { RiDraggable } from "react-icons/ri";
import { FiTrash2, FiImage } from "react-icons/fi";
import './VideoBlock.css'
import { Upload } from "lucide-react";
export default function VideoBlock({ block, onDelete, onChange }) {
   const handleVideo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    onChange(block.id, {
        data: {
            ...block.data,
            file,
            preview,
        },
    });
};
    return (
        <>
            <div className='video-block'>
                <div className="block-handle">
                    <RiDraggable />
                    <span style={{ fontSize: '12px' }}>Video</span>
                </div>
                <div className='video-block-content'>
                    <span style={{ fontWeight: '600' }}>Video</span>
                    <div className="d-flex flex-column gap-1">
                        <span style={{ fontWeight: '600', fontSize: '15px' }}>Upload Video</span>
                        <input type="file" className="video-file-input" accept="video/*" onChange={handleVideo} />
                        {block.data.preview && (
                            <>
                               <p>{block.data.preview}</p>
                            <video
                                src={block.data.preview}
                                controls
                                width="100%"
                            />
                            </>
                        )}
                        <input type="url" className="video-file-input" value={block.data.videoUrl || ""}
                            placeholder="Or paste video URL(Youtube, vimeo, Facebook or direct file link)"
                            onChange={(e) => onChange(block.id, { data: { ...block.data, videoUrl: e.target.value } })} />
                        <input type="text" className="video-file-input" value={block.data.caption || ""}
                            placeholder="Caption(optional)"
                            onChange={(e) => onChange(block.id, { data: { ...block.data, caption: e.target.value } })} />
                        <div className="d-flex gap-2 align-items-center">
                            <input type="checkbox" id="autoplay-video-checkbox" checked={block.data.autoplay || false}
                                onChange={(e) => onChange(block.id, {
                                    data: { ...block.data, autoplay: e.target.checked, },
                                })
                                }
                            />
                            <label htmlFor="autoplay-video-checkbox" style={{ fontSize: '14px', fontWeight: '600' }}>Autoplay Video</label>
                        </div>
                    </div>
                </div>
                <div className="block-delete">
                    <button
                        className="delete-block-btn"
                        onClick={() => onDelete(block.id)}
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </>
    )
}