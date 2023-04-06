import { styled } from '@mui/system'
// import colors from '@mui/material/colors'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import  Theme  from '../../Theme/ThemeGenerator'


export const CustomButton = styled(Button)(
    ({error, talebiKind}) => ({
        backgroundColor: error ? talebiKind === 'primary'
        ? error.main
        : talebiKind === 'text'
        : talebiKind === 'primary'
    })
  )
export const TalebiButton = (props) => {
    return (
        <CustomButton 
        talebiKind = {props.talebiVariant ? props.talebiVariant: 'primary'}
        error={props.error} {...props}>
            {props.noText && 
                <IconButton>
                    {props.icon}
                </IconButton>
            }
            {!props.noText && props.icon && props.text &&
                <Grid containar justifyContent='center'>
                    <Grid item>
                        <IconButton>
                            {props.icon}
                        </IconButton>
                    </Grid>
                    <Grid item flexGrow={1}>
                        {props.text}
                    </Grid>

                </Grid>
            }
            {!props.noText && !props.icon && props.text &&
                <>{props.text}</>
            }
        </CustomButton>
    )
}
  