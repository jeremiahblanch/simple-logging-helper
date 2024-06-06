# Why
Because other logging tools do the `console.log` themselves, and therefore the browser dev tools prints a line number for the *line within the logging tool* and not the line in your code!

This tool doesn't do the `console.log` for you, it just creates a mechanism to control switching the logging on and off. 

That means you can still see what line called the log, and can easily navigate to it in the dev tools and set a breakpoint, etc.


# Use like this

```javascript
// initialise
const logger = new LoggingHelper({
  namespace: 'MyApp',
    /*
    string, mandatory

    Use a different namespace for each usage in your app, eg per class / function / file
    */

  windowRef: '__LOGGING', 
    /* 
    string, optional, defaults to '__LOGGING'

    The object name on the Window that is used to toggle logging on and off
    */

  defaults: {DEBUG: false, TRACE: false},
    /*
    object, optional, defaults to {DEBUG: false, TRACE: false}

    Whether logging is turned on by default for different log levels.
    
    The keys must match the allowed log levels.
    
    You can use this to have different logging configured for different environments,
    
    eg defaults: process.env === 'DEV' ? {DEBUG: true, TRACE: true} : undefined
    */
);

// Within your code, wherever you want to log

// write this if the logging is of level === DEBUG,
logger.shouldLogDebug() && console.log(logger.prefix(), `Message to log`);

// write this if the logging is of level === TRACE,
logger.shouldLogTrace() && console.log(logger.prefix(), `Message to log`);

// logger.prefix() just returns the `${namespace}: `

```

When your app is running you can turn logging on and off on the window like
```
window[windowRef][namespace].TRACE = true;

// eg
window.__LOGGING.MyApp.TRACE = true;
```