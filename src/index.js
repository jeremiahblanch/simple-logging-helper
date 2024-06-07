const levelList = [ 
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
]

const levels = {}
const defaultsAllFalse = {}
const defaultsAllTrue = {}

levelList.forEach(lvl => {
  levels[lvl] = lvl
  defaultsAllFalse[lvl] = false
  defaultsAllTrue[lvl] = true
})


class SimpleLoggingHelper {
  enableAllByDefault
  keyOnWindow
  windowRef

  constructor() {}

  init(opts) {
    this.keyOnWindow = opts?.keyOnWindow || '__LOGGING';
    this.windowRef = opts?.windowRef || window;
    this.enableAllByDefault = opts?.enableAllByDefault;

    this.windowRef[this.keyOnWindow] = {}
  }

  createForNamespace(
    namespace, 
    defaults = this.enableAllByDefault ? defaultsAllTrue : defaultsAllFalse
  ) {
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