// queries.js

const { gql } = require('@apollo/client');

const queries = [
  { 
    query: gql`
      query {
        menuItems(first: 20, where: {location: PRIMARY}) {
           edges {
             node {
               id
               label
               uri
               parentId
               path
               cssClasses
             }
           }
        }
      }
    `,
    location: "primarymenu"
  },
  { 
    query: gql`
      query {
        page(id: "7", idType: DATABASE_ID) {
          seo {
            canonical
            opengraphDescription
            opengraphImage {
              altText
              mediaItemUrl
              mediaType
            }
            opengraphSiteName
            opengraphTitle
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphUrl
            opengraphModifiedTime
            opengraphType
            title
            metaDesc
            schema {
              raw
            }
          }
          homePageContent {
            brandsIntroduction
            designByRoomIntroduction
            designByRoomSlider {
              shortDescription
              title
              viewMoreLink
              sliderImage {
                altText
                mediaItemUrl
              }
              mobileSliderImage {
                altText
                mediaItemUrl
              }
            }
            homeIdentityImage {
              altText
              mediaItemUrl
            }
            homePortfolioImage {
              altText
              mediaItemUrl
            }
            heroSlider {
              sliderContent
              sliderImage {
                altText
                mediaItemUrl
              }
              mobileSliderImage {
                altText
                mediaItemUrl
              }
            }
          }
        }
        brands {
          nodes {
            id
            brands {
              brandLogo {
                altText
                mediaItemUrl
              }
              brandRelationshipField {
                ... on Page {
                  id
                  link
                  title
                }
              }
            }
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    `,
    location: "home"
  },
  {
    query: gql`
    {
        page(id: "33", idType: DATABASE_ID) {
          id
          title
          uri
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
          mobileImages {
            mobileHeaderImage {
              mediaItemUrl
              altText
            }
          }
        }
      }
    `,
    location: "contact",
  },
  
];

module.exports = queries;
