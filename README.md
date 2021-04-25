# react-console-log

render console logs as a react component  
* very useful for testing mobile apps where we can't use inspection.  
  
## Install

```
npm i react-console-log
```

## Usage

```typescript jsx
import { render } from 'react-dom';
import { ConsoleLog } from "react-console-log";

console.log("log");
console.warn("warning");
console.info("info");
console.error("error");

render(
  <ConsoleLog/>
  , document.getElementById("root")
);
```