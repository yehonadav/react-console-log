import React, { FC, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { getConsoleStoreState, useConsole, useIsConsoleOpen } from '../useStore'
import { logger } from '../service'
import { useConsoleStyles } from '../styles'
import { ClearConsoleButton } from './ClearConsoleButton'
import { EnableConsoleButton } from './EnableConsoleButton'
import { PersistConsoleButton } from './PersistConsoleButton'
import { OpenConsoleButton } from './OpenConsoleButton'
import { LogItem } from './LogItem'
import { version } from '../variables'
import { setLoggerFunctions } from '../actions'

const useOnConsoleLoad = () => {
  useEffect(()=>{
    logger.setVersion(version);
    const { enabled, persist } = getConsoleStoreState();
    setLoggerFunctions(enabled, persist);
  }, []);
}

export const ConsoleLog:FC = () => {
  const consoleLog = useConsole();
  const classes = useConsoleStyles();
  const open = useIsConsoleOpen();

  useOnConsoleLoad();

  if (!open)
    return <OpenConsoleButton/>;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <OpenConsoleButton style={{marginBottom: 10}}/>
        </Grid>
        <Grid item>
          <ClearConsoleButton/>
        </Grid>
        <Grid item>
          <EnableConsoleButton/>
        </Grid>
        <Grid item>
          <PersistConsoleButton/>
        </Grid>
      </Grid>

      <Grid container spacing={3} className={classes.Grid}>
        {consoleLog.logs.map((logMessage, index) =>
          <LogItem logMessage={logMessage} key={index}/>
        )}
      </Grid>
    </div>
  )
}