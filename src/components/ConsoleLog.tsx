import React, { FC, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { getConsole, getConsoleStoreState, useConsole, useIsConsoleOpen } from '../useStore'
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
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    logger.setVersion(version);
    const { enabled, persist } = getConsoleStoreState();
    setLoggerFunctions(enabled, persist);
    getConsole().logs.forEach(log => {log.date = new Date(log.date)});
    setReady(true);
  }, []);

  return ready;
}

export const ConsoleLog:FC = () => {
  const consoleLog = useConsole();
  const classes = useConsoleStyles();
  const open = useIsConsoleOpen();

  const ready = useOnConsoleLoad();

  if (!open || !ready)
    return <OpenConsoleButton/>;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item style={{paddingBottom:15}}>
          <OpenConsoleButton/>
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