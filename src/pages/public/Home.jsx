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

import supabase from "../../config/supabaseClient";
const sections = [
    {
        id: 1, title: "Untouchable Treatment", content: `A connecting road, MM Road, stretches from Mianwali towards Muzaffargarh, ten km from Kundian in the west. The city is located four km away from here, and towards the east, it marks the beginning of the old forest area known as Kundian Plantation. This junction on the road is referred to as Kundian Mor.
Out of the 20,000 acres of land owned by the Forest Department here, the Punjab government had decided to construct a park on 50 acres. According to PC-1, the estimated cost for the park’s construction was approximately 235.5 million rupees. However, only 176.4 million rupees were allocated for it.
In the park, grass segments will be laid out on ten acres of land. Twenty acres will be dedicated to trees and plants, while one acre is allocated for planting roses and jasmine flowers. Furthermore, establishing a botanical garden on ten acres is also part of this project, which will benefit the general public and botanical students.` },
    {
        id: 2, title: "Workplace Segregation", content: `A connecting road, MM Road, stretches from Mianwali towards Muzaffargarh, ten km from Kundian in the west. The city is located four km away from here, and towards the east, it marks the beginning of the old forest area known as Kundian Plantation. This junction on the road is referred to as Kundian Mor.

Out of the 20,000 acres of land owned by the Forest Department here, the Punjab government had decided to construct a park on 50 acres. According to PC-1, the estimated cost for the park’s construction was approximately 235.5 million rupees. However, only 176.4 million rupees were allocated for it.

In the park, grass segments will be laid out on ten acres of land. Twenty acres will be dedicated to trees and plants, while one acre is allocated for planting roses and jasmine flowers. Furthermore, establishing a botanical garden on ten acres is also part of this project, which will benefit the general public and botanical students.` },
    {
        id: 3, title: "Third Class Citizens", content: `A connecting road, MM Road, stretches from Mianwali towards Muzaffargarh, ten km from Kundian in the west. The city is located four km away from here, and towards the east, it marks the beginning of the old forest area known as Kundian Plantation. This junction on the road is referred to as Kundian Mor.

Out of the 20,000 acres of land owned by the Forest Department here, the Punjab government had decided to construct a park on 50 acres. According to PC-1, the estimated cost for the park’s construction was approximately 235.5 million rupees. However, only 176.4 million rupees were allocated for it.

In the park, grass segments will be laid out on ten acres of land. Twenty acres will be dedicated to trees and plants, while one acre is allocated for planting roses and jasmine flowers. Furthermore, establishing a botanical garden on ten acres is also part of this project, which will benefit the general public and botanical students.` }
];
const text = `Essa Khan, 45, resides in the city of Kundian. He has lived in the city for the past 20 years, about four kilometres (km) from the Kundian Chowk. Essa and his family make a living by crushing sugarcane, extracting juice, and processing sugarcane jaggery (gur) at Kundian Mor. On average, they earn around seven hundred rupees daily through this work, which sustains their household expenses.

His family consists of six individuals, including four children. His location has a planned construction project for a park nearby. A former prime minister laid the foundation stone for this park in 2021, bringing Essa great joy. He was happy due to the anticipation of potential progress in his business as the park visitors would increase the demand for his products, including selling sugarcane jaggery near the park.

However, the park’s construction has not been completed yet, leading to dashed hopes for Essa Khan regarding business growth.

Kundian, a densely populated area with a population of 1.5 million, is the largest urban locality in the district after the city of Mianwali. However, despite its size, there are no recreational facilities available here`;

//---------------------------------------Share button drop down function-------------------------------------------

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
                                <p style={{ fontSize: '14px', color: 'hsl(215.4 16.3% 46.9%)' }}>Be the first to rate</p>
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
