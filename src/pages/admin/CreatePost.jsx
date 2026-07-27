import './CreatePost.css'
import supabase from "../../config/supabaseClient";
import {
    FiFile,
    FiEye,
    FiSend,
    FiUsers,
    FiHash,
    FiMapPin,
    FiGlobe
} from "react-icons/fi";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
//import components
import PostContentCard from '../../components/admin/PostContentCard';
import ContentBlock from '../../components/admin/ContentBlock';
import { toast } from "react-toastify";
//main component
export default function CreatePost() {
    const [blocks, setBlocks] = useState([]); //[] means its an array
    const [footer, setFooter] = useState(null);
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [postMetaData, setPostMetaData] = useState({
        metaTitle: "",
        slug: "",
        metaDescription: "",
    });
    console.log(postMetaData);


    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {

            const { data, error } = await supabase
                .from("postTable")
                .select("*")
                .eq("id", id)
                .single();


            if (error) {
                console.log(error);
                return;
            }


            setPostMetaData({
                metaTitle: data.meta_title,
                slug: data.slug,
                metaDescription: data.meta_description
            });


            const { data: blocksData, error: blocksError } = await supabase
                .from("postBlockTable")
                .select("*")
                .eq("post_id", id)
                .order("block_order", { ascending: true });


            if (blocksError) {
                console.log(blocksError);
                return;
            }


            const formattedBlocks = blocksData.map(block => {

                const blockData = { ...block.data };

                if (block.type === "media" && blockData.imagePath) {

                    const { data } = supabase.storage
                        .from("post_images")
                        .getPublicUrl(blockData.imagePath);

                    blockData.preview = data.publicUrl;
                }

                if (block.type === "video" && blockData.videoPath) {

                    const { data } = supabase.storage
                        .from("post_videos")
                        .getPublicUrl(blockData.videoPath);

                    blockData.preview = data.publicUrl;
                }

                return {
                    ...block,
                    data: blockData
                };
            });

            setBlocks(formattedBlocks);

        };

        fetchPost();

    }, [id]);


    const createPost = async (status) => {

        const { data: post, error } = await supabase
            .from("postTable")
            .insert({
                meta_title: postMetaData.metaTitle,
                slug: postMetaData.slug,
                meta_description: postMetaData.metaDescription,
                footer_content: footer?.content || null,
                status
            })
            .select()
            .single();


        if (error) throw error;


        await saveBlocks(post.id);


        toast.success("Post created successfully!");

    };

    const updatePost = async (status) => {

        const { error } = await supabase
            .from("postTable")
            .update({
                meta_title: postMetaData.metaTitle,
                slug: postMetaData.slug,
                meta_description: postMetaData.metaDescription,
                footer_content: footer?.content || null,
                status
            })
            .eq("id", id);


        if (error) throw error;


        await saveBlocks(id,true);
        toast.success("Post updated successfully!");

    };
const saveBlocks = async (postId, replaceExisting = false) => {

    // Delete existing blocks only when editing
    if (replaceExisting) {

        const { error: deleteError } = await supabase
            .from("postBlockTable")
            .delete()
            .eq("post_id", postId);

        if (deleteError) throw deleteError;
    }

    for (const [index, block] of blocks.entries()) {

        let blockData = { ...block.data };

        // Upload new file only if one has been selected
        if (blockData.file) {

            const fileName = `${Date.now()}-${blockData.file.name}`;

            const bucket =
                block.type === "video"
                    ? "post_videos"
                    : "post_images";

            const { data: uploadData, error } = await supabase.storage
                .from(bucket)
                .upload(fileName, blockData.file);

            if (error) throw error;

            // Remove temporary React-only properties
            delete blockData.file;
            delete blockData.preview;

            if (block.type === "video") {
                blockData.videoPath = uploadData.path;
            } else {
                blockData.imagePath = uploadData.path;
            }
        }

        const { error } = await supabase
            .from("postBlockTable")
            .insert({
                post_id: postId,
                type: block.type,
                block_order: index + 1,
                data: blockData,
            });

        if (error) throw error;
    }
};


const handleSave = async (status) => {

    try {

        if (isEditMode) {
            await updatePost(status);
        } else {
            await createPost(status);
        }

    } catch (error) {

        console.error(error);

        if (error.code === "23505") {
            toast.error("A post with this slug already exists.");
            return;
        }

        toast.error("Failed to save post.");
    }

};

    return (
        <>
            <div className="create-post-page">

                <div className="create-post-header">

                    <div className='d-flex align-items-center gap-3'>
                        <h2 style={{ color: 'hsl(220 90% 56%)', fontWeight: '700', fontSize: '24px' }}>Create Post</h2>
                        <div className='d-flex align-items-center gap-3'>
                            <button className='create-post-language-btn'>English</button>
                            <button className='create-post-language-btn'>اردو</button>
                        </div>
                    </div>
                    <div className='d-flex gap-2'>
                        <button className='create-post-header-btn'>Cancel</button>
                        <button className='create-post-header-btn'><FiEye />Preview</button>
                        <button className='create-post-header-btn' onClick={() => handleSave("draft")}><FiFile />Save draft</button>
                        <button className='create-post-header-btn publish-btn' onClick={() => handleSave("published")}><FiSend />Publish</button>
                    </div>

                </div>

                <div className="create-post-grid">

                    <div className="left-column">

                        <div className="create-card">
                            <h3 className='create-card-head'>Post Content</h3>
                            <PostContentCard postMetaData={postMetaData}
                                setPostMetaData={setPostMetaData} />
                        </div>

                        <div className="create-card">
                            <h3 className='create-card-head'>Content Blocks</h3>
                            <ContentBlock
                                blocks={blocks} setBlocks={setBlocks} footer={footer}
                                setFooter={setFooter} />
                        </div>

                    </div>

                    <div className="right-column">
                        <div className="create-card">
                            <h3 className='create-card-head'><FiSend />Publishing</h3>
                        </div>

                        <div className="create-card">
                            <h3 className='create-card-head'>Classification</h3>
                        </div>

                        <div className="create-card">
                            <h3 className='create-card-head'><FiMapPin />Geo Tags</h3>
                        </div>

                        <div className="create-card">
                            <h3 className='create-card-head'><FiHash />Hashtags</h3>
                        </div>

                        <div className="create-card">
                            <h3 className='create-card-head'><FiUsers />Creators</h3>
                        </div>

                        <div className="create-card">
                            <h3 className='create-card-head'><FiGlobe />Translation Link</h3>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )

}