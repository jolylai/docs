module.exports.urlForMarkdown = (node, fallback) => {
    // Passing a `path` property in frontmatter will overwrite the
    // slug that we build from the folder structure

    let slug = node.frontmatter.path ? node.frontmatter.path : fallback;

    // Remove the version slug from the latest API version docs
    // TODO: use env config to add latest API version
    if (slug.match(/\/api\/v2\/\S*/i)) {
        slug = slug.replace(/\/v2/, ``);
    }

    return slug;
};

// Create a Gatsby-style URL for resources in Ghost. These are currently the same but they might not always be
module.exports.urlForGhostPost = (postNode, section) => `/${section}/${postNode.slug}/`;
module.exports.urlForGhostTag = (tagNode, section) => `/${section}/${tagNode.slug}/`;

// eslint-disable-next-line
module.exports.urlRegex = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
