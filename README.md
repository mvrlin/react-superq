[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

# 🌈&nbsp; React Super Simple Media Queries
> Easy-to-use media queries for your [React](https://reactjs.org/) project

## Features

- ⚡️&nbsp; Fast & Light with [MatchMedia API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) ⚡️
- 🕶&nbsp; Auto detects the device viewport from Cookie & User-Agent
- 👌&nbsp; Zero configuration to start
- 👴️&nbsp; Supports IE9+

## Quick Setup

1. Add `react-superq` dependency to your project

```bash
# Using npm
npm add react-superq
# Using yarn
yarn add react-superq
# Using pnpm
pnpm add react-superq
```

2. Wrap your application with `MediaQueryProvider`

```diff
+ import { MediaQueryProvider } from 'react-superq'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
+   <MediaQueryManager>
      <App />
+   </MediaQueryManager>
  </React.StrictMode>
)
```

3. Use `useMediaQuery` in any component!

```tsx
// App.tsx

import React, { useMemo } from 'react'
import { useMediaQuery } from 'react-superq'

const App: React.FC = () => {
  const mediaQuery = useMediaQuery()

  // You can use it in your code.
  const isDesktopOrHigher = useMemo(() => {
    return mediaQuery.isLessThan('desktop') && mediaQuery.isGreaterThan('mobileWide')
  }, [mediaQuery.breakpoint])

  return (
    <div>
      <h1>This is my App!</h1>

      {/* Or directly in the markup! */}
      {mediaQuery.isLessThan('tablet') && <div>I will be visible only on mobile!</div>}
    </div>
  )
}
```

## Quick Setup for Next.JS

1. Add `react-superq` dependency to your project

```bash
# Using npm
npm add react-superq
# Using yarn
yarn add react-superq
# Using pnpm
pnpm add react-superq
```

2. Wrap your application with `MediaQueryProvider` & initialize the `MediaQueryManager` (for SSR)

**Before**
```tsx
// pages/_app.tsx

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
```

**After**
```tsx
// pages/_app.tsx

import { MediaQueryManager, MediaQueryProvider } from 'react-superq'

type InitialProps = {
  contextBreakpoint: string
}

const mediaQueryManager = new MediaQueryManager()

function MyApp({ Component, contextBreakpoint, pageProps }: AppProps & InitialProps) {
  return (
    <MediaQueryProvider contextBreakpoint={contextBreakpoint}>
      <Component {...pageProps} />
    </MediaQueryProvider>
  )
}

// Detect the breakpoint on the server.
MyApp.getInitialProps = async ({ ctx }: AppContextType) => {
  const contextBreakpoint = await mediaQueryManager.detectBreakpoint(
    ctx.req?.headers.cookie,
    ctx.req?.headers['user-agent'],
  )

  return {
    contextBreakpoint,
  } as InitialProps
}
```

## Tune-up the `MediaQueryManager`
> **Note**\
> You can initialize an endless amount of `MediaQueryManager`, but each new one will refer to the first one.

```ts
const mediaQueryManager = new MediaQueryManager({
  // ...
})
```

## Configuration

### `breakpoints`

- Type: Object

An object where the key is the name of the mediaQuery, and the value is the breakpoint size.

### `cookieName`

- Type: String
- Default: `breakpoint`

The key for the document cookie.

### `defaultBreakpoints`

- Type: Object
- Detectable devices: `console`, `desktop`, `embedded`, `mobile`, `smarttv`, `tablet`, `wearable`

An object where the key is the name of the detected device, and the value is the breakpoint key.

### `fallbackBreakpoint`

- Type: String
- Default: `desktop`

The breakpoint key to be used, if the device was not detected.

## Default configuration

```ts
{
  breakpoints: {
    desktop: 1024,
    desktopMedium: 1280,
    desktopWide: 1600,

    mobile: 320,
    mobileMedium: 375,
    mobileWide: 425,

    tablet: 768,
  },

  cookieName: 'breakpoint',

  defaultBreakpoints: {
    desktop: 'desktop',
    mobile: 'mobile',
    tablet: 'tablet',
  },

  fallbackBreakpoint: 'desktop',
}
```

## Presets

* [Base](src/presets.ts#L3)
* [TailwindCSS](src/presets.ts#L25)


## API

### `MediaQueryManager`
* `detectBreakpoint(cookie?: string, userAgent?: string): Promise<string>`
* `getMediaQueries(): Record<string, string>`
* `usePreset(key: keyof typeof PRESETS): MediaQueryManager<Record<string, number>>`

### `MediaQueryManagerOptions`
* `defaultBreakpoints: Partial<Record<'console' | 'desktop' | 'embedded' | 'mobile' | 'smarttv' | 'tablet' | 'wearable', string>>`
* `breakpoints: Record<string, number>`
* `cookieName: string`
* `fallbackBreakpoint: string`

### `useMediaQuery`
* `readonly breakpoint: string`
* `isGreaterThan(input: string): boolean`
* `isGreaterOrEquals(input: string): boolean`
* `isLessThan(input: string): boolean`
* `match(input: string): boolean`
* `matches(...input: string[]): boolean`

## License

[MIT License](./LICENSE)

Copyright (c) mvrlin mvrlin@pm.me

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/react-superq/latest.svg?style=for-the-badge
[npm-version-href]: https://npmjs.com/package/react-superq

[npm-downloads-src]: https://img.shields.io/npm/dt/react-superq.svg?style=for-the-badge
[npm-downloads-href]: https://npmjs.com/package/react-superq

[license-src]: https://img.shields.io/npm/l/react-superq.svg?style=for-the-badge
[license-href]: https://npmjs.com/package/react-superq
