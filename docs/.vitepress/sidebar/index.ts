import { getNodejsSidebar } from './nodejs'
import { getToolsSidebar } from './tools'

export function createSidebar() {
  return {
    '/nodejs/': getNodejsSidebar(),
    '/tools/': getToolsSidebar(),
  }
}
