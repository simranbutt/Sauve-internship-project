import "./PostContentCard.css";

export default function PostContentCard({
  postMetaData,
  setPostMetaData,
}) {
  return (
    <>
      <div className="post-content-form-group">

        <div style={{ marginTop: "16px" }}>
          <label
            className="post-content-form-label"
            htmlFor="meta-title"
          >
            Meta title*
          </label>

          <input
            className="post-content-form-input"
            id="meta-title"
            placeholder="Enter Post Meta Title"
            value={postMetaData.metaTitle}
            onChange={(e) =>
              setPostMetaData({
                ...postMetaData,
                metaTitle: e.target.value,
              })
            }
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label
            className="post-content-form-label"
            htmlFor="slug"
          >
            Slug
          </label>

          <input
            className="post-content-form-input"
            id="slug"
            placeholder="Enter slug..."
            value={postMetaData.slug}
            onChange={(e) =>
              setPostMetaData({
                ...postMetaData,
                slug: e.target.value,
              })
            }
          />

          <p
            style={{
              fontSize: "12px",
              color: "hsl(215.4 16.3% 46.9%)",
              marginTop: "4px",
            }}
          >
            Always in English. Auto-generated from Meta Title when writing in
            English. Use the same slug for both versions.
          </p>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label
            className="post-content-form-label"
            htmlFor="description"
          >
            Meta Description*
          </label>

          <textarea
            className="post-content-form-input"
            id="description"
            placeholder="Enter Description"
            value={postMetaData.metaDescription}
            onChange={(e) =>
              setPostMetaData({
                ...postMetaData,
                metaDescription: e.target.value,
              })
            }
          />
        </div>

      </div>
    </>
  );
}