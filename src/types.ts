import { getStorageCall } from '@yehonadav/safestorage'

export type LogType =
  'log' |
  'info' |
  'error' |
  'debug' |
  'exception' |
  'trace' |
  'warn';

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

export type PersistOptions = {
  name: string;
  whitelist: (keyof State)[];
  getStorage: typeof getStorageCall;
}

export type Logger = Console & {
  setVersion: (version: string) => void;
}