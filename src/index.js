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


class SimpleLoggingHelper {
  keyOnWindow
  namespace
  windowRef

  constructor() {}

  init(
    keyOnWindow = '__LOGGING',
    windowRef = window,
  ) {
    this.keyOnWindow = keyOnWindow;
    this.windowRef = windowRef;
    this.windowRef[this.keyOnWindow] = {}
  }

  createForNamespace(namespace, defaults = defaultsAllFalse) {
    if (!this.keyOnWindow) {
      throw new Error ('SimpleLoggingHelper: createForNamespace() called before init()')
    }
    if (!namespace) {
      throw new Error ('SimpleLoggingHelper: No namespace supplied')
    }

    this.windowRef[this.keyOnWindow][namespace] = {...defaults};
    
    const {
      prefix,
      shouldLogTrace,
      shouldLogDebug,
      shouldLogInfo,
      shouldLogWarn,
      shouldLogError,
    } = new LoggerForNamespace(namespace, this);

    return {
      prefix,
      shouldLogTrace,
      shouldLogDebug,
      shouldLogInfo,
      shouldLogWarn,
      shouldLogError,
    }
  }
  
  __shouldLog(namespace, level) {
    try {
      return this.windowRef[this.keyOnWindow][namespace][level]
    }
    catch (e) {
      return;
    }
  }
}

class LoggerForNamespace {
  namespace
  parent

  constructor(
    namespace,
    parent,
  ) {
    this.namespace = namespace;
    this.parent = parent;
  }

  prefix = () => `${this.namespace}: `
  shouldLogTrace = () => this.parent.__shouldLog(this.namespace, levels.TRACE)
  shouldLogDebug = () => this.parent.__shouldLog(this.namespace, levels.DEBUG)
  shouldLogInfo = () => this.parent.__shouldLog(this.namespace, levels.INFO)
  shouldLogWarn = () => this.parent.__shouldLog(this.namespace, levels.WARN)
  shouldLogError = () => this.parent.__shouldLog(this.namespace, levels.ERROR)
}

const singleton = new SimpleLoggingHelper();

export default singleton;