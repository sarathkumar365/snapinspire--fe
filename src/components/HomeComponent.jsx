import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from '../context/AuthProvider';
import Navbar from './Navbar'
import API from '../API/api'
import ErrorComponent from "./ErrorComponent"
import Claps from './Claps'
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

// if(error?.response) console.log(error.response.message);

//                 if(error.response.status === 400) console.log('missing params');

//                 if(error.response.status === 401) {
//                     console.log( ' unauthorized');
//                     seterrFound('Please login to see all posts')
//                 }

function HomeComponent() {

    const [allPosts, setallPosts] = useState([])

    const [errFound,seterrFound  ] = useState('')

    const {auth} = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect( () => {
        
        const loadPosts = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.accessToken}`,
                    withCredentials: true
                }
    
                const allPosts = await axios.get(`${BASE_URL}/posts`, { headers })
                // console.log(allPosts); 
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
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                //   console.log(error.config);
            }
        }
    
        loadPosts()
    },[])


        const postsArray = allPosts.map(post => {

            return (
                <div className="post--container">
                    <div className= {`${post.portrait ? 'portrait' :'post--image'}`}>
                        <img src={`http://localhost:3000/images/${post.imageId}`} alt="post" />
                    </div>
                    <div className="post--bttns">
                        <div className="applaud">
                                <p onClick={() => handleApplauds(post._id)}>{
                                    post.applaud ? post.applaud : 0
                                } applaud</p>
                            < Claps/>
                        </div>
                    </div>
                </div>
            )
        } )

        const handleApplauds = async (imageId) => {
            try {
                const config = {
                    headers: {
                      'Content-Type': 'application/json',
                      withCredentials: true
                    }
                  }
    
                const applaudRes = await API.patch(`${BASE_URL}/posts/${imageId}/1`,{},config)
                // todo: add to state and re render
                console.log(applaudRes);
            } catch (error) {
                console.log(error);
            }
        }


  return (
    <>
        <Navbar />
        <div className="home--container">
            <div className="home--left">
                <div className="home--latest">Latest</div>
                <div className="home--profile">Profile</div>
                <div className="home--new media--hidden">New</div>
                <div className="media--hidden home--bookmarks">Bookmarks</div>
            </div>
            <div className="home--middle">
                
            {errFound ? <ErrorComponent errData = {errFound}/> : postsArray}
                
                {/* {
                    postsArray
                } */}
            </div>
            <div className="home--right">
                <div className="home--new">New</div>
                <div className="home--bookmarks">Bookmarks</div>
            </div>
        </div>
    </>
    )
}

export default HomeComponent