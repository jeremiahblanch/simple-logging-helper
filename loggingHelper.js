const REF = '__LOGGING'

const levels = {
    DEBUG: 'DEBUG',
    TRACE: 'TRACE',
}

const defaultSettings = {
  DEV: {
    [levels.DEBUG]: true,
    [levels.TRACE]: false
  },
  PROD: {
    [levels.DEBUG]: false,
    [levels.TRACE]: false
  }
}

class LoggingHelper {
  handle = ''

  constructor(handle) {
    window[REF] = window[REF] || {}

    this.handle = handle;

    window[REF][this.handle] = {...defaultSettings.DEV}; // TODO turn on always for DEV, off for Prod

  }

  prefix() {
    return `${this.handle}:`
  }

  shouldLogDebug() {
    return this.__shouldLog(levels.DEBUG)
  }

  shouldLogTrace() {
    return this.__shouldLog(levels.TRACE)
  }

  __shouldLog(level) {
    try {
      return window[REF][this.handle][level]
    }
    catch (e) {
      return;
    }
  }
  
}

export default LoggingHelper;