import React, {useEffect, FC} from "react";
import {Button, Grid} from "@material-ui/core";
import {clearConsole, LogMessage, useConsole} from "./useStore";
import {logger} from "./service";
import {useConsoleStyles} from "./styles";

export const LogItem:FC<{logMessage:LogMessage}> = ({logMessage}) => {
  const classes = useConsoleStyles();

  if (typeof logMessage.date === "string")
    logMessage.date = new Date(logMessage.date);

  return (
  <Grid item xs={12} className={classes.messageContainer}>
    <Grid
      container
      spacing={1}
      // @ts-ignore
      className={classes[`logMessage-type-${logMessage.type}`]}
    >
      <Grid item className={classes.logType}>
        {logMessage.type.toUpperCase()}
      </Grid>

      <Grid item className={classes.logMessageType}>
        [{logMessage.date.toLocaleDateString()}-{logMessage.date.toLocaleTimeString()}] [{typeof logMessage.message}]
      </Grid>

      <Grid item className={classes.message} xs={12}>
        <pre>
          {logMessage.message}
        </pre>
      </Grid>

    </Grid>
  </Grid>
  )
}

export const ConsoleLog:FC = () => {
  const console = useConsole();
  const classes = useConsoleStyles();

  useEffect(()=>{logger.setVersion("1.0.3")}, []);

  return (
    <div className={classes.root}>
      <Button onClick={clearConsole} variant="contained">
        Clear Console
      </Button>
    <Grid container spacing={3} className={classes.Grid}>
      {console.logs.map((logMessage, index) =>
        <LogItem logMessage={logMessage} key={index}/>
      )}
    </Grid>
    </div>
  )
}