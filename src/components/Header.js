import React, { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import { flatListToHierarchical } from "../utils";

import defaultlogo from "../assets/img/logo-innerspace.svg";
import { NavLink } from "react-router-dom";

const Header = ({ }) => {
    const primaryMenu = gql`
    query{
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
    `;
    const { loading, error, data } = useQuery(primaryMenu);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    var primary = flatListToHierarchical(data.menuItems.edges);

    const shortUrl = (fullUrl) => {
        var url = fullUrl;
        try {
            const urlObject = new URL(url);
            url = urlObject.pathname ? urlObject.pathname : url;
        } catch (error) {
            url = fullUrl;
        }
        return url;
    };

    const MenuItem = ({ item, level }) => {
        const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

        const toggleSubMenu = (event) => {
            var grandParent = event.target.closest(".menu-toggle");

            var parentSelector = event.target.parentNode;
            if (typeof window !== "undefined" && window.innerWidth < 821) {
                if (
                    grandParent &&
                    grandParent.classList.contains("menu-toggle") &&
                    parentSelector.classList.contains("menu-item-has-children")
                ) {
                    event.preventDefault()
                }
                setIsSubMenuOpen(!isSubMenuOpen);
            }
        };

        return (
            <li
                className={`menu-item menu-item-type-post_type menu-item-object-page ${Array.isArray(item.cssClasses) && item.cssClasses.length
                    ? item.cssClasses.join(' ')
                    : ''
                    } ${Array.isArray(item.children) && item.children.length ? 'menu-item-has-children' : ''}`}
            >
                <NavLink
                    to={item.children && item.children.length > 0 && typeof window !== "undefined" && window.innerWidth < 821 ? "/" : item.path}
                    dangerouslySetInnerHTML={{ __html: item.label }}
                    onClick={toggleSubMenu}
                />
                {item.children && item.children.length > 0 && (
                    <SubMenu items={item.children} level={level + 1} isOpen={isSubMenuOpen} />
                )}
            </li>
        );
    };

    const SubMenu = ({ items, level, isOpen }) => {
        return (
            <ul className={`sub-menu ${isOpen ? 'show' : ''} level-${level}`}>
                {items.map((item, index) => (
                    <MenuItem item={item} key={`${index}submenu2`} level={level + 1} />
                ))}
            </ul>
        );
    };


    // useEffect(() => {
    //     let menuBtn = document.querySelector(".nav-toggle");
    //     let menu = document.querySelector(".menu-toggle");

    //     function handleMenuClick() {
    //         menuBtn.classList.toggle("active");
    //         menu.classList.toggle("active");
    //     }

    //     if (menuBtn && menu) {
    //         menuBtn.addEventListener("click", handleMenuClick);
    //     }
    //     return () => {
    //         if (menuBtn && menu) {
    //             menuBtn.removeEventListener("click", handleMenuClick);
    //         }
    //     };
    // }, []);

    return (
        <>
            {/* <!-- header starts --> */}
            <header>
                <div className="container">
                    <NavLink to="/" className="logo">
                        <img width="150" height="74" style={{'background':'.'}} src={"https://app.innerspacedxb.com/wp-content/themes/Innerspacechild/img/logo-innerspace.svg"} alt="Innerspace" />
                    </NavLink>
                    <nav>
                        {primary && primary.length > 0 && (
                            <ul>
                                {primary.map((item, index) => (
                                    <MenuItem item={item} key={`${index}menu2`} />
                                ))}
                            </ul>
                        )}
                    </nav>
                </div>
            </header>
            {/* <!-- header ends */}

            {/* <!-- MOBILE Nav --> */}
            {/* <nav className="menu-toggle">
                {primary && primary.length > 0 && (
                    <ul>
                        {primary.map((item, index) => (
                            <MenuItem item={item} key={`${index}menu2`} level={1} />
                        ))}
                    </ul>
                )}
            </nav> */}
            {/* <!-- MOBILE Nav ENDS --> */}
        </>
    );
};

export default Header;
