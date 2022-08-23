import type { MediaQueryManagerOptions } from './manager'

export const PRESET_BASE: Partial<MediaQueryManagerOptions> = {
  breakpoints: {
    desktop: 1024,
    desktopMedium: 1280,
    desktopWide: 1600,

    mobile: 320,
    mobileMedium: 375,
    mobileWide: 425,

    tablet: 768,
  },

  defaultBreakpoints: {
    desktop: 'desktop',
    mobile: 'mobile',
    tablet: 'tablet',
  },

  fallbackBreakpoint: 'desktop',
}

export const PRESET_TAILWIND: Partial<MediaQueryManagerOptions> = {
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  defaultBreakpoints: {
    desktop: 'lg',
    mobile: 'xs',
    tablet: 'md',
  },

  fallbackBreakpoint: 'lg',
}

export const PRESETS = {
  base: PRESET_BASE,
  tailwind: PRESET_TAILWIND,
}
