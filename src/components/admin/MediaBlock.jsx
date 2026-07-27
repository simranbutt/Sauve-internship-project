import "./MediaBlock.css";
import { RiDraggable } from "react-icons/ri";
import { FiTrash2, FiImage } from "react-icons/fi";
import { useRef } from "react";

export default function MediaBlock({
    block,
    onDelete,
    onChange
}) {
    const fileInputRef = useRef(null);

    const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

onChange(block.id,{data: { file,preview}})

};
    return (
        <div className="media-block">

            <div className="block-handle">
                <RiDraggable />
                <span>Media</span>
            </div>

            <div className="media-content">
                {block.data.preview ? (

                    <img
                        src={block.data.preview}
                        alt=""
                        className="media-preview"
                    />

                ) : (

                    <div className="media-upload-box">
                       

                        <h5>Upload Image</h5>

                        <p>
                            Drag & drop an image here or click the button below.
                        </p>

                        <button
                            type="button"
                            className="upload-btn"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Choose Image
                        </button>

                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </div>

                )}


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
     
    )
}