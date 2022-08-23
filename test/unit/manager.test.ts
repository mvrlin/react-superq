import { MediaQueryManager } from '~/manager'

describe('MediaQueryManager', () => {
  beforeEach(() => {
    // @ts-ignore
    MediaQueryManager._instance = undefined
  })

  it('should use the same instance', () => {
    const managerA = new MediaQueryManager()
    const managerB = new MediaQueryManager()

    expect(managerA === managerB).toBeTruthy()
  })

  describe('getMediaQueries', () => {
    it('should generate and cache queries', () => {
      const manager = new MediaQueryManager()

      expect(manager.getMediaQueries()).toBe(manager.getMediaQueries())
      expect(manager.getMediaQueries()).toMatchSnapshot()
    })
  })

  describe('usePreset', () => {
    it('should use presets', () => {
      const manager = new MediaQueryManager()
      manager.usePreset('tailwind')

      expect(manager.getMediaQueries()).toMatchSnapshot()
    })
  })

  describe('detectBreakpoint', () => {
    it('should detect breakpoint by cookie', async () => {
      const cookieName = 'mq'

      const manager = new MediaQueryManager({ cookieName }).usePreset('tailwind')
      const breakpoint = await manager.detectBreakpoint(`${cookieName}=xs`)

      expect(breakpoint).toBe('xs')
    })

    it('should detect breakpoint by user-agent', async () => {
      const userAgent =
        'Mozilla/5.0 (iPad; CPU OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/103.0.5060.63 Mobile/15E148 Safari/604.1'

      const manager = new MediaQueryManager().usePreset('tailwind')
      const breakpoint = await manager.detectBreakpoint('', userAgent)

      expect(breakpoint).toBe('md')
    })

    it('should fallback to default breakpoint', async () => {
      const fallbackBreakpoint = 'lg'

      const manager = new MediaQueryManager({ fallbackBreakpoint }).usePreset('tailwind')
      const breakpoint = await manager.detectBreakpoint()

      expect(breakpoint).toBe(fallbackBreakpoint)
    })
  })
})
