import './ContentBlock.css'
import TextBlock from "./TextBlock";
import MediaBlock from "./MediaBlock";
import VideoBlock from './VideoBlock';
import RelatedStoryBlock from './RelatedStory';
import SeparatorBlock from './SeparatorBlock';
import FooterBlock from './FooterBlock'
import { useState, useRef, useEffect } from "react";
import {
  FiVideo,
  FiType,
  FiImage
} from "react-icons/fi";
import { LuSeparatorHorizontal } from "react-icons/lu";



export default function ContentBlock({
  blocks,
  setBlocks,
  footer,
  setFooter
}) {
  const lastBlockRef = useRef(null);
  const blockTypes = [
    {
      label: "Text",
      type: "text",
      icon: <FiType />
    },
    {
      label: "Media",
      type: "media",
      icon: <FiImage />
    },
    {
      label: "Video",
      type: "video",
      icon: <FiVideo />
    },
    {
      label: "Related Story",
      type: "relatedStory",
      icon: <FiType />
    },
    {
      label: "Separator",
      type: "separator",
      icon: <LuSeparatorHorizontal />
    },
    {
      label: "Footer Text",
      type: "footerText",
      icon: <FiType />
    }
  ];


  useEffect(() => {
    if (blocks.length > 0) {
      lastBlockRef.current?.scrollIntoView({ //  lastBlockRef.current?.scrollIntoView is equivalent to if (lastBlockRef.current) { lastBlockRef.current.scrollIntoView();}
        behavior: "smooth",
        block: "start",
      });
    }
  }, [blocks]);

  const addBlock = (type) => {

    if (type === "footerText") {

      setFooter({
        id: crypto.randomUUID(),
        type: "footerText",
        content: ""
      });

      return;
    }
    const newBlock = {
      id: Date.now(),
      type: type,
      data:{}
    };

    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };


  const updateBlock = (id, changes) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === id
          ? {
            ...block,
            ...changes,
          }
          : block
      )
    );
  };

  const updateFooter = (changes) => {
  setFooter(prev => ({
    ...prev,
    ...changes,
  }));
};

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const removeFooter =(footer)=>{
    setFooter(null)
  }

//return body of contentblock
  return (
    <>
      <div className="content-block-head-btns-container">
        {blockTypes.map((block, index) => (
          <button
            key={block.type}
            className={`content-block-head-btn ${block.type === "footerText" && footer
                ? "opacity-50 cursor-not-allowed"
                : ""
              }`}
            onClick={() => addBlock(block.type)}
            disabled={block.type === "footerText" && !!footer}

          >
            {block.icon}
            {block.label}
          </button>
        ))}
      </div>

      {blocks.map((block, index) => {

        let component = null;

        switch (block.type) {

          case "text":
            component = (
              <TextBlock
                block={block}
                onDelete={removeBlock}
                onChange={updateBlock}
              />
            );
            break;

          case "media":
            component = (
              <MediaBlock
                block={block}
                onDelete={removeBlock}
                onChange={updateBlock}
              />
            );
            break;

          case "video":
            component = (
              <VideoBlock
                block={block}
                onDelete={removeBlock}
                onChange={updateBlock}
              />
            );
            break;

          case "relatedStory":
            component = (
              <RelatedStoryBlock
                block={block}
                onDelete={removeBlock}
                onChange={updateBlock}
              />
            );
            break;

          case "separator":
            component = (
              <SeparatorBlock
                block={block}
                onDelete={removeBlock}
                onChange={updateBlock}
              />
            );
            break;
            return null;
        }

        return (
          <>
            <div
              key={block.id}
              ref={index === blocks.length - 1 ? lastBlockRef : null}
            >
              {component}
            </div>
          </>
        );
        
      })}
           {footer && (
              <FooterBlock
                footer={footer}
                onChange={updateFooter}
                onDelete={removeFooter}
              />
            )}



    </>

  )

}