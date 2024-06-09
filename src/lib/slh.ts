import { Level, levelList, Namespace, Toggles, WindowRef } from "../types"

const defaultsAllFalse: Toggles = {}
const defaultsAllTrue: Toggles = {}

levelList.forEach(lvl => {
  defaultsAllFalse[lvl] = false
  defaultsAllTrue[lvl] = true
})


class SimpleLoggingHelper {
  enableAllByDefault: boolean = false
  keyOnWindow: string = '__LOGGING'
  windowRef: WindowRef = window

  init(opts?: {
    enableAllByDefault?: boolean
    keyOnWindow?: string
    windowRef?: object
  }) {
    this.keyOnWindow = opts?.keyOnWindow || this.keyOnWindow;
    this.windowRef = opts?.windowRef || this.windowRef;
    this.enableAllByDefault = opts?.enableAllByDefault || this.enableAllByDefault;

    this.windowRef[this.keyOnWindow] = {}
  }

  createForNamespace(
    namespace: Namespace, 
    defaults = this.enableAllByDefault ? defaultsAllTrue : defaultsAllFalse
  ) {
    if (!this.keyOnWindow) {
      throw new Error ('SimpleLoggingHelper: createForNamespace() called before init()')
    }
    if (!namespace) {
      throw new Error ('SimpleLoggingHelper: No namespace supplied')
    }

    this.windowRef[this.keyOnWindow][namespace] = {...defaults};

    // TODO - remove, dev only
    console.log(this.windowRef[this.keyOnWindow])
    
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