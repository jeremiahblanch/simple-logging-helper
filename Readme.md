# Why
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

# Usage

## Initialize
```javascript
// simple
const logger = new LoggingHelper({ namespace: 'MyModule' });

// with all the configuration options
const logger = new LoggingHelper({
  namespace: 'MyModule',
  defaults: {DEBUG: true},
  keyOnWindow: '__LOGGING', 
  windowRef: window, 
});
```

The confiugration options are explained [below](#configuration-options).

## Within your code

After initializing `logger`, you can use it  like this
```javascript
logger.shouldLogTrace() && console.log(logger.prefix(), `About to do something tiny`);

doSomethingTiny();
```

If you initialized using the simple version above, then nothing will be logged to the console when this line is encountered, because the defaults are for all logging to be turned off.

However, if you go into the console while your app is running and type this:

```javascript
window.__LOGGING.MyModule.TRACE = true
```

... then subsequent calls to `shouldLogTrace()` will now return `true`, and the logging will be printed! The logs will look like this:

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


# Configuration Options
- `namespace` (string, mandatory) - Use a different namespace for each usage in your app, eg per class / function / file

- `defaults` (object, optional, defaults to false for everything) - Whether logging is turned on by default for different log levels. The keys must match the allowed log levels. You can use this to have different logging configured for different environments, eg `defaults: process.env === 'DEV' ? {DEBUG: true, TRACE: true} : undefined`

- `keyOnWindow` (string, optional, defaults to '__LOGGING') - The object name on the Window that is used to toggle logging on and off

- `windowRef` (object, optional, defaults to `window`) - If you want to bind to an object other than window, specify it here.
    
