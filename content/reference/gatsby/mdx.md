---
title: 'MDX'
date: '2019-05-10'
keywords:
    - 'gatsby'
sidebar: 'gatsby'
---

## Add Dependence

```bash
yarn add gatsby-mdx
```

## Source from the filesystem

```js
// gatsby-config.js

module.exports = {
    plugins: [
        // Add support for *.mdx files in gatsby
        'gatsby-mdx',

        // Add a collection called "posts" that looks
        // for files in content/posts/
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/content/posts/`,
            },
        },
    ],
};
```

## Add MDX Files

Before you can write any GraphQL queries and programmatically create pages, you need to add some content.

```bash
mkdir -p content/posts
touch content/posts/blog-{1,2}.mdx
```

Open up each of the files you just created and add some content.

```
---
title: "Blog Post 1"
---

Trying out MDX
```

## Generate slugs

Since MDX posts are being sourced outside of `src/pages`, each post needs to be given a slug which tells Gatsby the URL to render to.

```js
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    // We only want to operate on `Mdx` nodes. If we had content from a
    // remote CMS we could also check to see if the parent node was a
    // `File` node here
    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode });

        // You can get what you create by GraphiQL, reference next step
        createNodeField({
            // Name of the field you are adding
            name: 'slug',
            // Individual MDX node
            node,
            // Generated value based on filepath with "blog" prefix. We
            // don't need a separating "/" before the value because
            // createFilePath returns a path with the leading "/".
            value: `/blog${value}`,
        });
    }
};
```

`createFilePath` is a function from gatsby-source-filesystem that translates file paths to usable URLs.

`onCreateNode` is a Gatsby lifecycle method that gets called whenever a new node is created. In this case only Mdx nodes are touched.

## GraphiQL

```bash
query {
  allMdx {
    edges {
      node {
        id
        fields {
          # Slug field created in the last section
          # You can get what you create by createNodeField at last step
          slug
        }
      }
    }
  }
}
```

## Create pages

```js
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        resolve(
            // query all mdx you add
            graphql(
                `
                    {
                        allMdx {
                            edges {
                                node {
                                    id
                                    fields {
                                        slug
                                    }
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                // this is some boilerlate to handle errors
                if (result.errors) {
                    console.error(result.errors);
                    reject(result.errors);
                }

                // We'll call `createPage` for each result
                result.data.allMdx.edges.forEach(({ node }) => {
                    createPage({
                        // This is the slug we created before
                        // (or `node.frontmatter.slug`)
                        path: node.fields.slug,
                        // This component will wrap our MDX content
                        component: path.resolve(`./src/components/posts-page-layout.js`),
                        // We can use the values in this context in
                        // our page layout component
                        // like:
                        // mdx(fields: { slug: { eq: $slug } }) {
                        //     id
                        //     frontmatter {
                        //       title
                        //     }
                        //     code {
                        //       body
                        //     }
                        //   }
                        // }
                        context: { slug: node.fields.slug },
                    });
                });
            })
        );
    });
};
```

## Make a template

```js
// /src/templates/markdown/post.js
import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

function PageTemplate({ data: { mdx } }) {
    return (
        <div>
            <h1>{mdx.frontmatter.title}</h1>
            <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </div>
    );
}

export const pageQuery = graphql`
    query BlogPostQuery($id: String) {
        mdx(id: { eq: $id }) {
            id
            frontmatter {
                title
            }
            code {
                body
            }
        }
    }
`;
```
