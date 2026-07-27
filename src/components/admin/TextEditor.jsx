import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Undo2,
    Redo2,
    ChevronDown,
    Underline,
    Image,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Highlighter,
    Palette,
    Type,
    Baseline,
    PaintBucket
} from "lucide-react";

import './TextEditor.css'
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExtension from "@tiptap/extension-underline";
export default function TextEditor({
    content,
    onChange,
      height = "250px"
}) {

    const textColors = [
        "#000000",
        "#374151",
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#ffffff",
    ];
    const highlightColors = [
      "#FEF08A", // Yellow-200
    "#f9a0a0", // Red-200
    "#BBF7D0", // Green-200
    "#BFDBFE", // Blue-200
    "#DDD6FE", // Purple-200
    "#FBCFE8", // Pink-200
    
    // Four new matching colors:
    "#fac990", // Orange-200
    "#90cd84", // Amber-200
    "#D9F99D", // Lime-200
    "#A5F3FC", // Cyan-200
    ];

    const editor = useEditor({  //const editor = useEditor({...}); creates a TitpTap editor instance
        extensions: [
            StarterKit,
            TextStyle,
            UnderlineExtension,
            Color,
            Highlight.configure({
                multicolor: true,
            }),

            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
            onChange(editor.getHTML());
        },
    });
    if (!editor) return null;

    const [openHeadingMenu, setOpenHeadingMenu] = useState(false);
    const [showTextColors, setShowTextColors] = useState(false);
    const [showHighlightColors, setShowHighlightColors] = useState(false);
    const dropdownRef = useRef(null);
    const textDropdownRef = useRef(null);
    const highlightDropdownRef = useRef(null);
    const textColorRef = useRef(null);
    const highlightRef = useRef(null);
  
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenHeadingMenu(false);
            }
             if (
            textDropdownRef.current &&
            !textDropdownRef.current.contains(event.target)
        ) {
            setShowTextColors(false);
        }

        if (
            highlightDropdownRef.current &&
            !highlightDropdownRef.current.contains(event.target)
        ) {
            setShowHighlightColors(false);
        }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const headingOptions = [
        {
            label: "Normal",
            action: () =>
                editor.chain().focus().setParagraph().run(),
            active: editor.isActive("paragraph"),
        },
        {
            label: "Heading 1",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: editor.isActive("heading", { level: 1 }),
        },
        {
            label: "Heading 2",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: editor.isActive("heading", { level: 2 }),
        },
        {
            label: "Heading 3",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            active: editor.isActive("heading", { level: 3 }),
        },
        {
            label: "Heading 4",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 4 }).run(),
            active: editor.isActive("heading", { level: 4 }),
        },
        {
            label: "Heading 5",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 5 }).run(),
            active: editor.isActive("heading", { level: 5 }),
        },
        {
            label: "Heading 6",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 6 }).run(),
            active: editor.isActive("heading", { level: 6 }),
        },
    ];


    const getCurrentHeading = () => {
        if (editor.isActive("heading", { level: 1 }))
            return "Heading 1";

        if (editor.isActive("heading", { level: 2 }))
            return "Heading 2";

        if (editor.isActive("heading", { level: 3 }))
            return "Heading 3";

        if (editor.isActive("heading", { level: 4 }))
            return "Heading 4";

        if (editor.isActive("heading", { level: 5 }))
            return "Heading 5";

        if (editor.isActive("heading", { level: 6 }))
            return "Heading 6";

        return "Normal";
    };

    const handleInsertImage = () => {
        alert("Insert image into text editor");
    };
    return (
        <>
            <div className="text-editor-container">
                <div className="editor-toolbar">

                    <div className="heading-dropdown-wrapper " ref={dropdownRef}>

                        <button
                            type="button"
                            className="heading-button"
                            onClick={() =>
                                setOpenHeadingMenu(!openHeadingMenu)
                            }
                        >
                            {getCurrentHeading()} <ChevronDown size={16} />
                        </button>

                        {openHeadingMenu && (
                            <div className="heading-dropdown">

                                {headingOptions.map((option) => (

                                    <button
                                        key={option.label}
                                        className={option.active ? "active" : ""}
                                        onClick={() => {
                                            option.action();
                                            setOpenHeadingMenu(false);
                                        }}
                                    >
                                        {option.label}
                                    </button>

                                ))}

                            </div>
                        )}

                    </div>

                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("bold") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("italic") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        className={`toolbar-btn ${editor.isActive("underline") ? "active" : ""
                            }`}
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    >
                        <Underline size={16} />
                    </button>
                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("bulletList") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("orderedList") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <ListOrdered size={16} />
                    </button>
                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("strike") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <Strikethrough size={16} />
                    </button>
                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("blockquote") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                    >
                        <Quote size={16} />
                    </button>
                    <button
                        type="button"
                        className={`toolbar-btn ${editor.isActive("codeBlock") && "active"}`}
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                        }
                    >
                        {"</>"}
                    </button>
                    <div className="toolbar-dropdown" ref={textDropdownRef}>

                        <button
                            type="button"
                           
                            className="toolbar-btn"
                            onClick={() =>
                                setShowTextColors(!showTextColors)
                                
                            }
                        >
                            <Baseline size={16} />
                        </button>

                        {showTextColors && (

                            <div className="color-dropdown" >

                                {textColors.map(color => (

                                    <button
                                        key={color}
                                        className="color-circle"
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            editor
                                                .chain()
                                                .focus()
                                                .setColor(color)
                                                .run();

                                            setShowTextColors(false);
                                        }}
                                    />

                                ))}

                                <hr />

                                <button
                                    className="custom-color-btn"
                                    onClick={() =>
                                        textColorRef.current.click()
                                    }
                                >
                                    Custom color...
                                </button>

                            </div>

                        )}

                        <input
                            ref={textColorRef}
                            type="color"
                            hidden
                            onChange={(e) => {
                                editor
                                    .chain()
                                    .focus()
                                    .setColor(e.target.value)
                                    .run();
                            }}
                        />

                    </div>
                    <div className="toolbar-dropdown" ref={highlightDropdownRef}>
                        <button
                            type="button"
                            className="toolbar-btn"
                            onClick={() =>
                                setShowHighlightColors(!showHighlightColors)
                            }
                        >
                            <PaintBucket size={16} />
                        </button>

                        {showHighlightColors && (

                            <div className="highlight-color-dropdown" >

                                {highlightColors.map(color => (

                                    <button
                                        key={color}
                                        className="color-circle"
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHighlight({ color })
                                                .run();

                                            setShowHighlightColors(false);
                                        }}
                                    />

                                ))}

                                <hr />

                                <button
                                    className="custom-color-btn"
                                    onClick={() =>
                                        highlightRef.current.click()
                                    }
                                >
                                    Custom color...
                                </button>

                            </div>

                        )}

                        <input
                            ref={highlightRef}
                            type="color"
                            hidden
                            onChange={(e) => {
                                editor
                                    .chain()
                                    .focus()
                                    .setColor(e.target.value)
                                    .run();
                            }}
                        />

                    </div>
                    <button
                        className={`toolbar-btn ${editor.isActive({ textAlign: "left" }) ? "active" : ""
                            }`}
                        onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                        }
                    >
                        <AlignLeft size={16} />
                    </button>

                    <button
                        className={`toolbar-btn ${editor.isActive({ textAlign: "center" }) ? "active" : ""
                            }`}
                        onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                        }
                    >
                        <AlignCenter size={16} />
                    </button>

                    <button
                        className={`toolbar-btn ${editor.isActive({ textAlign: "right" }) ? "active" : ""
                            }`}
                        onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                        }
                    >
                        <AlignRight size={16} />
                    </button>

                    <button
                        className={`toolbar-btn ${editor.isActive({ textAlign: "justify" }) ? "active" : ""
                            }`}
                        onClick={() =>
                            editor.chain().focus().setTextAlign("justify").run()
                        }
                    >
                        <AlignJustify size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setHorizontalRule().run()
                        }
                        className="toolbar-btn"
                    >
                        <span style={{ fontSize: '14px' }}>HR</span>
                    </button>
                    <button
                        className="toolbar-btn"
                        onClick={handleInsertImage}
                    >
                        <Image size={16} />
                    </button>
                    <button
                        className="toolbar-btn"
                        onClick={() =>
                            editor.chain().focus().undo().run()
                        }
                    >
                        <Undo2 size={16} />
                    </button>
                    <button
                        className="toolbar-btn"
                        onClick={() =>
                            editor.chain().focus().redo().run()
                        }
                    >
                        <Redo2 size={16} />
                    </button>
                </div>
                <EditorContent editor={editor}  style={{ minHeight: height }}/>
            </div>

        </>

    );
}