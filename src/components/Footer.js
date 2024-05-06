import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik, Formik } from "formik";
import { getToken } from "../hooks/token";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";


import iconInsta from "../assets/img/icon-insta.svg";
import iconPinterest from "../assets/img/icon-pinterest.svg";
import iconFb from "../assets/img/icon-fb.svg";
import iconYoutube from "../assets/img/icon-youtube.svg";
import iconLinkedin from "../assets/img/icon-linkedin.svg";
const WEBSITE_URL = process.env.REACT_APP_BASE_URL;

function Footer() {
  const [token, setToken] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const query = gql`
  {
    acfOptions {
      footerContent {
        email
        germanKitchenText
        mainLogo {
          mediaItemUrl
          altText
        }
        openingTimes
        phoneNumber
        visitOurShowroom
      }
    }
    menuItems(where: {location: FOOTER}) {
      nodes {
        id
        label
        path
      }
    }
  }`;

  const { loading, error, data } = useQuery(query);



  const footerMenu = data?.menuItems.nodes || [];
  const options = data?.acfOptions?.footerContent || [];

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken();
        setToken(fetchedToken);
      } catch (error) { }
    };

    fetchToken();
  }, []);


  const validate = (values) => {
    const errors = {};
    if (values["email-741"] === "") {
      setFormMessage("Please enter correct email address");
      errors["email-741"] = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values["email-741"])
    ) {
      errors["email-741"] = "Invalid email address";
      setFormMessage("Please enter correct email address");
    }

    // if (values.captcha === "") {
    //   errors.captcha = "Required";
    // } else if (values.captcha !== captchaResult) {
    //   errors.captcha = "Incorrect captcha result";
    // }

    return errors;
  };



  const formik = useFormik({
    initialValues: {
      "email-741": "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const bodyFormData = new FormData();
      bodyFormData.set("email-741", values["email-741"]);
      const buttonDisable = document.querySelector(".wpcf7-subscribe");
      if (buttonDisable) {
        buttonDisable.setAttribute("disabled", "disabled")
        buttonDisable.classList.add("button-disabled")
      }

      axios({
        method: "GET",
        url: `${WEBSITE_URL}/wp-json/email-verification/v1/check`,
        params: {
          email: values["email-741"],
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data)
          console.log("test", values["email-741"])
          const responseSelect = document.querySelector(".wpcf7-response-output");
          if (responseSelect) {
            if (response.data.result === "Email_Exists") {

              setFormMessage("You have already subscribed.");
              responseSelect.style.display = "block";
              console.log("Validation", buttonDisable)
              buttonDisable.removeAttribute("disabled");
              buttonDisable.classList.remove("button-disabled")

            } else if (response.data.result === "Email_Not_Exist") {
              axios({
                method: "post",
                url: `${WEBSITE_URL}/wp-json/contact-form-7/v1/contact-forms/85/feedback`,
                data: bodyFormData,
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              })
                .then((response) => {
                  console.log("Email sent successfully:", response.data);
                  if (response.data.status === "validation_failed") {
                    responseSelect.style.display = "block";
                    setFormMessage(response.data.message);
                    buttonDisable.removeAttribute("disabled");
                    buttonDisable.classList.remove("button-disabled")
                  } else if (response.data.status === "mail_sent") {
                    responseSelect.style.display = "none";
                    setFormMessage("");
                    buttonDisable.removeAttribute("disabled");
                    buttonDisable.classList.remove("button-disabled")
                    // navigate("/subscription-thank-you/");
                  }
                })
                .catch((error) => console.error("Error sending email:", error));
            }
          }
        })
        .catch((error) => console.error("Error", error));

    },
  });


  useEffect(() => {
    function handleScroll() {
      if (typeof window !== "undefined") {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        var scrolltotop = document.querySelector("#scrollUp");

        if (!scrolltotop) return;

        if (scrollPosition > 300) {
          scrolltotop.classList.add("show-to-top");
        } else {
          if (scrolltotop.classList.contains("show-to-top")) {
            scrolltotop.classList.remove("show-to-top");
          }
        }
      }
    }

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const scrollToTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };


  useEffect(() => {
    // Disable cut, copy, and paste
    document.oncut = () => false;
    document.oncopy = () => false;
    document.onpaste = () => false;

    // Disable mouse right-click
    document.oncontextmenu = () => false;

    // Disable screen capture

    function handleKeyUp(e) {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
      }
    }
    document.addEventListener('keyup', handleKeyUp);

    // Disable printing with Ctrl+P
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === 'p') {
        alert('This section is not allowed to print or export to PDF');
        e.preventDefault();
        e.stopPropagation();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup event listeners if needed
      document.oncut = null;
      document.oncopy = null;
      document.onpaste = null;
      document.oncontextmenu = null;
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* <!-- FOOTER Starts --> */}
      <footer>
        <div className="container">
          <div className="col1">
            <div className="footer-logo-wrapper">
              {options && options.mainLogo && (
                <a href="/" className="footer-logo">
                  <img
                    width="201"
                    height="99"
                    src={options.mainLogo.mediaItemUrl}
                    alt="Innserspace"
                  />
                </a>
              )}

              <p className="baseline">
                {options && options.germanKitchenText}
              </p>
            </div>
            <div className="subscribe-wrapper">
              <div id="subscription">
                <div
                  className="wpcf7 js"
                  id="wpcf7-f85-o1"
                  lang="en-US"
                  dir="ltr"
                >
                  <Formik>
                    <>
                      <form
                        onSubmit={formik.handleSubmit}
                        className="wpcf7-form init"
                        aria-label="Contact form"
                        noValidate="novalidate"
                        data-status="init"
                      >
                        <div className="sub-wrap">
                          <div className="input-wrapper">
                            <span
                              className="wpcf7-form-control-wrap"
                              data-name="email-741"
                            >
                              <input
                                size="40"
                                className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                                aria-required="true"
                                aria-invalid="false"
                                placeholder="Subscribe"
                                value={formik.values[['email-741'].name]}
                                onChange={formik.handleChange}
                                type="email"
                                name="email-741"
                              />
                            </span>

                            <button
                              type="submit"
                              className="wpcf7-submit wpcf7-subscribe"
                            ></button>
                          </div>

                        </div>
                        <div
                          className="wpcf7-response-output"
                          aria-hidden="true"
                        ></div>
                      </form>
                      {formMessage && (
                        <div
                          className="wpcf7-response-output"
                          aria-hidden="true"
                          style={{ color: "red" }}
                        >
                          {formMessage}
                        </div>
                      )}
                    </>
                  </Formik>
                </div>
                <p className="stay-updated">
                  Stay updated with the latest designs, our portfolio and
                  designers.
                </p>
              </div>
            </div>
          </div>

          <div className="col2">
            <div className="footer-top-wrapper">
              <ul>
                {footerMenu &&
                  footerMenu.map((menuItem, index) => (
                    <li
                      key={`${index}footermenu`}
                      className="menu-item menu-item-type-post_type menu-item-object-page"
                    >
                      <NavLink to={menuItem.path}>{menuItem.label}</NavLink>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="footer-bottom-wrapper">
              <ul>
                <li>
                  <h5>visit our showroom</h5>
                  {options && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: options.visitOurShowroom,
                      }}
                    />
                  )}

                  <a
                    href="https://goo.gl/maps/CFZ4WcwBxFyuyyyU8"
                    target="_blank"
                    className="get-direction"
                    rel="noreferrer"
                  >
                    Get Directions
                  </a>
                </li>

                <li>
                  <h5>Open Hours</h5>
                  {options && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: options.openingTimes,
                      }}
                    />
                  )}
                  <h5>
                    <a href="/privacy-policy/" className="privacy-policy">
                      Privacy Policy
                    </a>
                  </h5>
                </li>

                <li>
                  <h5>speak to our designers </h5>
                  <p>
                    <a
                      className="email footer"
                      href={`mailto:${options && options.email}`}
                    >
                      {options && options.email}
                    </a>
                    <a
                      className="tel footer"
                      href={`tel:${options && options.phone_number}`}
                    >
                      {options && options.phoneNumber}
                    </a>
                  </p>
                  <div className="social-links">
                    <ul>
                      <li>
                        <a
                          href="https://www.facebook.com/Innerspace-Dubai-175580597410370"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            width="30"
                            height="30"
                            src={iconFb}
                            alt="Facebook"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/innerspacedubai/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            width="30"
                            height="30"
                            src={iconInsta}
                            alt="Instagram"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.pinterest.com/innerspace_dubai"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            width="30"
                            height="30"
                            src={iconPinterest}
                            alt="Pinterest"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/innerspace-dubai"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            width="30"
                            height="30"
                            src={iconLinkedin}
                            alt="Linkedin"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/channel/UC2dg-skuWQBtk81lH7kxlgA"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            width="30"
                            height="30"
                            src={iconYoutube}
                            alt="Youtube"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contain credits-copy">
          <div className="container">
            <div className="credits">
              Copyright&copy;. Innerspace Trading LLC
            </div>
            <div className="designed">
              Website design{" "}
              <a href="https://emqube.com/" target="_blank" rel="noreferrer">
                emQube LLC
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER Ends --> */}

      <a id="scrollUp" href="#top" title="Scroll to top" onClick={scrollToTop} style={{ "position": 'fixed', "zIndex": "2147483647", "display": "none" }}>Scroll to top</a>
    </>
  );
}

export default Footer;
