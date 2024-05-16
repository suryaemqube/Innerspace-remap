/* eslint-disable */
import React, { useEffect, useState, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";

import "../assets/css/swiperscroll.css";
import "swiper/css/bundle";

gsap.registerPlugin(ScrollTrigger);

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ScrollComponent = () => {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [animating, setAnimating] = useState(null);
  const swiperRef = useRef(null);

  const galleryRef = useRef();

  useEffect(() => {
    // const slideIndex = sliderRef.current;
    let count = 0;
    let isScroll;
    const swiper = new Swiper(".swiper", {
      direction: "vertical",
      speed: 400,
      parallax: true,
      allowTouchMove: false,
    });

    const numPanels = swiper.slides.length;

    swiper.on("slideChange", function () {
      gsap.to(swiper.slides[swiper.activeIndex], { scale: 1, opacity: 1 });
      gsap.to(swiper.slides[swiper.previousIndex], {
        opacity: 0.3,
        scale: 0.8,
      });
    });

    swiper.on("slideChangeTransitionEnd", function () {
      // animating = false
      setAnimating(false);
      console.log("end");
    });

    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => {
        handleScroll("up");
      },
      onDown: () => {
        handleScroll("down");
      },
      wheelSpeed: -1,
      tolerance: 30,
      preventDefault: true,
      onPress: (self) => {
        ScrollTrigger.isTouch && self.event.preventDefault();
      },
    });
    intentObserver.disable();

    let preventScroll = ScrollTrigger.observe({
      preventDefault: true,
      type: "wheel,scroll",
      allowClicks: true,
      onEnable: (self) => {
        isScroll = 1;
        console.log("enable", isScroll);
        return (self.savedScroll = self.scrollY());
      }, // save the scroll position
      onChangeY: (self) => {
        isScroll = 0;
        console.log("disable", isScroll, self.savedScroll);
        self.scrollY(self.savedScroll); // refuse to scroll
      },
    });
    preventScroll.disable();
    
    const handleScroll = debounce((directionValue) => {
      const directV = directionValue;

      if (directV === "up") {
        // count =  count + 1 ;
        count = count < numPanels ?  count + 1 : count;
        console.log("gotoPanel up", count, numPanels);
        if (count === numPanels || count === -1) {
          intentObserver.disable();
          preventScroll.disable();
          
          console.log("return to normal scroll");
          preventScroll.scrollY(
            preventScroll.scrollY() + (count === numPanels ? 100 : -100)
          );
          return;
        }

        swiper.slideTo(count);
      } else if (directV === "down") {
        count = count - 1;
        console.log("gotoPanel down", count, numPanels);
        if (count === numPanels || count === -1) {
          intentObserver.disable();
          preventScroll.disable();
          console.log("return to normal scroll");
          preventScroll.scrollY(
            preventScroll.scrollY() + (count === numPanels ? 1 : -1)
          );
          count = 0
          return;
        }

        swiper.slideTo(count);
        console.log("Direction: down", count);
      }
      var pagination = document.querySelector("#currentSlide");
      pagination.innerHTML = count + 1;
    }, 100);

    gsap.to(galleryRef.current, {
      scrollTrigger: {
        trigger: galleryRef.current,
        pin: true,
        anticipatePin: true,
        // start: "40% 50%",
        // end: "+=50%",
        start: "top top",
        end: "+=50%",
        markers: true,
        onEnter: (self) => {
          console.log(count, "On Enter");
          if (preventScroll.isEnabled == false && count !== numPanels) {
            // self.scroll(self.start);
            preventScroll.enable();
            intentObserver.enable();
          }
        },
        onEnterBack: (self) => {
          console.log(count, "On EnterBack");
          if (preventScroll.isEnabled == false && count !== -1) {
            self.scroll(self.start);
            preventScroll.enable();
            intentObserver.enable();
          }
        },
        // onUpdate: handleScroll,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        className="brand"
        style={{ background: "black", textAlign: "center" }}
      >
        <a
          href="https://www.creativecodingclub.com/bundles/creative-coding-club?src=cdp3droll"
          target="_blank"
        >
          <img
            src="https://assets.codepen.io/32887/logo-ill.svg"
            width="300"
            alt=""
          />
        </a>
      </div>
      <div className="space" style={{ padding: "20px", background: "#efefef" }}>
        <h3>Use mouse wheel to scroll down and navigate Swiper gallery.</h3>
        <ul>
          <li>This is a rough proof of concept</li>
          <li>Not set up to be fully responsive</li>
          <li>There are intermittent glitches</li>
          <li>Use at own risk</li>
          <li>
            <strong style={{ color: "#600" }}>
              Zero support is offered for any fixes or updates
            </strong>
          </li>
          <li>
            The community is welcome to hack on this and try to improve it
          </li>
        </ul>

        <h3>Swipe to unlock pining</h3>
        <p>
          When the gallery gets pinned be sure to Swipe until the last slide is
          visible
        </p>
        <p>Now you can scroll down to the rest of the page. Neat!</p>

        <h3>Known Issues</h3>
        <ul>
          <li>
            If you get to slide 6 and scroll all the way down, sometimes on the
            way up you can bypass the pinning and navigation through the Swiper
            gallery.
          </li>
          <li>
            Sometimes when going back up the page the pinned Swiper section
            glitches out. Elements flash and jump a bit. I have no idea what's
            going on here but I suspect the scroll position is jumping up and
            down.
          </li>
          <li>
            Attempting to use the Scrollbar while scrolling is disabled results
            in lots jitters and flasing.
          </li>
          <li>
            After page loads fresh, grab scrollbar and try to scroll down the
            full page. It becomes a mess when you hit the section that is trying
            to disable scrolling.
          </li>
        </ul>
      </div>

      <div className="gallery" ref={galleryRef}>
        <div className="swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            <div className="swiper-slide red">
              <h1>A</h1>
              <h2>Is for Apple</h2>
            </div>
            <div className="swiper-slide gray">
              <h1>B</h1>
              <h2>Is for Banana</h2>
            </div>
            <div className="swiper-slide blue">
              <h1>C</h1>
              <h2>Is for Car</h2>
            </div>
            <div className="swiper-slide purple">
              <h1>D</h1>
              <h2>Is for Desk</h2>
            </div>
            <div className="swiper-slide orange">
              <h1>E</h1>
              <h2>Is for Eggs</h2>
            </div>
            <div className="swiper-slide green">
              <h1>F</h1>
              <h2>Is for Fabulous</h2>
            </div>
          </div>
        </div>
        <div
          id="currentSlide"
          style={{
            fontSize: "4vh",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            width: "8em",
            padding: "20px",
            background: "#ccc",
            borderRadius: "2.5em",
            textAlign: "center",
            margin: "20px auto auto auto",
          }}
        >
          1
        </div>
      </div>

      <div className="space" style={{ padding: "20px", background: "#efefef" }}>
        <h3>Closing Thoughts</h3>
        <p>
          Even though this seems like a neat UI treatment, it is very strange to
          lock the scrollbar in place. I really don't think the user should be
          prevented from using a scrollbar. I tried hiding the scrollbar by
          setting
          <span style={{ fontFamily: "Courier, serif", fontWeight: "bold" }}>
            visibility:hidden
          </span>{" "}
          on body when scrolling should be disabled but that was weird too.{" "}
        </p>

        <p>I would suggest the following 3 alternatives</p>
        <ol>
          <li>
            Do <strong>not pin</strong> the Swiper section. Provide a clear UI
            for horizontal navigation with prev/next buttons and make it clear
            that swiping is allowed too.
          </li>
          <li>
            Ditch Swiper. Pin the section and control it with a{" "}
            <a
              href="https://greensock.com/3-8/#containerAnimation"
              target="_blank"
            >
              container animation
            </a>
            . Using this technique the scroll-wheel and scrollbar can be used
            consistently with no lockups or funny business.
          </li>
          <li>
            Create a full-screen experience where the{" "}
            <strong>scrollbar is always hidden</strong> and the only way to
            navigate is via scrollwheel or touch gestures.{" "}
          </li>
        </ol>
      </div>
      <div
        className="brand"
        style={{ background: "black", textAlign: "center" }}
      >
        <a
          href="https://www.creativecodingclub.com/bundles/creative-coding-club?src=cdp3droll"
          target="_blank"
        >
          <img
            src="https://assets.codepen.io/32887/logo-ill.svg"
            width="300"
            alt=""
          />
        </a>
      </div>
    </>
  );
};

export default ScrollComponent;
