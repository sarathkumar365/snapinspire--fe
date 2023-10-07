import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import customAxios from '../API/api'
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider'

import './CSS/homeComp.css'
import Claps from './Claps'
import latest from '../resourses/icons/latest.jpg'
import newIcon from '../resourses/icons/new.jpg'
import profile from '../resourses/icons/profile.jpg'
import bookmarks from '../resourses/icons/bookmarks.jpg'

import Navbar from './Navbar'
import ErrorComponent from "./ErrorComponent"



function HomeComponent() {

    console.log('HOME COMP');

    const navigate = useNavigate();

    const [allPosts, setallPosts] = useState([])

    const [errFound,seterrFound  ] = useState('')

    const {auth} = useContext(AuthContext)



    useEffect( () => {

        const getNewAccessToken = async () => {
            const headers = {
                'Content-Type': 'application/json',
                withCredentials:true,
                authorization: `Bearer ${auth.accessToken}`
            }
            
            const newAccessToken = await axios.get('http://localhost:3000/auth/getRefreshToken',{headers})

            return newAccessToken
        }
        
        const loadPosts = async () => {
            console.log('load posts use')
            console.log(`current auth token is ${auth.accessToken}`);

            try {
                // test for axios interaction
                const requestHandler = async request => {

                    console.log('request intercepted');
                    
                    if(!auth.accessToken) {
                        console.log('No access token');
                        const newAccessToken = await getNewAccessToken()
                        console.log(newAccessToken);
                    } 
                    // request.headers.Authorization = `Bearer ${auth.accessToken}`;  
                    return request;
                };

                const responseHandler = response => {
                    console.log('response intercepted');
                    if (response.status === 401) {
                        window.location = '/signin';
                    }
                    return response;
                };
                
                axios.interceptors.request.use((request) => requestHandler(request))
                axios.interceptors.response.use((response) => responseHandler(response))

                const headers = {
                    'Content-Type': 'application/json',
                    withCredentials:true,
                    authorization: `Bearer ${auth.accessToken}`
                }
                // const allPosts = await customAxios.get('/posts',{headers})
                const allPosts = await axios.get('http://localhost:3000/posts',{headers})

                
                
                

                // no posts found
                if(typeof allPosts.data.data === 'string') console.log('No posts to see here, try uploading yout favorites!!!');

                if(allPosts.data.data.length > 0) {
                    setallPosts(allPosts.data.data)
                }
    
            } catch (error) {
                console.log(error);
                if(error.response.status === 401) {
                    navigate('/signin')
                }
                
            }
        }
    
        loadPosts()
    },[])


    const test = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                withCredentials:true,
                authorization: `Bearer ${auth.accessToken}`
            }
          const testReq = await axios.patch('http://localhost:3000/posts/64144752c1247880ba1bb7bb/1',{headers})
          console.log(testReq);
        } catch (error) {
               console.log(error);
        }
      }

// console.log(auth);
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
                        <button type='button' onClick={()=> test()}>test</button>

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