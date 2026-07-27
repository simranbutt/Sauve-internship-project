import { RiDraggable } from "react-icons/ri";
import { FiTrash2, FiImage } from "react-icons/fi";
import './RelatedStory.css'
import { Upload } from "lucide-react";
import { useRef } from "react";
export default function RelatedStoryBlock({ block, onDelete, onChange }) {
    const fileInputRef = useRef(null);

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        onChange(block.id, { ...block.data, data: { file, preview } })

    };
    return (
        <>
            <div className='related-story-block'>
                <div className="block-handle">
                    <RiDraggable />
                    <span style={{ fontSize: '12px' }}>Related Story</span>
                </div>
                <div className='related-story-block-content'>
                    <div className="d-flex flex-column gap-1">
                        <textarea placeholder="Related story content"
                            value={block.data.content || ""}
                            onChange={(e) => onChange(block.id, { data: { ...block.data, content: e.target.value } })} />
                        <div style={{ marginTop: '10px' }}>
                            <span style={{ fontWeight: '600', fontSize: '15px' }}>Upload Related story image</span>
                            {block.data.preview && (
                                <img
                                    src={block.data.preview}
                                    alt=""
                                    className="media-preview"
                                />
                            )}
                            <input
                                type="file"
                                className="video-file-input"
                                accept="image/*"
                                onChange={handleImage}
                            />

                            <input type="url" className="video-file-input" placeholder="Related link url" 
                                onChange={(e) =>onChange(block.id, {data: {  ...block.data, relatedUrl: e.target.value,}})}/>
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