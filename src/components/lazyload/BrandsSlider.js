/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyLoad from "react-lazy-load";
import swiperNext from "../../assets/img/swiper-next.png";
import { NavLink } from "react-router-dom";

export default function Slider({ home, brand }) {
  gsap.registerPlugin(ScrollTrigger);
  const [swiper1, setSwiper1] = useState(null);
  const [swiper2, setSwiper2] = useState(null);
  const [swiper3, setSwiper3] = useState(null);

  const brandElem = useRef();

  const brandSwiperNext = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.innerWidth > 767) {
      swiper1.slideNext();
      swiper2.slideNext();
    }
    swiper3.slideNext();
  };

  useEffect(() => {
    const delayAnimation = setTimeout(() => {
      let ctx = gsap.context(() => {
        var tlBrands = gsap.timeline();
        tlBrands.from(
          ".brands p, .brand-hulsta, .brand-rolf-benz, .brand-bocci",
          { duration: 1, opacity: 0, y: 300, ease: "power1.out", stagger: 0.1 },
          "-=1"
        );

        var tBrands = gsap.timeline({
          scrollTrigger: {
            trigger: brandElem.current,
            start: "top 80%",
            markers: false,
          },
        });
        tBrands.add(tlBrands);
      }, brandElem);

      return () => {
        ctx.revert();
      };
    }, 100);
    return () => {
      clearTimeout(delayAnimation);
    };
  }, []);
  return (
    <section className="brands" ref={brandElem}>
      {home && (
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: home.brandsIntroduction }}
        />
      )}
      <div className="container flex">
        {typeof window !== 'undefined' && window.innerWidth > 768 && (
          <>
            <Swiper
              onSwiper={(s) => {
                setSwiper1(s);
              }}
              lazy={{
                loadPrevNext: false,
                loadOnTransitionStart: true,
              }}
              effect={"slide"}
              speed={1500}
              pagination={false}
              slidesPerView={1}
              navigation={false}
              allowTouchMove={false}
              loop={true}
              initialSlide={0}
              className="swiper-container brand-bocci"
            >
              {brand &&
                brand.map((slide, index) => (
                  <SwiperSlide
                    key={slide.id}
                    className="swiper-slide"
                  // style="background: url(<?php echo $brand_main_img_home; ?>) no-repeat center; background-size: cover;"
                  >
                    <LazyLoad offset={100}>
                      <img src={slide.featuredImage.node.mediaItemUrl} width="549"
                        height="549" alt={slide.featuredImage.node.altText} loading="lazy" className="swiper-slide swiper-lazy" />
                    </LazyLoad>
                    <NavLink
                      to={slide.brands.brandRelationshipField.link}
                      className="view-more"
                    >
                      view more
                    </NavLink>
                    <NavLink
                      to={slide.brands.brandRelationshipField.link}
                      className="dblock"
                    ></NavLink>
                    <LazyLoad offset={100}>
                      <img
                        width="132"
                        height="42"
                        className={`brand-logo ${slide.brands.brandRelationshipField.title}`}
                        src={slide.brands.brandLogo.mediaItemUrl}
                        alt={`Brand ${slide.brands.brandLogo.altText} Logo`}
                      />
                    </LazyLoad>
                  </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
              onSwiper={(s) => {
                setSwiper2(s);
              }}
              lazy={{
                loadPrevNext: false,
                loadOnTransitionStart: true,
              }}
              effect={"slide"}
              speed={1500}
              pagination={false}
              slidesPerView={1}
              navigation={false}
              allowTouchMove={false}
              loop={true}
              initialSlide={1}
              className="swiper-container brand-rolf-benz"
            >
              {brand &&
                brand.map((slide, index) => (
                  <SwiperSlide
                    key={slide.id}
                    className="swiper-slide"
                  // style="background: url(<?php echo $brand_main_img_home; ?>) no-repeat center; background-size: cover;"
                  >
                    <LazyLoad offset={100}>
                      <img src={slide.featuredImage.node.mediaItemUrl} width="549"
                        height="549" alt={slide.featuredImage.node.altText} loading="lazy" className="swiper-slide swiper-lazy" />
                    </LazyLoad>

                    <NavLink
                      to={slide.brands.brandRelationshipField.link}
                      className="view-more"
                    >
                      view more
                    </NavLink>
                    <NavLink
                      to={slide.brands.brandRelationshipField.link}
                      className="dblock"
                    ></NavLink>
                    <LazyLoad offset={100}>
                      <img
                        width="132"
                        height="42"
                        className={`brand-logo ${slide.brands.brandRelationshipField.title}`}
                        src={slide.brands.brandLogo.mediaItemUrl}
                        alt={`Brand ${slide.brands.brandLogo.altText} Logo`}
                        loading="lazy"
                      />
                    </LazyLoad>
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        )}
        <Swiper
          onSwiper={(s) => {
            setSwiper3(s);
          }}
          lazy={{
            loadPrevNext: false,
            loadOnTransitionStart: true,
          }}
          effect={"slide"}
          speed={1500}
          pagination={false}
          slidesPerView={1}
          navigation={false}
          allowTouchMove={false}
          loop={true}
          initialSlide={2}
          breakpoints={{
            0: {
              allowTouchMove: true,
            },
            768: {
              pagination: false,
              allowTouchMove: false,
            },
          }}
          className="swiper-container brand-hulsta"
        >
          {brand &&
            brand.map((slide, index) => (
              <SwiperSlide
                key={slide.id}
                className="swiper-slide"
              // style="background: url(<?php echo $brand_main_img_home; ?>) no-repeat center; background-size: cover;"
              >
                <LazyLoad offset={100}>
                  <img src={slide.featuredImage.node.mediaItemUrl} width="549"
                    height="549" alt={slide.featuredImage.node.altText} loading="lazy" className="swiper-slide swiper-lazy" /></LazyLoad>
                <NavLink
                  to={slide.brands.brandRelationshipField.link}
                  className="view-more"
                >
                  view more
                </NavLink>
                <NavLink
                  to={slide.brands.brandRelationshipField.link}
                  className="dblock"
                ></NavLink>
                <LazyLoad offset={100}>
                  <img
                    width="132"
                    height="42"
                    className={`brand-logo ${slide.brands.brandRelationshipField.title}`}
                    src={slide.brands.brandLogo.mediaItemUrl}
                    loading="lazy"
                    alt={`Brand ${slide.brands.brandLogo.altText} Logo`}
                  /></LazyLoad>

              </SwiperSlide>
            ))}
        </Swiper>
        <div className="swiper-button-nxt" id="brandSwiperNext">
          <a href="#" onClick={brandSwiperNext}>
            <img
              width="57"
              height="58"
              src={swiperNext}
              alt=""
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
