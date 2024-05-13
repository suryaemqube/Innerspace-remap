"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homePageQuery = exports.default = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireWildcard(require("react"));
var _client = require("@apollo/client");
var _react2 = require("swiper/react");
var _modules = require("swiper/modules");
var _reactLazyLoad = _interopRequireDefault(require("react-lazy-load"));
var _SeoMata = _interopRequireDefault(require("../components/SeoMata"));
var _layout = _interopRequireDefault(require("../components/layout"));
var _swiperNext = _interopRequireDefault(require("../assets/img/swiper-next.png"));
var _graphqlData = _interopRequireDefault(require("../pageData/graphqlData.json"));
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/pagination");
require("swiper/css/parallax");
require("swiper/css/autoplay");
var _templateObject;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* eslint-disable */
const SliderLazy = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("../components/lazyload/BrandsSlider"))));
const Home = () => {
  var _data$page, _data$brands, _data$page2;
  const [isLoaded, setIsLoaded] = (0, _react.useState)(false);
  const designBy = (0, _react.useRef)();
  const portfolioElem = (0, _react.useRef)();
  const query = (0, _client.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  {\n    page(id: \"7\", idType: DATABASE_ID) {\n      seo {\n        canonical\n        opengraphDescription\n        opengraphImage {\n          altText\n          mediaItemUrl\n          mediaType\n        }\n        opengraphSiteName\n        opengraphTitle\n        metaRobotsNofollow\n        metaRobotsNoindex\n        opengraphUrl\n        opengraphModifiedTime\n        opengraphType\n        title\n        metaDesc\n        schema {\n          raw\n        }\n      }\n      homePageContent {\n        brandsIntroduction\n        designByRoomIntroduction\n        designByRoomSlider {\n          shortDescription\n          title\n          viewMoreLink\n          sliderImage {\n            altText\n            mediaItemUrl\n          }\n          mobileSliderImage {\n            altText\n            mediaItemUrl\n          }\n        }\n        homeIdentityImage {\n          altText\n          mediaItemUrl\n        }\n        homePortfolioImage {\n          altText\n          mediaItemUrl\n        }\n        heroSlider {\n          sliderContent\n          sliderImage {\n            altText\n            mediaItemUrl\n          }\n          mobileSliderImage {\n            altText\n            mediaItemUrl\n          }\n        }\n      }\n    }\n    brands {\n      nodes {\n        id\n        brands {\n          brandLogo {\n            altText\n            mediaItemUrl\n          }\n          brandRelationshipField {\n            ... on Page {\n              id\n              link\n              title\n            }\n          }\n        }\n        featuredImage {\n          node {\n            altText\n            mediaItemUrl\n          }\n        }\n      }\n    }\n  }\n"])));
  (0, _react.useEffect)(() => {
    function measureImageLoadTime(imageSrc) {
      return new Promise((resolve, reject) => {
        const startTime = performance.now();
        const image = new Image();
        image.onload = () => {
          const loadTime = performance.now() - startTime;
          resolve(loadTime);
        };
        image.onerror = error => {
          reject(error);
        };
        image.src = imageSrc;
      });
    }
    const imageSrc1 = "".concat(data && home.homePortfolioImage.mediaItemUrl);
    const imageSrc2 = "".concat(_graphqlData.default.page.homePageContent.homePortfolioImage.localPath);

    // Measure loading time for both images
    measureImageLoadTime(imageSrc1).then(loadTime1 => {
      console.log("Image 1 loaded in ".concat(loadTime1, " milliseconds"));
    }).catch(error => {
      console.error("Error loading image 1:", error);
    });
    measureImageLoadTime(imageSrc2).then(loadTime2 => {
      console.log("pre Image loaded in ".concat(loadTime2, " milliseconds"));
    }).catch(error => {
      console.error("Error loading image 2:", error);
    });
  }, []);
  const {
    loading,
    error,
    data
  } = (0, _client.useQuery)(query);
  const home = (data === null || data === void 0 || (_data$page = data.page) === null || _data$page === void 0 ? void 0 : _data$page.homePageContent) || [];
  const brand = (data === null || data === void 0 || (_data$brands = data.brands) === null || _data$brands === void 0 ? void 0 : _data$brands.nodes) || [];

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SeoMata.default, {
    seoData: data === null || data === void 0 || (_data$page2 = data.page) === null || _data$page2 === void 0 ? void 0 : _data$page2.seo,
    bodyclassName: "home"
  }), /*#__PURE__*/_react.default.createElement(_layout.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: data && home.homePortfolioImage.mediaItemUrl,
    width: "50",
    height: "50",
    alt: data && home.homePortfolioImage.altText,
    loading: "lazy",
    className: "alignnone size-full wp-image-175"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: _graphqlData.default.page.homePageContent.homePortfolioImage.localPath,
    width: "50",
    height: "50",
    alt: "ok",
    loading: "lazy",
    className: "alignnone size-full wp-image-175"
  }), /*#__PURE__*/_react.default.createElement("section", {
    className: "hero-slider page-wrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "home-slider"
  }, /*#__PURE__*/_react.default.createElement(_react2.Swiper, {
    speed: 2000,
    pagination: false,
    modules: [_modules.Pagination, _modules.Navigation, _modules.Autoplay, _modules.Parallax],
    slidesPerView: 1,
    autoplay: {
      delay: 4500
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    lazy: {
      loadPrevNext: false,
      loadOnTransitionStart: true
    },
    parallax: true,
    effect: "slide",
    loop: true,
    className: "swiper-container vertical-swpier"
  }, data && home && home.heroSlider.map((slide, index) => /*#__PURE__*/_react.default.createElement(_react2.SwiperSlide, {
    className: "swiper-slide swiper-slide-".concat(index + 1),
    key: index + "yejkh"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "swiper-image",
    "data-swiper-parallax-x": "35%"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "swiper-image-inner swiper-image-right"
    // style={{
    //   backgroundImage: `url(${slide.sliderImage.mediaItemUrl})`,
    // }}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "img-wrap"
  }, typeof window !== "undefined" && window.innerWidth > 767 && /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: slide.sliderImage.mediaItemUrl,
    width: "1920",
    height: "728",
    alt: slide.sliderImage.altText,
    loading: "lazy",
    className: "swiper-image-inner swiper-lazy swiper-image-right"
  })), typeof window !== "undefined" && window.innerWidth < 767 && /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: slide.mobileSliderImage.mediaItemUrl,
    width: "1920",
    height: "728",
    alt: slide.mobileSliderImage.altText,
    loading: "lazy",
    className: "swiper-image-inner swiper-lazy swiper-image-right"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "contain",
    dangerouslySetInnerHTML: {
      __html: slide.sliderContent
    }
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "swiper-button-prev swiper-button-white"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "swiper-button-next swiper-button-white"
  })))), /*#__PURE__*/_react.default.createElement("section", {
    className: "design-by-room",
    ref: designBy
  }, data && home && /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    dangerouslySetInnerHTML: {
      __html: home.designByRoomIntroduction
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "design-swiper"
  }, /*#__PURE__*/_react.default.createElement(_react2.Swiper, {
    speed: 2000,
    pagination: false,
    modules: [_modules.Pagination, _modules.Navigation, _modules.Autoplay],
    slidesPerView: 1,
    autoplay: {
      delay: 4500
    },
    navigation: {
      nextEl: ".swiper-button-nxt",
      prevEl: ".swiper-button-prev"
    },
    lazy: {
      loadPrevNext: false,
      loadOnTransitionStart: true
    },
    grabCursor: true,
    loop: true,
    className: "swiper-container design-container",
    id: "designSwiper"
  }, data && home && home.designByRoomSlider.map((slide, index) => /*#__PURE__*/_react.default.createElement(_react2.SwiperSlide, {
    key: "g;dsfjgj" + index,
    className: "swiper-slide"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "img-wrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "img-design"
  }, typeof window !== "undefined" && window.innerWidth > 767 && /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: slide.sliderImage.mediaItemUrl,
    width: "1920",
    height: "728",
    alt: slide.sliderImage.altText,
    loading: "lazy",
    className: "swiper-image-inner swiper-lazy swiper-image-right"
  })), typeof window !== "undefined" && window.innerWidth <= 767 && /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: slide.mobileSliderImage.mediaItemUrl,
    width: "1920",
    height: "728",
    alt: slide.mobileSliderImage.altText,
    loading: "lazy",
    className: "swiper-image-inner swiper-lazy swiper-image-right"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-text"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    dangerouslySetInnerHTML: {
      __html: slide.title
    }
  }), /*#__PURE__*/_react.default.createElement("a", {
    className: "view-more",
    href: slide.viewMoreLink
  }, "View More")), /*#__PURE__*/_react.default.createElement("div", {
    className: "content"
  }, /*#__PURE__*/_react.default.createElement("p", null, slide && slide.shortDescription))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "swiper-button-nxt",
    id: "designSwiperNext"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, /*#__PURE__*/_react.default.createElement("img", {
    loading: "lazy",
    height: "63",
    width: "62",
    src: _swiperNext.default,
    alt: ""
  }))))), data && /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: () => /*#__PURE__*/_react.default.createElement("div", null, "Loading...")
  }, /*#__PURE__*/_react.default.createElement(SliderLazy, {
    home: home,
    brand: brand
  }))), /*#__PURE__*/_react.default.createElement("section", {
    className: "portfolio-identity testing",
    ref: portfolioElem
  }, data && home && /*#__PURE__*/_react.default.createElement("div", {
    className: "container testing"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "portfolio-wrappe"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "port-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-wrap"
  }, /*#__PURE__*/_react.default.createElement("h3", null, "immerse yourself", /*#__PURE__*/_react.default.createElement("br", null), "in our design portfolio..."), /*#__PURE__*/_react.default.createElement("a", {
    className: "view-more",
    href: "/portfolio/"
  }, "view more..")), /*#__PURE__*/_react.default.createElement("div", {
    className: "wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "holder"
  }, /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: home.homePortfolioImage.mediaItemUrl,
    width: "50",
    height: "50",
    alt: home.homePortfolioImage.altText,
    loading: "lazy",
    className: "alignnone size-full wp-image-175"
  }))))), /*#__PURE__*/_react.default.createElement("h4", null, "Portfolio")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "port-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-wrap"
  }, /*#__PURE__*/_react.default.createElement("h3", null, "every brand has a story behind it,", /*#__PURE__*/_react.default.createElement("br", null), "here's our tale"), /*#__PURE__*/_react.default.createElement("a", {
    className: "view-more",
    href: "/identity/"
  }, "view more")), /*#__PURE__*/_react.default.createElement("div", {
    className: "wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "holder"
  }, /*#__PURE__*/_react.default.createElement(_reactLazyLoad.default, {
    offset: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: home.homeIdentityImage.mediaItemUrl,
    width: "1920",
    height: "728",
    alt: home.homeIdentityImage.altText,
    loading: "lazy",
    className: "alignnone size-full wp-image-176"
  }))))), /*#__PURE__*/_react.default.createElement("h4", null, "Identity")))))));
};
var _default = exports.default = Home;
const homePageQuery = exports.homePageQuery = "\n  query {\n    page(id: \"7\", idType: DATABASE_ID) {\n      homePageContent {\n        homeIdentityImage {\n          altText\n          mediaItemUrl\n        }\n      }\n    }\n  }\n";
