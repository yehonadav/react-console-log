import React, {FC} from "react";
import {Button} from "@material-ui/core";
import { ButtonTypeMap } from '@material-ui/core/Button/Button'
import { toggleConsoleEnabled, useIsConsoleEnabled } from '../useStore'

export const EnableConsoleButton:FC<ButtonTypeMap | {}> = (props) => {
  const isConsoleEnabled = useIsConsoleEnabled();
  return (
    <Button onClick={toggleConsoleEnabled} variant="contained" {...props}>
      {isConsoleEnabled ? 'Stop' : 'Enable'} Logging
    </Button>
  )
}