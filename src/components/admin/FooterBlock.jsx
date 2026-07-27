import { FiTrash2 } from "react-icons/fi";
import TextEditor from './TextEditor'
export default function FooterBlock({ footer, onDelete, onChange}) {
  return (
    <div className="border-t-2 border-dashed border-gray-300 mt-3">
    <div className="!px-6 !py-4 rounded-lg border border-[hsl(214.3,31.8%,91.4%)] mt-3 ">
      <div className="flex items-center justify-between">
        <p className="m-0 text-sm font-semibold text-[hsl(215,16%,47%)]">
          Post footer (appears at end of post, outside sections)
        </p>
          <button
            className="cursor-pointer"
            onClick={onDelete}
          >
            <FiTrash2 className="w-4 h-4 text-red-500"/>
          </button>
      </div>
          <div className="mt-4">
           <TextEditor  content={footer.content}
    onChange={(value) =>
      onChange({content: value})
    }
    height="150px"
    />
          </div>
    </div>
    </div>
  );
}