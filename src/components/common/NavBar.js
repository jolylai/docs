import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { Spirit } from '../../styles/spirit-styles';
import { SearchModal } from './search';

const NavBar = ({ theme }) => {
    // Theme definitions
    const themeClasses = {
        dark: {
            menuItem: `middarkgrey-l1 link hover-blue nowrap`,
            logoTheme: `dark`,
            docsTitleClass: `blue`,
            searchBox: `bg-darkgrey-searchbar middarkgrey dark-placeholder`,
            icon: `fill-midlightgrey`,
        },
        light: {
            menuItem: Spirit.link.white,
            logoTheme: `light`,
            docsTitleClass: `white`,
            searchBox: `bg-white-10 white white-placeholder`,
            icon: `fill-white`,
        },
    };

    return (
        <nav
            className={`${
                Spirit.page.xl
            } flex flex-auto flex-nowrap items-center justify-between pt2 pb2`}
            data-cy="header-navigation"
        >
            <div className="flex items-center pt3 pb3 nudge-bottom--2 w-sidebar-l pr8">
                <Link
                    to="/"
                    className={`${
                        themeClasses[theme].docsTitleClass
                    } relative ma0 ml4 pa0 pl4 f6 lh-1-5 fw4 link nudge-top--1`}
                >
                    Docs
                </Link>
            </div>
            {/* navbar-container wrapper element and bottom padding is needed to hide the horizontal scrollbar on smaller screensizes */}
            <div className="navbar-container">
                <div className="dn flex-ns flex-auto items-center overflow-x-auto mr12 mr0-l ml5 ml0-l pb20">
                    <Link
                        to="/concepts/introduction/"
                        className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l nl3`}
                    >
                        Concepts
                    </Link>
                    <Link
                        to="/setup/"
                        className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}
                    >
                        Setup
                    </Link>
                    <Link
                        to="/reference/"
                        className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}
                    >
                        Reference
                    </Link>
                    <Link
                        to="/bookmarks/"
                        className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}
                    >
                        Bookmarks
                    </Link>
                    
                    <Link
                        to="/tutorials/"
                        className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}
                    >
                        Tutorials
                    </Link>
                    <Link
                        to="/faq/"
                        className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}
                    >
                        FAQ
                    </Link>
                </div>
            </div>
            <div className="relative pl3">
                <SearchModal theme={themeClasses[theme]} />
            </div>
        </nav>
    );
};

NavBar.defaultProps = {
    theme: `dark`,
};

NavBar.propTypes = {
    theme: PropTypes.oneOf([`dark`, `light`]),
};

export default NavBar;
