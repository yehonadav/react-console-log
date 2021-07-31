import React, {FC} from "react";
import {Button} from "@material-ui/core";
import { clearConsole } from '../clearConsole'
import { ButtonTypeMap } from '@material-ui/core/Button/Button'

export const ClearConsoleButton:FC<ButtonTypeMap | {}> = (props) => {
  return (
    <Button onClick={clearConsole} variant="contained" {...props}>
      Clear
    </Button>
  )
}