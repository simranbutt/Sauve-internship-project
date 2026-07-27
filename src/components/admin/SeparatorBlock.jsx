import { RiDraggable } from "react-icons/ri";
import { FiTrash2, FiChevronDown, FiCheck } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import './SeparatorBlock.css';

// 1. Defined outside to keep React hooks and rendering stable
const SeparatorDropdown = ({ options, value, onChange, icon = null }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
            <button
                type="button"
                className="filter-button"
                onClick={() => setOpen(!open)}
            >
                <span className="filter-label">{value}</span>
                <FiChevronDown />
            </button>

            {open && (
                <div className="filter-menu">
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={`filter-item ${value === option ? "active" : ""}`}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                        >
                            <span className="check-icon">
                                {value === option && <FiCheck />}
                            </span>
                            <span>{option}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function SeparatorBlock({ block, onDelete, onChange }) {
    const separatorOptions = ["Simple Line", "Dashed line", "Dots", "Stars"];

    return (
        <div className='separator-block'>
            <div className="block-handle">
                <RiDraggable />
                <span style={{ fontSize: '12px' }}>separator</span>
            </div>

            <div className='separator-block-content'>
                <div className="d-flex flex-column gap-2">
                    {/* 2. Fixed syntax and added e.target.value */}
                    <input
                        type='text'
                        placeholder="Section Title(Optional)"
                     value={block.data.title || ""}
                        onChange={(e) => onChange(block.id, { data:{...block.data,title: e.target.value} })}
                    />

                    <SeparatorDropdown
                       value={block.data.separator || "Simple Line"}
                        options={separatorOptions}
                        onChange={(selected) => {
                            onChange(block.id, { data:{...block.data,separator: selected }})
                        }}
                    />

                    <div className="separator-preview">

                        {block.data.title && (
                            <span className="preview-title">
                                {block.data.title}
                            </span>
                        )}

                        {block.data.separator === "Simple Line" && (
                            <div className="preview-line"></div>
                        )}

                        {block.data.separator === "Dashed line" && (
                            <div className="preview-dashed-line"></div>
                        )}

                        {block.data.separator === "Dots" && (
                            <span className="preview-dots">
                                •••
                            </span>
                        )}

                        {block.data.separator === "Stars" && (
                            <span className="preview-stars">
                                ★★★
                            </span>
                        )}

                    </div>
                </div>
            </div>

            <div className="block-delete">
                <button
                    type="button"
                    className="delete-block-btn"
                    onClick={() => onDelete(block.id)}
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}