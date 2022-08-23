import { useContext } from 'react'

import { MediaQueryContext } from './context'
import { MediaQueryManager } from './manager'

export function useMediaQuery() {
  const manager = new MediaQueryManager()
  const breakpoint = useContext(MediaQueryContext)

  const queriesKeys = Object.keys(manager.getMediaQueries())

  return {
    get breakpoint() {
      return breakpoint
    },

    isGreaterThan(input: string) {
      const currentIndex = queriesKeys.indexOf(this.breakpoint)
      const breakpointIndex = queriesKeys.indexOf(input)

      if (breakpointIndex === -1) {
        return false
      }

      return breakpointIndex > currentIndex
    },

    isGreaterOrEquals(input: string) {
      return this.isGreaterThan(input) || this.match(input)
    },

    isLessThan(input: string) {
      const currentIndex = queriesKeys.indexOf(this.breakpoint)
      const breakpointIndex = queriesKeys.indexOf(input)

      if (breakpointIndex === -1) {
        return false
      }

      return breakpointIndex < currentIndex
    },

    match(input: string) {
      return breakpoint === input
    },

    matches(...input: string[]) {
      return input.includes(breakpoint)
    },
  }
}
