const levels = {
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
}

const defaultsAllFalse = {
  [levels.DEBUG]: false,
  [levels.TRACE]: false,
}

class LoggingHelper {
  namespace
  windowRef

  constructor({
    namespace,
    windowRef = '__LOGGING',
    defaults = defaultsAllFalse
  }) {
    this.namespace = namespace;
    this.windowRef = windowRef;

    window[this.windowRef] = window[this.windowRef] || {}
    window[this.windowRef][this.namespace] = {...defaults};
  }

  prefix() {
    return `${this.namespace}:`
  }

  shouldLogDebug() {
    return this.__shouldLog(levels.DEBUG)
  }

  shouldLogTrace() {
    return this.__shouldLog(levels.TRACE)
  }

  __shouldLog(level) {
    try {
      return window[REF][this.namespace][level]
    }
    catch (e) {
      return;
    }
  }
  
}

export default LoggingHelper;