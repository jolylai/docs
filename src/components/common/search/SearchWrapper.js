import React from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

const SearchWrapper = ({ children }) => (
    <InstantSearch appId="CALYUGORL9" apiKey="a911900adc9da386591fbcaa2739546a" indexName="faq">
        <Configure attributesToSnippet="html" />
        {children}
    </InstantSearch>
);

SearchWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SearchWrapper;
