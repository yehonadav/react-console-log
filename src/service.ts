import {getConsole, logTypes, reRenderConsole} from "./useStore";
import { safeStringify } from "@yehonadav/safestringify";

const _log = console.log;
const _info = console.info;
const _error = console.error;
const _debug = console.debug;
const _exception = console.exception;
const _trace = console.trace;
const _warn = console.warn;

const setConsoleVersion = (version:string):void => {
  const message = `Console Version ${version}`;
  _log(message);
  getConsole().logs.splice(0, 0, {
    type: logTypes.log,
    message,
    object: message,
    date: new Date(),
  });
  reRenderConsole();
}

console.log = (...args: any[]) => {
  _log(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.log,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

console.trace = (...args: any[]) => {
  _trace(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.trace,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

console.debug = (...args: any[]) => {
  _debug(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.debug,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

console.info = (...args: any[]) => {
  _info(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.info,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

console.warn = (...args: any[]) => {
  _warn(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.warn,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

console.error = (...args: any[]) => {
  _error(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.error,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

console.exception = (...args: any[]) => {
  _exception(...args);
  getConsole().logs.push(...args.map(object=>({
    type: logTypes.exception,
    message: safeStringify(object),
    object,
    date: new Date(),
  })));
  reRenderConsole();
};

try {
  window.console = console;
} catch (e) {
  console.warn({
    window: {
      message: "failed to set window.console",
    }
  })
}

export type Logger = Console & {
  setVersion: (version:string) => void;
}

// @ts-ignore
const logger: Logger = console;

logger.setVersion = setConsoleVersion;

export {
  logger
}