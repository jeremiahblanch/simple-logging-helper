# Why
Because other logging tools do the `console.log` themselves, and therefore the browser dev tools prints a line number for the *line within the logging tool* and not the line in your code!

This tool doesn't do the `console.log` for you, it just creates a mechanism to control switching the logging on and off. 

That means you can still see what line called the log, and can easily navigate to it in the dev tools and set a breakpoint, etc.


# Use like this

```
// initialise
this.logger = new LoggingHelper('MyApp');

// when you want to log

// level === DEBUG
this.logger.shouldLogDebug() && console.log(this.logger.prefix(), `Message to log`);

// level === TRACE
this.logger.shouldLogTrace() && console.log(this.logger.prefix(), `Message to log`);

```


You can turn logging on and off on the window like
```
window__LOGGING.MyApp.TRACE = true;