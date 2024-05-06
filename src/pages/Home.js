import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useQuery, gql } from '@apollo/client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Parallax, Autoplay } from "swiper/modules";
import LazyLoad from "react-lazy-load";
import Seo from '../components/SeoMata';
import Layout from "../components/layout";
import swiperNext from "../assets/img/swiper-next.png";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/autoplay';

const SliderLazy = lazy(() => import("../components/lazyload/BrandsSlider"));

const Home = ({ }) => {

  const [isLoaded, setIsLoaded] = useState(false);

  const designBy = useRef();
  const portfolioElem = useRef();
  const query = gql`
  {
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
`;
  const { loading, error, data } = useQuery(query);

  const home = data?.page?.homePageContent || [];
  const brand = data?.brands?.nodes || [];
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("1: ", home && home?.designByRoomSlider, error)
  return (
    <>
      <Seo seoData={data?.page?.seo} bodyclassName={"home"} />
      <Layout>
        {/* <!-- hero slider starts  --> */}
        <section className="hero-slider page-wrap">
          <div id="home-slider">
            <Swiper
              speed={2000}
              pagination={false}
              modules={[Pagination, Navigation, Autoplay, Parallax]}
              slidesPerView={1}
              autoplay={{
                delay: 4500,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              lazy={{
                loadPrevNext: false,
                loadOnTransitionStart: true,
              }}
              parallax={true}
              effect="slide"
              loop={true}
              className="swiper-container vertical-swpier"
            >
              {home &&
                home.heroSlider.map((slide, index) => (
                  <SwiperSlide
                    className={`swiper-slide swiper-slide-${index + 1}`}
                    key={index+`yejkh`}
                  >
                    <div className="swiper-image" data-swiper-parallax-x="35%">
                      <div
                        className="swiper-image-inner swiper-image-right"
                      // style={{
                      //   backgroundImage: `url(${slide.sliderImage.mediaItemUrl})`,
                      // }}
                      >
                        <div className="img-wrap">
                          {typeof window !== "undefined" &&
                            window.innerWidth > 767 && (
                              <img src={slide.sliderImage.mediaItemUrl} width="1920" height="728" alt={slide.sliderImage.altText} loading="lazy" className="swiper-image-inner swiper-lazy swiper-image-right" />
                            )}
                          {typeof window !== "undefined" &&
                            window.innerWidth < 767 && (
                              <img src={slide.mobileSliderImage.mediaItemUrl} width="1920" height="728" alt={slide.mobileSliderImage.altText} loading="lazy" className="swiper-image-inner swiper-lazy swiper-image-right" />
                            )}
                          {/* <div className="swiper-lazy-preloader"></div> */}
                        </div>
                        <div
                          className="contain"
                          dangerouslySetInnerHTML={{
                            __html: slide.sliderContent,
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className="swiper-button-prev swiper-button-white"></div>
              <div className="swiper-button-next swiper-button-white"></div>
            </Swiper>
          </div>
        </section>
        {/* <!-- hero slider ends  --> */}
        {/* <!-- design by room starts  --> */}
        <section className="design-by-room" ref={designBy}>
          {home && (
            <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: home.designByRoomIntroduction,
              }}
            />
          )}

          <div className="design-swiper">
            <Swiper
              speed={2000}
              pagination={false}
              modules={[Pagination, Navigation, Autoplay]}
              slidesPerView={1}
              autoplay={{
                delay: 4500,
              }}
              navigation={{
                nextEl: ".swiper-button-nxt",
                prevEl: ".swiper-button-prev",
              }}
              lazy={{
                loadPrevNext: false,
                loadOnTransitionStart: true,
              }}
              grabCursor={true}
              loop={true}
              className="swiper-container design-container"
              id="designSwiper"
            >
              {home &&
                home.designByRoomSlider.map((slide, index) => (
                  <SwiperSlide
                    key={`g;dsfjgj` + index}
                    className="swiper-slide"
                  >
                    <div className="img-wrap">
                      <div className="img-design">
                        {typeof window !== "undefined" &&
                          window.innerWidth > 767 && (
                            <img src={slide.sliderImage.mediaItemUrl} width="1920" height="728" alt={slide.sliderImage.altText} loading="lazy" className="swiper-image-inner swiper-lazy swiper-image-right" />
                          )}

                        {typeof window !== "undefined" &&
                          window.innerWidth <= 767 && (
                            <img src={slide.mobileSliderImage.mediaItemUrl} width="1920" height="728" alt={slide.mobileSliderImage.altText} loading="lazy" className="swiper-image-inner swiper-lazy swiper-image-right" />
                          )}
                        {/* <div className="swiper-lazy-preloader"></div> */}
                      </div>
                      <div className="cta-text">
                        <div className="cta">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: slide.title,
                            }}
                          />
                          <a
                            className="view-more"
                            href={slide.viewMoreLink}
                          >
                            View More
                          </a>
                        </div>

                        <div className="content">
                          <p>{slide && slide.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="swiper-button-nxt" id="designSwiperNext">
              <a href="#">
                <img
                  loading="lazy"
                  height="63"
                  width="62"
                  src={swiperNext}
                  alt=""
                />
              </a>
            </div>
          </div>
        </section>
        {/* <!-- design by room ends  --> */}

        {/* <!-- brands starts --> */}
        {!isLoaded && <div>Loading...</div>}
        <LazyLoad offset={100} onContentVisible={() => setIsLoaded(true)}>
          <Suspense
            fallback={() => {
              setIsLoaded(true);
            }}
          >
            <SliderLazy home={home} brand={brand} />
          </Suspense>
        </LazyLoad>
        {/* <!-- brands ends --> */}

        {/* <!-- portfolio identity starts --> */}
        <section className="portfolio-identity testing" ref={portfolioElem}>
          {home && (
            <div className="container testing">
              <ul className="portfolio-wrappe">
                <li>
                  <div className="port-wrapper">
                    <div className="cta-wrap">
                      <h3>immerse yourself<br />
                        in our design portfolio...</h3>
                      <a className="view-more" href="/portfolio/">view more..</a>

                    </div>
                    <div className="wrapper">
                      <div className="holder">
                        <img src={home.homePortfolioImage.mediaItemUrl} width="1920" height="728" alt={home.homePortfolioImage.altText} loading="lazy" className="alignnone size-full wp-image-175" />
                      </div>
                    </div>
                  </div>
                  <h4>Portfolio</h4>
                </li>
                <li>
                  <div className="port-wrapper">
                    <div className="cta-wrap">
                      <h3>every brand has a story behind it,<br />
                        here's our tale</h3>
                      <a className="view-more" href="/identity/">view more</a>

                    </div>
                    <div className="wrapper">
                      <div className="holder">
                        <img src={home.homeIdentityImage.mediaItemUrl} width="1920" height="728" alt={home.homeIdentityImage.altText} loading="lazy" className="alignnone size-full wp-image-176" />
                      </div>
                    </div>
                  </div>
                  <h4>Identity</h4>
                </li>
              </ul>
            </div>
          )}
        </section>
        {/* <!-- portfolio identity starts --> */}
      </Layout>
    </>
  );
};

export default Home;
