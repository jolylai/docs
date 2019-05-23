import React from 'react';
import PropTypes from 'prop-types';

import { Box, Icon } from '../common';
import { urlRegex } from '../../../utils/urls';

const IntegrationBox = ({ post, hit }) => {
    const url = post ? post.slug : hit.url;
    const title = post ? post.title : hit.title;
    const favicon = post ? post.favicon : hit.favicon;

    return (
        <Box
            href={url}
            className="flex flex-column justify-center items-center w-100 h30 pa3 tc tdn darkgrey bg-white shadow-2"
            elevation="2"
            radius="4"
        >
            <div className="flex justify-center items-center h10 w13 mt1">
                {urlRegex.test(favicon) ? (
                    <img
                        className="w-100 h-100"
                        style={{ objectFit: `contain` }}
                        src={favicon}
                        alt={title}
                    />
                ) : (
                    <Icon name={favicon} className="w-100 h-100" style={{ objectFit: `contain` }} />
                )}
            </div>
            <div className="f8 mt3">{title}</div>
        </Box>
    );
};

IntegrationBox.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        feature_image: PropTypes.string,
        slug: PropTypes.string,
    }),
    hit: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
    }),
    section: PropTypes.string.isRequired,
};

export default IntegrationBox;
