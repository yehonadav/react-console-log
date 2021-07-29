import { ConsoleState, State } from './types'
import { persistLocal } from '@yehonadav/safestorage'
import { persistId } from './variables'
import { logger } from './service'
import { setConsoleStoreState } from './useStore'

export const saveConsoleInStorage = (console: ConsoleState): void => {
  persistLocal.setItem(persistId, console)
}

export const initConsoleState = (): ConsoleState => {
  let consoleLogs = persistLocal.tryToGetItem(persistId).value as ConsoleState | undefined

  if (!consoleLogs) {
    consoleLogs = { logs: [] };
    saveConsoleInStorage(consoleLogs);
  }

  else
    consoleLogs.logs.forEach(log => {log.date = new Date(log.date)});

  return consoleLogs
}

export const clearConsole = (): void => setConsoleStoreState((s: State) => {
  logger.clear()
  return { console: { ...s.console, logs: [] } }
});