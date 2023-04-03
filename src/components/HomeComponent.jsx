import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import API from '../API/api'
import ErrorComponent from "./ErrorComponent"
import img from '../resourses/images/a.jpg'
import portrait from '../resourses/images/3.webp'
import Claps from './Claps'

function HomeComponent() {

    const [allPosts, setallPosts] = useState([])

    useEffect(() => {

        const loadPosts = async () => {
            try {
                const allPosts = await API.get('/posts')
                if(allPosts.data.data.length > 0) setallPosts(allPosts.data.data)
            } catch (error) {
                console.error(error);
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
                            <p>1 applaud</p>
                            < Claps/>
                        </div>
                    </div>
                </div>
            )
        } )



    console.log(allPosts);
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
                {
                    postsArray
                }
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