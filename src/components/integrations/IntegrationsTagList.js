import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

// import { getTagsforPostCollection } from '../../utils/getTagsforPostCollection';

const getBookmarkTags = arr =>
    // eslint-disable-next-line
    arr.reduce((tags, cur) => {
        const set = new Set([...tags, ...cur.node.tags]);
        return Array.from(set);
    }, []);

const IntegrationsTagList = ({ location, data }) => {
    // When the search is active, we set the "All integrations" link as active and
    // overwrite the real active link as long as the search is active
    const activeLocation = `${location.pathname}${location.search}`;

    const tags = getBookmarkTags(data.allBookmarksYaml.edges);

    // Add a default tag for "All Integrations" at first place, which
    // links back to the general integrations page
    tags.unshift(`All`);

    return (
        <React.Fragment>
            <h3 className="ma0 mb2" data-cy="filter">
                Filter by
            </h3>
            {tags.map((tag, i) => {
                const to = `${location.pathname}?${String(tag).toLowerCase()}`;
                const dynamicClass = activeLocation === to ? `blue fw6` : `midgrey`;
                return (
                    <Link
                        to={to}
                        className={`${dynamicClass} link pa2 pl0`}
                        key={i}
                        data-cy={`${tag.slug}-filter`}
                    >
                        {tag}
                    </Link>
                );
            })}
        </React.Fragment>
    );
};

IntegrationsTagList.propTypes = {
    location: PropTypes.object.isRequired,
    searchActive: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        allBookmarksYaml: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    post: PropTypes.shape({
                        tag: PropTypes.arrayOf(
                            PropTypes.shape({
                                name: PropTypes.string,
                                slug: PropTypes.string,
                            })
                        ),
                    }),
                }).isRequired
            ).isRequired,
        }).isRequired,
    }).isRequired,
};

const IntegrationTagsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostIntegrationsTagsQuery {
                allBookmarksYaml(sort: { order: ASC, fields: [published_at] }, limit: 100) {
                    edges {
                        node {
                            tags
                        }
                    }
                }
            }
        `}
        render={data => <IntegrationsTagList data={data} {...props} />}
    />
);
export default IntegrationTagsQuery;
