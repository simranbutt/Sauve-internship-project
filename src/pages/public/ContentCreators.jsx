import './ContentCreators.css';
import authorCardBg from '../../assets/author-card-bg-template.png';
import creator2 from '../../assets/198-abdul-ghaffar.png';
import creator3 from '../../assets/164-abdul-karim.png';
import creator4 from '../../assets/706-Tanveer-Ahmed.webp';
import creator5 from '../../assets/asif-riaz.png';
import Masonry from 'react-masonry-css'
import { useState } from 'react';
const creators = [
  {
    id: 1,
    name: 'Aamir Bajoi',
    image: null,
    bio: 'Bio coming soon.',
    posts: 2,
  },
  {
    id: 2,
    name: 'Zbdul Ghaffar',
    image: creator2,
    bio: 'Bio coming soon.',
    posts: 1,
  },
  {
    id: 3,
    name: 'Abdul Karim',
    image: creator3,
    bio: 'Abdul Karim is from Quetta. He is a multimedia journalist. He holds a Master’s degree in Mass Communication from the University of Balochistan. He has been associated with journalism for the past eight years.',
    posts: 0,
  },
  {
    id: 4,
    name: 'Tanveer Ahmed',
    image: creator4,
    bio: 'Tanveer Ahmed is a documentary filmmaker and investigative journalist. He reports on topics such as urban and civic issues, minority rights, the environment, and governance. He holds a master’s degree in Urdu literature and journalism from MAO College.',
    posts: 6,
  },
  {
    id: 5,
    name: 'Dsif Riaz',
    image: creator5,
    bio: 'Muhammad Asif Riaz is a reporter and his work focuses on the agricultural sector and related issues and problems.',
    posts: 5,
  },
];

function CreatorCard({ name, image, bio, posts }) {
  return (
    <div className="creator-card">
      <div className="card-top">
        <span className="posts-badge">
          {posts} {posts === 1 ? 'post' : 'posts'}
        </span>

        <img
          src={authorCardBg}
          alt=""
          className="card-bg"
        />

        <div className="card-overlay">
          <div className="creator-info">
            <h3 className="creator-name">{name}</h3>
          </div>

          <div className="creator-image-box">
            {image && (
              <img
                src={image}
                alt={name}
                className="creator-image"
                style={{ transform: 'translateY(6px)' , height:'100px', width:'100px'}}
              />
            )}
          </div>
        </div>
      </div>

      <div className="card-bottom">
        <p style={{ margin: '0px' }}>{bio}</p>
      </div>
    </div>
  );
}

export default function ContentCreators() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");

 const filteredCreators = creators.filter((creator) =>
  creator.name.toLowerCase().includes(searchTerm.toLowerCase()));
 const sortedCreators =filteredCreators.map(creator=>({...creator}));
 if(sortOrder==='az'){
    sortedCreators.sort((a,b)=>a.name.localeCompare(b.name));
 }
const breakpoints={
  default:2,
  700:1
}

  return (
    // <div className="col-6">
      <div className="content-creator-container">
        <div className="content-creator-head">
          <h2 style={{ fontWeight: '700', fontSize: '18px' }}>
            List of our content creators
          </h2>

          <div className="search-creator-container">
            <input
              type="search"
              id="search-creator"
              name="search-creator"
              placeholder="Search content creator"
              value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="find-creator-btn">Find</button>
          </div>

          <div
            className="sort-radio d-flex gap-5"
            style={{ marginTop: '16px' }}
          >
            <label
              htmlFor="creators-sort"
              className="d-flex gap-2 sort-creators"
            >
              <input type="radio" name="creators-sort" id="creators-sort" checked={sortOrder === "az"} onChange={() => setSortOrder("az")}
/>
              <span>A to Z</span>
            </label>

            <label
              htmlFor="creators-popular"
              className="d-flex gap-2 sort-creators"
            >
              <input type="radio" name="creators-sort" id="creators-popular" />
              <span>Most popular</span>
            </label>
          </div>
              
         
             <Masonry
  breakpointCols={breakpoints}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {sortedCreators.length>0 ?(  
                sortedCreators.map((creator) => (
                      <CreatorCard
                key={creator.id}
                name={creator.name}
                image={creator.image}
                bio={creator.bio}
                posts={creator.posts}
              />
            ))):(
                <p style={{color:' rgb(75 85 99)', padding:'48px 0px', marginTop:'24px'}}>No creators found</p>
            )
            }
</Masonry>

          
           
       
        </div>
      </div>
    // </div>
  );
}