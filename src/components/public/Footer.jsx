import { MdKeyboardArrowUp } from "react-icons/md";
import './footer.css'

export function Footer(){
    function scrollToTop(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
            <div className="col-4">
                <div className="about">
                     <h5 className='three'>About Lok Sujag</h5>
                <p className='para'>Lok Sujag is a platform for independent journalism and community-driven news. 
                    We bring you the latest stories from across Pakistan and beyond.</p>
                </div>
               
            </div>
             <div className="col-4">
                 <h5 className='three'>Quick Links</h5>
                 <div className='alltags'>
                    <button className="all">All Hashtags</button>
                     <button className="all">All Geotags</button>
                      <button className="all">All News</button>
                   
                 </div>
            </div>
             <div className="col-4 ">
                <div className="contacts">
                     <h5 className='three'>Contact</h5>
                <p className='para'>For inquiries, please contact us through our official channels. We value your feedback and suggestions.</p>
                </div>
               
            </div>

        </div>
          <hr className='divider'/>
            <div className='copy'>
                © 2026 Lok Sujag. All rights reserved.
                <button onClick={scrollToTop}> <MdKeyboardArrowUp size={50}/></button>
            </div>
            </div>
        
</footer>
    )
}
export default Footer;