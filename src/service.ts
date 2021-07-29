import { setConsoleVersion } from './actions'
import { Logger } from './types'

try {
  window.console = console;
}
catch (e) {
  console.warn({
    window: {
      message: "failed to set window.console",
    }
  })
}

const logger = console as Logger;

logger.setVersion = setConsoleVersion;

export {
  logger
}