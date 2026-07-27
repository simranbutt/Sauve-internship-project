import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import './Article.css'
export function Article({ text, sections, footer }) {
  const [expanded, setExpanded] = useState(false);
  const [openId, setOpenId] = useState(null);

  const toggleMain = () => {
    setExpanded(!expanded);
    setOpenId(null);
  };

  const toggleSection = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <div
        className={`article-text ${expanded ? "expanded" : "collapsed"}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <button onClick={toggleMain} className="see-btn">
        {expanded ? "See Less" : "See More"}
      </button>
      {expanded && (
        <>
          {sections.map((item) => (
            <div key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <button onClick={() => toggleSection(item.id)} className="handle-btn">
                <span>{item.title}</span>
                <span>
                  {openId === item.id ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
                </span>
              </button>

              {openId === item.id && (
                <div className="section-content">

                  {item.blocks.map(block => {

                    if (block.type === "text") {
                      return (
                        <div
                          key={block.id}
                          dangerouslySetInnerHTML={{
                            __html: block.data.content
                          }}
                        />
                      );
                    }

                    if (block.type === "media") {
                      return (
                        <img
                          key={block.id}
                          src={block.data.preview}
                          alt=""
                          className="article-image"
                        />
                      );
                    }
                    if (block.type === "video") {
                      return (
                        <video
                          key={block.id}
                          controls
                          className="article-video"
                        >
                          <source
                            src={block.data.preview}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      );
                    }

                    return null;

                  })}

                </div>
              )}
            </div>
          ))}
          {footer && (
            <div
              className="date-line"
              dangerouslySetInnerHTML={{
                __html: footer
              }}
            />
          )}
        </>
      )}

    </>
  );
}
export default Article;
