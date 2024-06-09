export enum Level {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export const levelList = [
  Level.TRACE,
  Level.DEBUG,
  Level.INFO,
  Level.WARN,
  Level.ERROR,
]

export type Namespace = string;

export type Toggles = { [key in Level]?: boolean }

export interface WindowRef { [keyOnWindow: string]: any}
