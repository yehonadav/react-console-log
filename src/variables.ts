import { LogType } from './types'

export const version = "1.1.0";

export const logTypes: Record<LogType, LogType> = {
  log: 'log',
  info: 'info',
  error: 'error',
  debug: 'debug',
  exception: 'exception',
  trace: 'trace',
  warn: 'warn'
}

export const persistOptionsName = 'useConsoleStore';

export const persistId = `${persistOptionsName}-console-logs`;