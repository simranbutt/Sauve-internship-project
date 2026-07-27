import './TextBlock.css'
import { FiTrash2 } from "react-icons/fi";
import { RiDraggable } from "react-icons/ri";
import TextEditor from './TextEditor';
export default function TextBlock({  block,
  onDelete,
  onChange,}) {
    return (
      <div className="text-block">

    <div className="block-handle">

        <RiDraggable />

        <span>text</span>

    </div>

    <div className="block-editor">

<TextEditor
  content={block.data.content || ""}
  onChange={(value) =>
    onChange(block.id, {
      data: {
        content: value,
      },
    })
  }
/>

    </div>

    <div className="block-delete">

       <button className="delete-block-btn"  onClick={() => onDelete(block.id)}><FiTrash2 /></button> 

    </div>

</div>
    );
}