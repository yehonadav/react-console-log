import createStore from "zustand";

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
}

export const state:State = {
  console: {
    logs: [],
  }
};

export const stateCreator = ():State => state;

// create store
export const useConsoleStore = createStore<State>(stateCreator);

// getters
export const get = useConsoleStore.getState;
export const getConsole = ():ConsoleState => get().console;

// setters
export const set = useConsoleStore.setState;

// actions
export const reRenderConsole = ():void => set((s:State)=>({console:{...s.console}}));

// helpers
const fetchConsole = (s:State) => s.console;

// hooks
export const useConsole = ():ConsoleState => useConsoleStore(fetchConsole);
