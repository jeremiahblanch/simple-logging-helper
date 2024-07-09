import { Level, levelList, Namespace, Toggles, WindowRef } from "../types"

const defaultsAllFalse: Toggles = {}
const defaultsAllTrue: Toggles = {}

levelList.forEach(lvl => {
  defaultsAllFalse[lvl] = false
  defaultsAllTrue[lvl] = true
})

let myWindow: WindowRef;

try {
  myWindow = window // browser
}
catch (err) {
  myWindow = global // node
}

class SimpleLoggingHelper {
  alreadyInitialized = false
  enableAllByDefault = false
  keyOnWindow: string = '__LOGGING'
  windowRef: WindowRef = myWindow

  init(opts?: {
    enableAllByDefault?: boolean
    keyOnWindow?: string
    windowRef?: object
  }) {
    if (this.alreadyInitialized) {
      return
    }
    this.alreadyInitialized = true

    this.keyOnWindow = opts?.keyOnWindow || this.keyOnWindow
    this.windowRef = opts?.windowRef || this.windowRef
    this.enableAllByDefault = opts?.enableAllByDefault || this.enableAllByDefault

    this.windowRef[this.keyOnWindow] = {}
  }

  createForNamespace(
    namespace: Namespace, 
    defaults = this.enableAllByDefault ? defaultsAllTrue : defaultsAllFalse
  ) {
    if (!this.keyOnWindow) {
      console.error('SimpleLoggingHelper: createForNamespace() called before init()')
      return
    }
    if (!namespace) {
      console.error('SimpleLoggingHelper: No namespace supplied')
      return
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
  
  public __shouldLog(namespace: Namespace, level: Level) {
    try {
      return this.windowRef[this.keyOnWindow][namespace][level]
    }
    catch (e) {
      return;
    }
  }
}

class LoggerForNamespace {
  namespace: Namespace
  parent: SimpleLoggingHelper

  constructor(
    namespace: Namespace,
    parent: SimpleLoggingHelper,
  ) {
    this.namespace = namespace;
    this.parent = parent;
  }

  prefix = () => `${this.namespace}: `
  shouldLogTrace = () => this.parent.__shouldLog(this.namespace, Level.TRACE)
  shouldLogDebug = () => this.parent.__shouldLog(this.namespace, Level.DEBUG)
  shouldLogInfo = () => this.parent.__shouldLog(this.namespace, Level.INFO)
  shouldLogWarn = () => this.parent.__shouldLog(this.namespace, Level.WARN)
  shouldLogError = () => this.parent.__shouldLog(this.namespace, Level.ERROR)
}



export default SimpleLoggingHelper;