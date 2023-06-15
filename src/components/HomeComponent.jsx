import React,{useState,useEffect,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import API from '../API/api'
import AuthContext from '../context/AuthProvider'

import './CSS/homeComp.css'
import Claps from './Claps'
import latest from '../resourses/icons/latest.jpg'
import newIcon from '../resourses/icons/new.jpg'
import profile from '../resourses/icons/profile.jpg'
import bookmarks from '../resourses/icons/bookmarks.jpg'

import Navbar from './Navbar'
import ErrorComponent from "./ErrorComponent"
import { all } from 'axios';



function HomeComponent() {

    const navigate = useNavigate();

    const [allPosts, setallPosts] = useState([])

    const [errFound,seterrFound  ] = useState('')

    const {auth} = useContext(AuthContext)

    useEffect( () => {
        
        const loadPosts = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    withCredentials:true,
                    authorization: `Bearer ${auth.accessToken}`
                }
                const allPosts = await API.get('/posts',{ headers })

                // no posts found
                if(typeof allPosts.data.data === 'string') console.log('Empty dataset from server');
                console.log(allPosts); 
                if(allPosts.data.data.length > 0) {
                    setallPosts(allPosts.data.data)
                }
    
            } catch (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                if(error.response.status === 500 ) navigate('/signin')
                // console.log(error.response.headers);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error with request', error.message);
                }
                console.log(error.config);
                 // set unknown error
                seterrFound(prevErrs => {
                    return [...prevErrs, `oops that wasn't ment to happen, please try again!!! 😲`]
                })
            }
        }
    
        loadPosts()
    },[])


        const postsArray = allPosts.map(post => {

            return (
                <div key={post._id} className="post--container">
                    <div className= {`${post.portrait ? 'portrait' :'post--image'}`}>
                        <img src={`http://localhost:3000/images/${post.imageId}`} alt="post" />
                    </div>
                    <div className="post--bttns">
                        <div className="applaud">
                                <p onClick={() => handleApplauds(post._id)}>{
                                    post.applaud ? post.applaud : 0
                                } applaud{
                                    post.applaud > 1 ? "'s" :''
                                }</p>
                            < Claps/>
                        </div>
                    </div>
                </div>
            )
        } )

        const handleApplauds = async (imageId) => {
            console.log('handleApplauds', imageId);
        }

        console.log(allPosts);

  return (
    <>
        <Navbar />
        <div className="home--container">
            <div className="home--left">
                <div className="one">
                    <div className="home--latest">
                        <img className='home--latest_img' src={latest} alt="latest" />
                        <p>Latest</p>
                    </div>
                    <div className="home--profile">
                        <img className='home--profile_img' src={profile} alt="profile" />
                        <p>Profile</p>
                    </div>
                </div>
                <div className="two">
                    <div className="home--new media--hidden">
                        <img className='home--new_img' src={newIcon} alt="new" />
                        <p>New</p>
                    </div>
                    <div className=" home--bookmarks media--hidden">
                        <img className='home--bookmarks_img' src={bookmarks} alt="new" />
                        <p>Bookmarks</p>
                    </div>
                </div>
            </div>
            <div className="home--middle">
                
            {errFound ? <ErrorComponent errData = {errFound}/> : postsArray}

            </div>
            <div className="home--right">
                <div className="home--new">
                    <img className='home--new_img' src={newIcon} alt="new" />
                    <p>Upload</p>
                </div>
                <div className=" home--bookmarks">
                    <img className='home--bookmarks_img' src={bookmarks} alt="new" />
                    <p>Bookmarks</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default HomeComponent