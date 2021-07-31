import { saveConsoleInStorage } from './helpers'
import { getConsole, reRenderConsole } from './useStore'
import { logTypes } from './variables'
import { safeStringify } from '@yehonadav/safestringify'
import { IConsoleMessage } from './interfaces'

export const _log = console.log
export const _info = console.info
export const _error = console.error
export const _debug = console.debug
export const _exception = console.exception
export const _trace = console.trace
export const _warn = console.warn

const sendConsoleMessage = (props: IConsoleMessage) => {
  const date = new Date()
  getConsole().logs.push(...props.messages.map(object => ({
    type: props.logLevel,
    message: safeStringify(object),
    object,
    date
  })))
}

export const setConsoleVersion = (version: string): void => {
  const message = `Console Version ${version}`;
  _log(message);
  sendConsoleMessage({ logLevel: logTypes.log, messages: [message] });
  reRenderConsole();
}

export const consoleLog = (...args: any[]) => {
  _log(...args);
  sendConsoleMessage({ logLevel: logTypes.log, messages: args });
  reRenderConsole();
}

export const consoleTrace = (...args: any[]) => {
  _trace(...args);
  sendConsoleMessage({ logLevel: logTypes.trace, messages: args });
  reRenderConsole();
}

export const consoleDebug = (...args: any[]) => {
  _debug(...args);
  sendConsoleMessage({ logLevel: logTypes.debug, messages: args });
  reRenderConsole();
}

export const consoleInfo = (...args: any[]) => {
  _info(...args);
  sendConsoleMessage({ logLevel: logTypes.info, messages: args });
  reRenderConsole();
}

export const consoleWarn = (...args: any[]) => {
  _warn(...args);
  sendConsoleMessage({ logLevel: logTypes.warn, messages: args });
  reRenderConsole();
}

export const consoleError = (...args: any[]) => {
  _error(...args);
  sendConsoleMessage({ logLevel: logTypes.error, messages: args });
  reRenderConsole();
}

export const consoleException = (...args: any[]) => {
  _exception(...args);
  sendConsoleMessage({ logLevel: logTypes.exception, messages: args });
  reRenderConsole();
}

export const consoleLogPersist = (...args: any[]) => {
  consoleLog(...args);
  saveConsoleInStorage(getConsole());
}

export const consoleTracePersist = (...args: any[]) => {
  consoleTrace(...args)
  saveConsoleInStorage(getConsole())
}

export const consoleDebugPersist = (...args: any[]) => {
  consoleDebug(...args)
  saveConsoleInStorage(getConsole())
}

export const consoleInfoPersist = (...args: any[]) => {
  consoleInfo(...args)
  saveConsoleInStorage(getConsole())
}

export const consoleWarnPersist = (...args: any[]) => {
  consoleWarn(...args)
  saveConsoleInStorage(getConsole())
}

export const consoleErrorPersist = (...args: any[]) => {
  consoleError(...args)
  saveConsoleInStorage(getConsole())
}

export const consoleExceptionPersist = (...args: any[]) => {
  consoleException(...args)
  saveConsoleInStorage(getConsole())
}

export const setDefaultLogger = () => {
  console.log = _log
  console.info = _info
  console.error = _error
  console.debug = _debug
  console.exception = _exception
  console.trace = _trace
  console.warn = _warn
}

export const setLoggerForEnabledConsole = () => {
  console.log = consoleLog
  console.trace = consoleTrace
  console.debug = consoleDebug
  console.info = consoleInfo
  console.warn = consoleWarn
  console.error = consoleError
  console.exception = consoleException
}

export const setLoggerForPersistentConsole = () => {
  console.log = consoleLogPersist
  console.trace = consoleTracePersist
  console.debug = consoleDebugPersist
  console.info = consoleInfoPersist
  console.warn = consoleWarnPersist
  console.error = consoleErrorPersist
  console.exception = consoleExceptionPersist
}

export const setLoggerFunctions = (isEnabled: boolean, isPersistent: boolean) => {
  !isEnabled
    ? setDefaultLogger()
    : isPersistent
    ? setLoggerForPersistentConsole()
    : setLoggerForEnabledConsole()
}
