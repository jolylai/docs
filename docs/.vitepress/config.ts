import { defineConfig, loadEnv } from 'vitepress'

import pkg from '../../package.json'
import { createSidebar } from './sidebar'

const env = loadEnv(process.env.NODE_ENV!, process.cwd())

export default defineConfig({
  title: 'FeDocs',
  description: 'Docs of front end developer',
  lastUpdated: true,
  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },
    outline: 'deep',
    nav: [
      {
        text: 'Node.js',
        link: '/nodejs/guide/',
        activeMatch: '^/nodejs/',
      },
      // {
      //   text: 'Tools',
      //   link: '/tools/markdown-it/',
      //   activeMatch: '^/tools/',
      // },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: 'Changelog',
            link:
              'https://github.com/jolylai/docs/blob/master/CHANGELOG.md',
          },
        ],
      },
    ],
    sidebar: createSidebar(),
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jolylai/docs',
      },
    ],
  },
  markdown: {

  },

  head: [
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { name: 'keywords', content: 'vitepress' }],
    ['meta', { name: 'author', content: 'jolylai' }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { name: 'application-name', content: 'FeDocs' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'FeDocs' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],

    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#06f' }],
    ['meta', { name: 'theme-color', content: '#06f' }],

    ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/icons/apple-touch-icon.png' }],

    // webfont
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    // og
    ['meta', { property: 'og:description', content: '一站式前端知识体系，Vue 生态。' }],
    // ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // analytics
    ['script', { 'async': '', 'defer': '', 'data-website-id': `${env.VITE_UMAMI_WEBSITE_ID || ''}`, 'src': `${env.VITE_UMAMI_ENDPOINT || ''}` }],
  ],

})
