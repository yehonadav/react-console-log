import React, {useEffect, FC} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";
import {LogMessage, useConsole} from "./useStore";
import {logger} from "./service";

export const useConsoleStyles = makeStyles({
  root: {
    width: "100%",
    padding: 16,
    paddingTop: 48,
    paddingBottom: 90,
  },

  Grid: {
    width: "100%",
    height: 800,
    overflow: "auto",
    background: "#fff",
    borderRadius: 5,
  },

  messageContainer: {

  },

  logMessageType: {
    fontSize: 12,
    fontWeight: 200,
  },

  logType: {
    fontSize: 12,
    fontWeight: 600,
  },

  message: {

  },

  "logMessage-type-log": {
    background: "#e5e2e2",
    color: "#1e1f1f",
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

  "logMessage-type-info": {
    background: "#5E9FFF",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

  "logMessage-type-error": {
    background: "#e35d5d",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

  "logMessage-type-debug": {
    background: "#2e383c",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

  "logMessage-type-exception": {
    background: "#ba1414",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

  "logMessage-type-trace": {
    background: "#151618",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

  "logMessage-type-warn": {
    background: "#f5a364",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Segoe UI",
    borderRadius: 5,
    padding: 12,
  },

})

export const LogItem:FC<{logMessage:LogMessage}> = ({logMessage}) => {
  const classes = useConsoleStyles();

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

  useEffect(()=>{logger.setVersion("1.0.1")}, []);

  return (
    <div className={classes.root}>
    <Grid container spacing={3} className={classes.Grid}>
      {console.logs.map((logMessage, index) =>
        <LogItem logMessage={logMessage} key={index}/>
      )}
    </Grid>
    </div>
  )
}