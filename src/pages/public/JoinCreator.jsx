import './JoinCreator.css'
import { useState,useRef } from 'react';
import attachImg from '../../assets/attach-icon.jpeg'

export function JoinCreator() {
    const [selectedFile, setSelectedFile] = useState("")
    const fileInputRef=useRef(null)
    return (
        <>
            {/* <div className="col-6"> */}
                <div className='join-creator-container'>
                    <div className="join-creator-container-head">
                        <h3 style={{ fontWeight: '700' }}>Join us as a creator</h3>
                    </div>
                    <div className="join-creator-container-body">
                        <p style={{ fontWeight: '600' }}>Join us as a creator</p>
                        <p>Lok Sujag has two levels of content creators - staff members and freelance contributors.</p>
                        <p>When a staff post falls vacant or is created, we announce it here and fill it through a process.</p>
                        <p>We also have an internship program under which we take in a batch of four to six fresh graduates as trainee journalists every year. This program is mostly announced here in August.</p>
                        <p>This page is solely about how you can contribute content for Lok Sujag as a freelance journalist. If you are interested, please, go through the following points carefully and then fill the form at the bottom of this page.</p>
                        <p style={{ fontWeight: '600' }}>Freelance work does not mean free work</p>
                        <p>Lok Sujag pays every contributor - feature writers, videographers, voice artists, short multimedia post creators all included.</p>
                        <p>The amount of payment depends on level of effort invested in creation of content which is assessed by the regional coordinators and the editorial staff working with the freelance contributors.</p>
                        <p style={{ fontWeight: '600' }}>We do not re-publish</p>
                        <p>If a contributor sends us something that he/she has already shared with or got published at another platform, we will not publish it. We may also mark the contributor as ‘unethical’ and stop accepting content from him/her.</p>
                        <p>However, Lok Sujag can consider publishing a content, if the contributor informs us in advance that he/she has got a variant of it published at another platform and convinces us that the one submitted to Lok Sujag covers a different aspect of the same issue. The editorial team will decide whether or not to commission/publish such content.</p>
                        <p style={{ fontWeight: '600' }}>It’s a multimedia, multilingual platform</p>
                        <p>Digital content means you shall not limit yourself to words or visuals alone. You better know how to play with both as the most effective content mixes them in a creative way.</p>
                        <p>So a contributor shall have both writing and camera skills. For our daily content, it is simply not practical for us to accept written content from one contributor and then hire someone else to produce associated pictures or video clips.</p>
                        <p>We publish content in English and Urdu. You can submit content in any of the two and we will decide if it has to be translated in the other too.</p>
                        <p style={{ fontWeight: '600' }}>Editorial processes require passion and patience</p>
                        <p>Sharing a content idea or submitting draft content does not guarantee its publication. It goes through a rigorous and tedious editorial process. The contributor shall have both passion and patience.</p>
                        <p>This means the editorial staff may revert to the contributor time and again for confirming or re-confirming some facts, for finding and adding some missing information, or for supplementing content with some pictures or video clips etc. The editorial may also hold the content for publishing at a later date, they consider appropriate.</p>
                        <p>The content may be dropped/killed at any stage, if it fails to meet certain standards. In some cases, the editorial team may decide to pay the contributor a ‘kill fee’ for the content that was commissioned, worked on but killed for no fault of the contributor.</p>
                        <p style={{ fontWeight: '600' }}>We do not publish views based content</p>
                        <p>We do not publish content like opinion columns, blogs, vlogs etc. It is not that we do not value such views based content but it is a matter of choice. Lok Sujag cannot do everything that falls within the ambit of a media platform so we have chosen what to do and what to avoid in order to get the best value out of the human and other resources that we have.</p>
                        <p>We anyways believe there is no dearth of spaces that are dedicated to publishing views – from micro-blogging social media platforms to vlogging on Youtube to personal websites. In fact, many may concur that the new media landscape is inundated with views. So we keep ourselves out.</p>
                        <p style={{ fontWeight: '600' }}>We stay away from breaking news</p>
                        <p>Our motto is ‘Voices from the margins of power’. So when a minister holds a press conference announcing some policies that impact people, we focus on that impact and not on what the minister had said. We will not cover the presser as an event and instead investigate the announced policy’s impact on people and develop content on that.</p>
                        <p>Here again, we do not belittle the news value of the event of press conference but our approach is determined by the fact that it is already being covered by scores, if not hundreds, of platforms so we better focus on what is not drawing the due attention.</p>
                        <p style={{ fontWeight: '600' }}>What topics do we cover?</p>
                        <p>We carry no list of topics that we shall or shall not cover but we generally avoid focusing on what is already being covered by others. In fact, we define our work as the one that is intentionally or unintentionally not done or is overlooked by the mainstream media.</p>
                        <p>We focus on any news worthy topics from ignored geographic areas, voiceless or silenced communities and not-so-popular and unconventional ideas.</p>
                        <p>So if you are interested in pitching something, look for what is not being covered by the mainstream media?</p>
                        <p style={{ fontWeight: '600' }}>We have a Code of Conduct</p>
                        <p>Importantly, we have a Code of Conduct and you must go through it before engaging with us. Here it is.</p>
                        <p>If you want to work with Lok Sujag as a freelance contributor and agree with above points and our Code of Conduct, please, fill in the following and hit submit.</p>
                        <p>We will take it forward from here.</p>
                    </div>
                    <div className='form-container'>
                        <form className='join-creator-form'>
                            <div className='form-head'>
                                <h3>Join us as a creator</h3>
                            </div>
                            <div className='form-input'>
                                <label htmlFor="fullname" className='form-label'>Full name</label>
                                <input type="text" id="fullname" name="fullname" />
                            </div>

                            <div className='form-input'>
                                <label htmlFor="phone" className='form-label'>Your phone/Whatsapp</label>
                                <input type="tel" id="phone" name="phone" />
                            </div>
                            <div className='form-input'>
                                <label htmlFor="email" className='form-label'>Your email</label>
                                <input type="email" id="email" name="email" />
                            </div>

                            <div className='form-input'>
                                <label htmlFor="postal" className='form-label'>Your postal address</label>
                                <input type="text" id="postal" name="postal" />
                            </div>

                            <div className='form-input' style={{ border: '1px dashed hsl(214.3 31.8% 91.4%)', padding: '8px 12px', borderRadius: '6px', backgroundColor: 'hsl(210, 29%, 97%)' }}>
                                <p style={{ fontSize: '14px', margin: '0px' }}>Subject: Application for freelance journalist</p>
                            </div>
                            <div className='form-input'>
                                <label htmlFor='note' className='form-label'>Note</label>
                                <textarea className='note-textarea'></textarea>
                            </div>
                            <div className='form-input'>
                                <div className='attach-cv-form-input '>
                                    <label htmlFor="cv" className='form-label' style={{ margin: '0px' }} >Attach CV</label>
                                    <input type='file' id="cv" name='cv' style={{ display: 'none' }} ref={fileInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setSelectedFile(file.name);
                                            }
                                            else {
                                                setSelectedFile("");
                                            }
                                        }} />
                                    <label htmlFor="cv" className="custom-file-upload">
                                        <img className='attach-img' src={attachImg} style={{ height: '32px', width: '32px', borderRadius: '30%', cursor: 'pointer' }} />
                                    </label>
                                </div>
                                <span style={{ fontSize: '14px', color: 'hsl(215.4 16.3% 46.9%)', marginTop: '16px' }}>{selectedFile}</span>
                                {selectedFile && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile("");
                                            fileInputRef.current.value = "";
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className='form-input'>
                                <label htmlFor='checkterms' className='form-label'>I have read all the above points and understand and agree with them</label>
                                <div className='d-flex gap-2'><input type='checkbox' id='checkbox'></input><span style={{ color: 'hsl(215.4 16.3% 46.9%)', fontSize: '14px' }}>Check if applicable</span></div>
                            </div>
                            <button className='submit-form'>Submit</button>
                        </form>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}
export default JoinCreator;