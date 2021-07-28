import createStore from "zustand";
import {getStorageCall, clearDataService, persistLocal} from "@yehonadav/safestorage";
import {persist} from "zustand/middleware";
import { logger, setLoggerFunctions } from './service'

export type LogType =
  "log" |
  "info" |
  "error" |
  "debug" |
  "exception" |
  "trace" |
  "warn";

export const logTypes: Record<LogType, LogType> = {
  log: "log",
  info: "info",
  error: "error",
  debug: "debug",
  exception: "exception",
  trace: "trace",
  warn: "warn",
}

export type LogMessage = {
  type: LogType;
  date: Date;
  message: string;
  object: any
}

export type ConsoleState = {
  logs: LogMessage[];
}

export type State = {
  console: ConsoleState,
  open: boolean;
  persist: boolean;
  enabled: boolean;
}

const persistOptionsName = "useConsoleStore";
const persistId = `${persistOptionsName}-console-logs`;

export const saveConsoleInStorage = (console:ConsoleState):void => {
  persistLocal.setItem(persistId, console);
}

const initConsoleState = ():ConsoleState => {
  let consoleLogs = persistLocal.tryToGetItem(persistId).value;

  if (!consoleLogs) {
    consoleLogs = { logs: [] };
    saveConsoleInStorage(consoleLogs);
  }

  return consoleLogs;
}

export const state:State = {
  console: initConsoleState(),
  open: false,
  persist: false,
  enabled: false,
};

export const stateCreator = ():State => state;

// persist options
export const persistOptions: { name: string; whitelist: (keyof State)[]; getStorage: typeof getStorageCall } = {
  name: persistOptionsName, // set a unique name
  whitelist: ["console", 'open', 'persist', 'enabled'],
  getStorage: getStorageCall,
};

// create store
export const useConsoleStore = createStore<State>(persist(
  stateCreator,
  persistOptions,
));

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);
clearDataService.excludeLocalStorageItem(persistId);

// getters
export const get = useConsoleStore.getState;
export const getConsole = ():ConsoleState => get().console;
export const isConsolePersistent = ():boolean => get().persist;
export const isConsoleOpen = ():boolean => get().open;
export const isConsoleEnabled = ():boolean => get().enabled;

// setters
export const set = useConsoleStore.setState;
export const setConsolePersistent = (persist:boolean):void => {setLoggerFunctions(isConsoleEnabled(), persist); set({persist})};
export const setConsoleOpen = (open:boolean):void => set({open});
export const setConsoleEnabled = (enabled:boolean):void => {setLoggerFunctions(enabled, isConsolePersistent()); set({enabled})};
export const setConsolePersistentTrue = ():void => setConsolePersistent(true);
export const setConsoleOpenTrue = ():void => setConsoleOpen(true);
export const setConsoleEnabledTrue = ():void => setConsoleEnabled(true);
export const setConsolePersistentFalse = ():void => setConsolePersistent(false);
export const setConsoleOpenFalse = ():void => setConsoleOpen(false);
export const setConsoleEnabledFalse = ():void => setConsoleEnabled(false);
export const toggleConsolePersistent = ():void => setConsolePersistent(!get().persist);
export const toggleConsoleOpen = ():void => setConsoleOpen(!get().open);
export const toggleConsoleEnabled = ():void => setConsoleEnabled(!get().enabled);

// actions
export const reRenderConsole = ():void => set((s:State)=>({console:{...s.console}}));

export const clearConsole = ():void => set((s:State) => {
  logger.clear();
  return {console:{...s.console, logs: []}}
})

// helpers
const fetchConsole = (s:State) => s.console;
const fetchIsConsolePersistent = (s:State) => s.persist;
const fetchIsConsoleOpen = (s:State) => s.open;
const fetchIsConsoleEnabled = (s:State) => s.enabled;

// hooks
export const useConsole = ():ConsoleState => useConsoleStore(fetchConsole);
export const useIsConsolePersistent = ():boolean => useConsoleStore(fetchIsConsolePersistent);
export const useIsConsoleOpen = ():boolean => useConsoleStore(fetchIsConsoleOpen);
export const useIsConsoleEnabled = ():boolean => useConsoleStore(fetchIsConsoleEnabled);