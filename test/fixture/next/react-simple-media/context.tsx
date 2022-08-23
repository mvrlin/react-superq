import type { ReactNode } from 'react'
import React, { createContext, useEffect, useState } from 'react'

import { MediaQueryManager } from './manager'

export const MediaQueryContext = createContext('')

export type MediaQueryProviderProps = {
  children: ReactNode
  contextBreakpoint?: string
}

const COOKIE_EXPIRES_IN_DAYS = 365 * 24 * 60 * 60 * 1000

export const MediaQueryProvider: React.FC<MediaQueryProviderProps> = ({ children = [], contextBreakpoint }) => {
  const manager = new MediaQueryManager()

  const [breakpoint, setBreakpoint] = useState(contextBreakpoint || manager.options.fallbackBreakpoint)
  const mediaQueries = manager.getMediaQueries()

  function syncBreakpoint(value: string) {
    setBreakpoint(value)

    if (manager.options.cookieName) {
      const date = new Date()
      date.setTime(date.getTime() + COOKIE_EXPIRES_IN_DAYS)

      document.cookie = `${manager.options.cookieName}=${value}; SameSite=Strict; Secure; Expires=${date.toUTCString()}`
    }
  }

  useEffect(() => {
    const lists: MediaQueryList[] = []

    for (const queryKey in mediaQueries) {
      const mediaQuery = mediaQueries[queryKey]
      const mediaQueryList = window.matchMedia(mediaQuery)

      if (mediaQueryList.matches) {
        syncBreakpoint(queryKey)
      }

      mediaQueryList.onchange = (event) => {
        if (!event.matches) {
          return
        }

        syncBreakpoint(queryKey)
      }

      lists.push(mediaQueryList)
    }

    return () => {
      for (const list of lists) {
        list.onchange = null
      }
    }
  }, [])

  return <MediaQueryContext.Provider value={breakpoint}>{children}</MediaQueryContext.Provider>
}
