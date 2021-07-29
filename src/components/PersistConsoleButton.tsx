import React, {FC} from "react";
import {Button} from "@material-ui/core";
import { ButtonTypeMap } from '@material-ui/core/Button/Button'
import { toggleConsolePersistent, useIsConsolePersistent } from '../useStore'

export const PersistConsoleButton:FC<ButtonTypeMap | {}> = (props) => {
  const isConsolePersistent = useIsConsolePersistent();
  return (
    <Button onClick={toggleConsolePersistent} variant="contained" {...props}>
      {isConsolePersistent ? 'Disable' : 'Enable'} Storage
    </Button>
  )
}