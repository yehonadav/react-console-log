import React, { FC } from 'react'
import { LogMessage } from '../types'
import { useConsoleStyles } from '../styles'
import { Grid } from '@material-ui/core'

export const LogItem: FC<{ logMessage: LogMessage }> = ({ logMessage }) => {
  const classes = useConsoleStyles()

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