import { setConsoleStoreState } from './useStore'
import { State } from './types'
import { logger } from './service'

export const clearConsole = (): void => setConsoleStoreState((s: State) => {
  logger.clear()
  return { console: { ...s.console, logs: [] } }
})