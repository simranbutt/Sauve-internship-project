import feature from '../../assets/feature.jpeg';
import Article from "../../components/public/Article";
import Rating from '../../components/public/Rating'
import bookmark from '../../assets/bookmark.png';
import shareicon from '../../assets/shareicon.png';
import './Home.css'
import { FaFacebookF } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { SlSocialLinkedin } from "react-icons/sl";
import { FiTwitter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import AuthModal from '../../components/public/AuthModal';

import supabase from "../../config/supabaseClient";//---------------------------------------Share button drop down function-------------------------------------------

export function ShareDropDown() {


    return (

        <div className="share-dropdown">
            <ul style={{ paddingLeft: '10px', marginBottom: '8px' }}>
                <li><a className="dropdown-item dd-item" href="#"><FaFacebookF style={{ color: 'blue' }} />Share on Facebook</a></li>
                <li><a className="dropdown-item dd-item" href="#"><FiTwitter style={{ color: 'aqua' }} />Share on Twitter</a></li>
                <li><a className="dropdown-item dd-item" href="#"><SlSocialLinkedin style={{ color: 'blue' }} />Share on Linkedin</a></li>
                <li><a className="dropdown-item dd-item" href="#"><FaWhatsapp style={{ color: 'green' }} />Share on Whatsapp</a></li>
                <li><a className="dropdown-item dd-item" href="#"><IoLinkOutline />Copy Link</a></li>
            </ul>
        </div>

    )

}
//---------------------------------------END Share button drop down function-------------------------------------------

export function Home() {
    const [posts, setPosts] = useState([]);
    const [DropDown, setDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropDown = () => {
        setDropDown(!DropDown)
    }
    useEffect(() => {

        const fetchPosts = async () => {

            const { data, error } = await supabase
                .from("postTable")
                .select("*")
                .eq("status", "published")
                .order("created_at", { ascending: false });

            if (error) {
                console.log(error);
                return;
            }

            const { data: blocks, error: blocksError } = await supabase
                .from("postBlockTable")
                .select("*")
                .in(
                    "post_id",
                    data.map(post => post.id)
                )
                .order("block_order", { ascending: true });

            if (blocksError) {
                console.log(blocksError);
                return;
            }
            const formattedBlocks = blocks.map(block => {

                const blockData = { ...block.data };

                if (block.block_type === "media" && blockData.imagePath) {

                    const { data } = supabase.storage
                        .from("post_images")
                        .getPublicUrl(blockData.imagePath);

                    blockData.preview = data.publicUrl;
                }

                if (block.block_type === "video" && blockData.videoPath) {

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

            const postsWithBlocks = data.map(post => ({
                ...post,
                blocks: formattedBlocks.filter(
                    block => block.post_id === post.id
                )
            }));

            setPosts(postsWithBlocks);
        };

        fetchPosts();

    }, []);
    useEffect(() => {
        const handleClick = (event) => {
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
                return;
            }
            setDropDown(false);
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    return (
        // <div className="col-6">
        <>
            {posts.map(post => {
                const openingBlock = post.blocks.find(
                    block => block.block_order === 1
                );

                const heroImage = post.blocks.find(
                    block =>
                        block.block_order === 2 &&
                        block.type === "media"
                );

                const remainingBlocks = post.blocks.filter(
                    block => block.block_order > 2
                );
                const sections = [];

                let currentSection = null;
                remainingBlocks.forEach(block => {

                    if (block.type === "separator") {

                        currentSection = {
                            id: block.id,
                            title: block.data.title,
                            blocks: []
                        };

                        sections.push(currentSection);

                    } else {

                        if (currentSection) {
                            currentSection.blocks.push(block);
                        }

                    }

                });

                return (
                    <div key={post.id} className="content-container">
                        <div className="top-line">
                            <img src={feature} className="iconn"></img>
                            {/*--------------------------------- post header details------------------------ */}
                            <div className="hr-container">
                                <div className='heading-row'>
                                    <div className='next-to-icon'>
                                        <button className='post-header-button'>Feature</button>
                                        <p> _ </p>
                                        <button className='post-header-button'>Tanveer Ahmed</button>
                                    </div>
                                    <hr />
                                </div>
                                <p className='date'>22 June, 2026</p>
                            </div>
                            {/*---------------------------------end post header details--------------------- */}
                        </div>
                        {heroImage && (
                            <img
                                src={heroImage.data.preview}
                                alt=""
                            />
                        )}
                        <div className='text-container'>
                            <Article
                                text={openingBlock?.data?.content || ""}
                                sections={sections}
                                 footer={post.footer_content}
                            />
                        </div>
                        <hr className="endline" />
                        <div className='end-conatiner'>
                            <div className='rate'>
                                <Rating />
                                <p style={{ fontSize: '14px', color: 'hsl(215.4 16.3% 45.9%)' }}>Be the first to rate</p>
                            </div>
                            <div className='end-icons'>
                                <div className='share-wrapper' ref={dropdownRef}>
                                    <button onClick={toggleDropDown}><img src={shareicon} alt="share" className='icon' style={{ transform: 'translateY(2px)' }} /></button>
                                    {
                                        DropDown && (
                                            <ShareDropDown />
                                        )
                                    }
                                </div>

                                <button onClick={() => setShowModal(true)}><img src={bookmark} alt="bookmark" className='icon' style={{ borderRadius: '50px' }} />
                                </button>
                                {showModal && (
                                    <AuthModal
                                        onClose={() => setShowModal(false)} />
                                )}
                            </div>

                        </div>
                    </div>

                );
            })}
        </>
    )
}

export default Home;
