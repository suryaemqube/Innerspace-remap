import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Seo from '../components/SeoMata';

const GET_POSTS = gql`
  query {
    posts {
        nodes {
          id
          title(format: RENDERED)
          excerpt
          slug
          uri
          featuredImage {
            node {
              link
            }
          }
        }
      }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>

      <Seo title={"Home page"} description={"Hello this is the home page."} bodyClass={"home"} />
      <div>
        <h1>Post fetched via graphql</h1>
        <ul>
          {data.posts.nodes.map((post) => (
            <li key={post.id}>
              <div className="blog-media">
                <div className="wrapper">
                  <div className="holder">
                    <a href={post.uri}>
                      <img src={post.featuredImage.node.link} alt='' />
                    </a>
                    <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    <a className="more" href={post.uri}>read more</a>
                  </div>
                </div>
              </div>
            </li >
          ))}


        </ul>
      </div>
    </>
  );
};

export default Home;
