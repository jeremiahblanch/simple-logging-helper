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
  keyOnWindow
  namespace
  windowRef

  constructor({
    defaults = defaultsAllFalse,
    namespace,
    keyOnWindow = '__LOGGING',
    windowRef = window,
  }) {
    if (!namespace) {
      throw new Error ('No namespace supplied')
    }

    this.namespace = namespace;
    this.keyOnWindow = keyOnWindow;
    this.windowRef = windowRef;

    this.windowRef[this.keyOnWindow] = this.windowRef[this.keyOnWindow] || {}
    this.windowRef[this.keyOnWindow][this.namespace] = {...defaults};
  }

  prefix() {
    return `${this.namespace}: `
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
      return this.windowRef[REF][this.namespace][level]
    }
    catch (e) {
      return;
    }
  }
  
}

export default LoggingHelper;