import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Seo from '../components/SeoMata';
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://app.innerspacedxb.com/wp-json/wp/v2/posts?_embed');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>

      <Seo title={"Post page"} description={"Hello this is a new post page."} bodyClass={"post"} visibility={false} />


      <div>
        <h1>Post fetched via API</h1>
        <ul>
          {posts && posts.map((post) => (
            <li key={post.id}>
              <div className="blog-media">
                <div className="wrapper">
                  <div className="holder">
                    <a href={post.slug}>
                      <img src={post._embedded['wp:featuredmedia']['0'].source_url} alt='' />
                    </a>
                    <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <a className="more" href={post.slug}>read more</a>
                  </div>
                </div>
              </div>
            </li >
          ))}
        </ul >
      </div >
    </>
  );
};

export default Posts;
