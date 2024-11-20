import type { Plugin } from 'vitepress'
import { defineGenerator, transform } from 'automd'

import { md } from 'mdbox'
import { createFilter } from 'vite'

const INSTALL_COMMANDS = [
  ['pnpm', 'install'],
  ['npm', 'install'],
  ['yarn', 'add'],
  ['bun', 'install'],
] as const

export const install = defineGenerator({
  name: 'install',
  generate({ args }) {
    const { name } = args

    if (!name) {
      return {
        contents: '<!-- package name is unspecified -->',
      }
    }

    const contents = INSTALL_COMMANDS.map(
      ([cmd, install]) => {
        const code = `${cmd} ${install}${args.dev ? ' -D' : ''} ${name}`
        return md.codeBlock(code, 'sh', { ext: `[${cmd}]` })
      },
    )

    const codeGroup = `::: code-group\n${contents.join('\n\n')}\n:::`

    return { contents: codeGroup }
  },
})

export function automdPlugin(): Plugin {
  const filter = createFilter(/\.md$/)

  return {
    name: 'auto-md-plugin',
    enforce: 'pre',
    async transform(code, id) {
      if (filter(id)) {
        const transformedCode = await transform(code, { generators: { install } })

        return transformedCode.contents
      }

      return code
    },
  }
}
