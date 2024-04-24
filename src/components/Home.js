import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
        <div>
            <h1>Post fetched via graphql</h1>
            <ul>
                {data.posts.nodes.map((post) => (
                    <li key={post.id}>
                        <div class="blog-media">
                            <div class="wrapper">
                                <div class="holder">
                                    <a href={post.uri}>
                                        <img src={post.featuredImage.node.link} alt='' />
                                        {console.log(post)}
                                    </a>
                                    <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                    <a class="more" href={post.uri}>read more</a>
                                </div>
                            </div>
                        </div>
                    </li >
                ))}


            </ul>
        </div>
    );
};

export default Home;
