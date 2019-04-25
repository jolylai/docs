const createPages = require(`./gatsby/createPages`);
const onCreateNode = require(`./gatsby/onCreateNode`);

exports.createPages = ({ graphql, actions }) =>
    // eslint-disable-next-line
    Promise.all([
        createPages.createRedirects({ actions }),
        // createPages.createGhostPages({ graphql, actions }),
        createPages.createMarkdownPages({ graphql, actions }),
    ]);

exports.onCreateNode = async ({ node, getNode, actions }) =>
    // eslint-disable-next-line
    await onCreateNode.createMarkdownNodeFields({ node, getNode, actions });
