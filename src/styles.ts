import makeStyles from "@material-ui/core/styles/makeStyles";

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