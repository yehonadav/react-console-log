import createStore from 'zustand'
import { clearDataService, getStorageCall } from '@yehonadav/safestorage'
import { persist } from 'zustand/middleware'
import { ConsoleState, PersistOptions, State } from './types'
import { persistId, persistOptionsName } from './variables'
import { initConsoleState } from './helpers'
import { setLoggerFunctions } from './actions'

const state: State = {
  console: initConsoleState(),
  open: false,
  persist: false,
  enabled: false,
};

const stateCreator = ():State => state;

const persistOptions: PersistOptions = {
  name: persistOptionsName, // set a unique name
  whitelist: ['open', 'persist', 'enabled'],
  getStorage: getStorageCall,
};

const useStore = createStore<State>(persist(
  stateCreator,
  persistOptions,
));

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);
clearDataService.excludeLocalStorageItem(persistId);

// getters
const get = useStore.getState;
const getConsole = ():ConsoleState => get().console;
const isConsolePersistent = ():boolean => get().persist;
const isConsoleOpen = ():boolean => get().open;
const isConsoleEnabled = ():boolean => get().enabled;

// setters
const set = useStore.setState;
const setConsoleLogs = ():void => set(s => ({console:{...s.console, logs: []}}));
const setConsolePersistent = (persist:boolean):void => {setLoggerFunctions(isConsoleEnabled(), persist); set({persist})};
const setConsoleOpen = (open:boolean):void => set({open});
const setConsoleEnabled = (enabled:boolean):void => {setLoggerFunctions(enabled, isConsolePersistent()); set({enabled})};
const setConsolePersistentTrue = ():void => setConsolePersistent(true);
const setConsoleOpenTrue = ():void => setConsoleOpen(true);
const setConsoleEnabledTrue = ():void => setConsoleEnabled(true);
const setConsolePersistentFalse = ():void => setConsolePersistent(false);
const setConsoleOpenFalse = ():void => setConsoleOpen(false);
const setConsoleEnabledFalse = ():void => setConsoleEnabled(false);
const toggleConsolePersistent = ():void => setConsolePersistent(!get().persist);
const toggleConsoleOpen = ():void => setConsoleOpen(!get().open);
const toggleConsoleEnabled = ():void => setConsoleEnabled(!get().enabled);

// actions
const reRenderConsole = ():void => set((s:State)=>({console:{...s.console}}));

// helpers
const fetchConsole = (s:State) => s.console;
const fetchIsConsolePersistent = (s:State) => s.persist;
const fetchIsConsoleOpen = (s:State) => s.open;
const fetchIsConsoleEnabled = (s:State) => s.enabled;

// hooks
const useConsole = ():ConsoleState => useStore(fetchConsole);
const useIsConsolePersistent = ():boolean => useStore(fetchIsConsolePersistent);
const useIsConsoleOpen = ():boolean => useStore(fetchIsConsoleOpen);
const useIsConsoleEnabled = ():boolean => useStore(fetchIsConsoleEnabled);

export {
  useStore as useConsoleStore,
  get as getConsoleStoreState,
  set as setConsoleStoreState,

  getConsole,
  isConsolePersistent,
  isConsoleOpen,
  isConsoleEnabled,

  setConsoleLogs,
  setConsolePersistent,
  setConsoleOpen,
  setConsoleEnabled,
  setConsolePersistentTrue,
  setConsoleOpenTrue,
  setConsoleEnabledTrue,
  setConsolePersistentFalse,
  setConsoleOpenFalse,
  setConsoleEnabledFalse,
  toggleConsolePersistent,
  toggleConsoleOpen,
  toggleConsoleEnabled,

  reRenderConsole,

  useConsole,
  useIsConsolePersistent,
  useIsConsoleOpen,
  useIsConsoleEnabled,
}