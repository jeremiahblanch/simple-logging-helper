const levelList = [ 
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
]

const levels = {}
const defaultsAllFalse = {}

levelList.forEach(lvl => {
  levels[lvl] = lvl
  defaultsAllFalse[lvl] = false
})


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

  shouldLogTrace() {
    return this.__shouldLog(levels.TRACE)
  }

  shouldLogDebug() {
    return this.__shouldLog(levels.DEBUG)
  }

  shouldLogInfo() {
    return this.__shouldLog(levels.INFO)
  }

  shouldLogWarn() {
    return this.__shouldLog(levels.WARN)
  }

  shouldLogError() {
    return this.__shouldLog(levels.ERROR)
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