import { setConsoleStoreState } from './useStore'
import { ConsoleState, State } from './types'
import { logger } from './service'
import { saveConsoleInStorage } from './helpers'

export const clearConsole = (): void => setConsoleStoreState((s: State) => {
  logger.clear();
  const consoleState: ConsoleState = { ...s.console, logs: [] };
  saveConsoleInStorage(consoleState)
  return { console: consoleState }
})