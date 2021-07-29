import React from 'react'
import { FC } from 'react'
import { IconButton } from '@material-ui/core'
import BugReportIcon from '@material-ui/icons/BugReport';
import { IconButtonTypeMap } from '@material-ui/core/IconButton/IconButton'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon'
import { toggleConsoleOpen } from '../useStore'

export interface IOpenConsoleButton {
  iconButtonProps?: IconButtonTypeMap;
  bugReportIconProps?: SvgIconTypeMap;
}

export const OpenConsoleButton:FC<IOpenConsoleButton> = ({ iconButtonProps={}, bugReportIconProps={} }) => {
  return (
    <IconButton {...iconButtonProps}>
      <BugReportIcon onClick={toggleConsoleOpen} {...bugReportIconProps}/>
    </IconButton>
  )
}