import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Spirit } from '../styles/spirit-styles';
import { Layout } from '../components/common/layout';
import { APICard } from '../components/api';
import { MetaData, getMetaImageUrls } from '../components/common/meta';

const APIPage = ({ data, location }) => {
    // Add meta title and description or this page here to overwrite the site meta data as set in the config
    const title = `Reference`;
    const description = `Comprehensive documentation of API clients, tools and libraries for working with Ghost.`;
    const imageUrl = getMetaImageUrls();

    const sectionStyles = {
        headingContainer: `col-12 col-4-ns mr10-ns`,
        cardContainer: `col-12 col-8-ns mt-vw4 mt0-ns grid-icon-boxes`,
    };

    return (
        <React.Fragment>
            <MetaData
                data={data}
                location={location}
                type="website"
                title={title}
                description={description}
                image={imageUrl}
            />
            <Layout mainClass="bg-whitegrey-l2" bodyClass="bg-white">
                <section className="bg-api-reference">
                    <div className={`${Spirit.page.xl} tc-ns pt-vw6 pt-vw5-ns pb-vw5 white`}>
                        <h1 className={`${Spirit.sectionHeading} gh-integration-header-shadow`}>
                            Reference
                        </h1>
                        <p className={Spirit.sectionSubHeading}>
                            Clients, tools and libraries for working with Ghost
                        </p>
                    </div>
                </section>

                <div className={`${Spirit.page.l} pb-vw4 pb-vw3-ns pt-vw4 pt-vw3-ns`}>
                    <div className="grid-12">
                        <div className={sectionStyles.headingContainer}>
                            <h2 id="frontend-sdk" className={`${Spirit.h3} pt20 nt20`}>
                                Baisc
                            </h2>
                            <p className={`${Spirit.small} midgrey-l2 mt2`}>
                                Frameworks for working with the Ghost API to build a publication
                                website
                            </p>
                        </div>
                        <div className={sectionStyles.cardContainer}>
                            <APICard to="/reference/html/" icon="html">
                                HTML
                            </APICard>
                            <APICard href="https://jolylai.github.io/notebook-css/" icon="css">
                                CSS
                            </APICard>
                            <APICard to="/reference/javascript/" icon="javascript-logo">
                                JavaScript
                            </APICard>
                            <APICard to="/reference/js-style/array" icon="javascript-logo-inv">
                                JS Style
                            </APICard>
                            <APICard to="/reference/lodash/flatten" icon="lodash">
                                Lodash
                            </APICard>
                        </div>
                    </div>

                    <div className="grid-12 mt-vw4 mt20-ns">
                        <div className={sectionStyles.headingContainer}>
                            <h2 id="frontend-sdk" className={`${Spirit.h3} pt20 nt20`}>
                                Frontend Frameworks
                            </h2>
                            <p className={`${Spirit.small} midgrey-l2 mt2`}>
                                Frameworks for working with the Ghost API to build a publication
                                website
                            </p>
                        </div>
                        <div className={sectionStyles.cardContainer}>
                            <APICard to="/reference/gatsby/mdx" icon="gatsby-logo">
                                Gatsby
                            </APICard>
                            <APICard to="/reference/react/" icon="react-logo">
                                React
                            </APICard>
                            <APICard to="/reference/graphql/" icon="graphql">
                                GraphQL
                            </APICard>
                            <APICard
                                to="/reference/taro/dva"
                                img="https://storage.360buyimg.com/taro-static/static/images/logo.png"
                            >
                                Taro
                            </APICard>
                        </div>
                    </div>

                    <div className="grid-12 mt-vw4 mt20-ns">
                        <div className={sectionStyles.headingContainer}>
                            <h2 id="tools" className={`${Spirit.h3} pt20 nt20`}>
                                Database
                            </h2>
                            <p className={`${Spirit.small} midgrey-l2 mt2`}>
                                Utilities to help build and manage Ghost
                            </p>
                        </div>
                        <div className={sectionStyles.cardContainer}>
                            <APICard to="/reference/mongodb/" icon="mongo">
                                MongoDB
                            </APICard>
                        </div>
                    </div>

                    <div className="grid-12 mt-vw4 mt20-ns">
                        <div className={sectionStyles.headingContainer}>
                            <h2 id="tools" className={`${Spirit.h3} pt20 nt20`}>
                                Tools
                            </h2>
                            <p className={`${Spirit.small} midgrey-l2 mt2`}>
                                Utilities to help develop
                            </p>
                        </div>
                        <div className={sectionStyles.cardContainer}>
                            <APICard to="/reference/travis/" icon="travis">
                                Travis
                            </APICard>
                            <APICard to="/reference/prettier/" icon="prettier-logo">
                                Prettier
                            </APICard>
                            <APICard to="/reference/eslint/" icon="eslint-logo">
                                Eslint
                            </APICard>
                        </div>
                    </div>

                    <div className="grid-12 mt-vw4 mt20-ns">
                        <div className={sectionStyles.headingContainer}>
                            <h2 id="client-libraries" className={`${Spirit.h3} pt20 nt18`}>
                                Client Libraries
                            </h2>
                            <p className={`${Spirit.small} midgrey-l2 mt2`}>
                                Specific libraries for interacting with the Ghost API directly
                            </p>
                            <h4 className="f-supersmall dib ma0 pa0 bg-green pa1 br-pill pl3 pr3 tc white mt2 nudge-top--2">
                                Coming soon
                            </h4>
                        </div>
                        <div className={sectionStyles.cardContainer}>
                            <APICard to="/reference/javascript/" icon="javascript-logo">
                                Pomelo-UI
                            </APICard>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    );
};

APIPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default APIPage;

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`;
