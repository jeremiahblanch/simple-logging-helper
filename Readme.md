# Simple Logging Helper

[Find on NPM](https://www.npmjs.com/package/simple-logging-helper)

# Why?
Because other logging tools do the `console.log` themselves, and therefore the browser dev tools prints a line number for the *line within the logging tool* and not the line in your code!

This tool doesn't do the `console.log` for you, it just creates a mechanism to control switching the logging on and off. That means you can still see what line called the log, and can easily navigate to it in the dev tools and set a breakpoint, etc.

Once initialized you have access to boolean methods for different log levels:  
|Level | key | boolean fn |
|---|---|---|
|Trace | `TRACE` | `shouldLogTrace` |
|Debug | `DEBUG` | `shouldLogDebug` |
|Info  | `INFO`  | `shouldLogInfo`  |
|Warn  | `WARN`  | `shouldLogWarn`  |
|Error | `ERROR` | `shouldLogError` |

You put these in front of the `console.log()` statements in your code, like `logger.shouldLogTrace() && console.log('trace')` and then you can switch (for example) trace logs on and off with `__LOGGING.MyModule.TRACE = true`. (See below)


# Usage

## Installation
```
npm install simple-logging-helper
```



## Initialize

### At one place, when your app starts
```javascript
import simpleLoggingHelper from 'simple-logging-helper';

// initialize, do this once in your app
simpleLoggingHelper.init()
  
// OR: define your own keys for where the toggles are stored
simpleLoggingHelper.init('__My_APP_LOGGING', someOtherObjectThatIsNotWindow)
```

`init(keyOnWindow, windowRef)` takes 2 optional arguments:
- `keyOnWindow` (string, optional, defaults to '__LOGGING') - The object name on the window that is used to toggle logging on and off
- `windowRef` (object, optional, defaults to `window`) - If you want to bind to an object other than window, specify it here.

If you want to sepcify a different `windowRef` but use the default `keyOnWindow` pass undefined first, like `simpleLoggingHelper.init(undefined, someOtherObjectThatIsNotWindow)`

## Within each module

### Set up the logger like this
```javascript
// in all different places you want to use it, create a logger based on a namespace
import simpleLoggingHelper from 'simple-logging-helper';

const logger = simpleLoggingHelper.createForNamespace('MyModule')

// OR: you can optionally add defaults
const logger = simpleLoggingHelper.createForNamespace('MyModule', {DEBUG: true, WARN: true})
```

`createForNamespace(namespace, defaults)` takes 2 arguments:
- `namespace` (string, mandatory) - The unique name for the module that will be used as a reference
- `defaults` (object, optional) - An object of booleans for the keys: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`. Anything not specified will be set to false.

### Where you want to do logging
```javascript
logger.shouldLogTrace() && console.log(logger.prefix(), `About to do something tiny`);
doSomethingTiny();
```

When you run this (and have set no defaults), nothing will be logged to the console when this line is encountered, because the base defaults are for all logging to be turned off.

However, if you go into the console while your app is running and type this:

```javascript
window.__LOGGING.MyModule.TRACE = true
```

... then subsequent calls to `logger.shouldLogTrace()` will now return `true`, and the logging will be printed! The logs will look like this:

```text
MyModule: About to do something tiny
```
And they will still have the correct line number that points to your code! (By the way, `logger.prefix()` just returns `${namespace}: `, so in this case "MyModule: ".)

You can switch logging back off again the same way:
```javascript
window.__LOGGING.MyModule.TRACE = false
```


## Different Log Levels in Different Modules
The pattern above applies for all the log levels, so you can toggle different log levels on and off for different parts of your app using the `key` for the log level and the `namespace` value you specified:

```javascript
window.__LOGGING.MyModule.TRACE = true
window.__LOGGING.ADifferentModule.DEBUG = true
```

## Using Object Spread
Make your code more readable by only getting the methods you need with object spread:
```javascript
const { shouldLogTrace, prefix: logPrefix } = simpleLoggingHelper.createForNamespace('MyModule')

// and then
shouldLogTrace() && console.log(logPrefix(), 'I am a trace')
```    

