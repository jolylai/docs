import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { IntegrationsContent } from '../components/integrations';
import { MetaData, getMetaImageUrls } from '../components/common/meta';

const IntegrationsPage = ({ data, location }) => {
    // Add meta title and description for this page here to overwrite the site meta data as set in the config
    const title = `Bookmarks – Connect your favourite Tools & Apps to your site`;
    const description = `Keep your stack aligned and integrate your most used tools & apps with your Ghost site: automation, analytics, marketing, support and much more! 👉`;
    const imageUrl = getMetaImageUrls(`integrations`);

    const posts = data.allBookmarksYaml.edges;

    return (
        <React.Fragment>
            <MetaData
                data={data}
                location={location}
                type="website"
                title={title || data.site.siteMetadata.title}
                description={description || data.site.siteMetadata.description}
                image={imageUrl}
            />
            <IntegrationsContent posts={posts} location={location} />
        </React.Fragment>
    );
};

IntegrationsPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        allBookmarksYaml: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default IntegrationsPage;

export const pageQuery = graphql`
    query GhostIntegrationsQuery {
        site {
            ...SiteMetaFields
        }
        allBookmarksYaml {
            edges {
                node {
                    id
                    title
                    slug
                    tags
                    favicon
                }
            }
        }
    }
`;
