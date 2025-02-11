import { styled } from "@mui/material/styles";
import {OutlinedInput, IconButton, InputAdornment, InputLabel} from '@mui/material';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React from "react";


function InputPassword(props) {
    return <>
        <InputLabel htmlFor={props.id} shrink>{props.label}</InputLabel>
        <OutlinedInput
                      id={props.id}
                      value={props.value}
                      onChange={props.onChange}
                      label={props.label}
                      placeholder={props.placeholder}
                      endAdornment={<InputAdornment position="end">
                        <IconButton
                            onClick={props.onEyeClick}
                            onMouseDown={props.onMouseDown}
                            edge="end">
                            {props.isPWHidden ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
               </InputAdornment>}>
        </OutlinedInput>
        </>
}

export default InputPassword;
