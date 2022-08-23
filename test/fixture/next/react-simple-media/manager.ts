import { PRESETS, PRESET_BASE } from './presets'
import { parseCookie } from './utils'

export type MediaQueryManagerOptions = {
  defaultBreakpoints: Partial<
    Record<'console' | 'desktop' | 'embedded' | 'mobile' | 'smarttv' | 'tablet' | 'wearable', string>
  >

  breakpoints: Record<string, number>

  cookieName: string
  fallbackBreakpoint: string
}

const DEFAULT_OPTIONS: Partial<MediaQueryManagerOptions> = {
  ...PRESET_BASE,
  cookieName: 'breakpoint',
}

export class MediaQueryManager {
  private static _instance: MediaQueryManager
  private queries: Record<string, string> = {}

  options: Partial<MediaQueryManagerOptions>

  constructor(options: Partial<MediaQueryManagerOptions> = {}) {
    if (!MediaQueryManager._instance) {
      MediaQueryManager._instance = this
      MediaQueryManager._instance.options = { ...DEFAULT_OPTIONS, ...options }
    }

    return MediaQueryManager._instance
  }

  private get instance() {
    return MediaQueryManager._instance
  }

  async detectBreakpoint(cookie = '', userAgent = '') {
    const cookies = parseCookie(cookie)

    let breakpoint = cookies[this.options.cookieName]

    if (this.options.breakpoints?.[breakpoint]) {
      return breakpoint
    }

    const { default: UAParser } = await import(/* webpackChunkName: "ua-parser-js" */ 'ua-parser-js')
    const parser = new UAParser(userAgent)

    const { type: deviceType = '' } = parser.getDevice()

    if (this.options.defaultBreakpoints?.[deviceType]) {
      breakpoint = this.options.defaultBreakpoints[deviceType]
    }

    return breakpoint || this.options.fallbackBreakpoint
  }

  getMediaQueries() {
    if (Object.keys(this.queries).length) {
      return this.queries
    }

    const breakpoints = this.options.breakpoints || {}
    let breakpointsKeys = Object.keys(breakpoints)

    if (!breakpointsKeys.length) {
      console.warn('No breakpoints specified!')
      return {}
    }

    breakpointsKeys = breakpointsKeys.sort((a, b) => breakpoints[a] - breakpoints[b])
    let i = breakpointsKeys.length

    while (i--) {
      const currentKey = breakpointsKeys[i]

      const size = breakpoints[currentKey]
      const nextSize = breakpoints[breakpointsKeys[i + 1]]

      let mediaQuery = ''

      if (i > 0) {
        mediaQuery = `(min-width: ${size}px)`
      } else {
        mediaQuery = `(min-width: 1px)`
      }

      if (nextSize) {
        mediaQuery += ` and (max-width: ${nextSize - 1}px)`
      }

      this.queries[currentKey] = mediaQuery
    }

    return this.queries
  }

  usePreset(key: keyof typeof PRESETS) {
    const preset = PRESETS[key]

    if (preset) {
      this.options = {
        ...this.options,
        ...preset,
      }
    }

    return this.instance
  }
}
