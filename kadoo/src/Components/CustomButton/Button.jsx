import { styled } from '@mui/system'
// import colors from '@mui/material/colors'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import  Theme  from '../../Theme/ThemeGenerator'


export const CustomButton = styled(Button)(
    ({error, talebiKind}) => ({
       backgroundColor: error
      ? talebiKind === 'primary'
        ? Theme.palette.error.main
        : talebiKind === 'text'
        ? 'transparent'
        : Theme.palette.error.main
      : talebiKind === 'primary'
      ? Theme.palette.primary.main
      : talebiKind === 'text'
      ? 'transparent'
      : Theme.palette.text.primary,
      color: error
      ? talebiKind === 'primary'
        ? 'white'
        : Theme.palette.error.main
      : talebiKind === 'primary'
      ? 'white'
      : talebiKind === 'text'
      ? Theme.palette.primary.main
      : Theme.palette.text.primary,
      ':hover': {
        backgroundColor: error
          ? talebiKind === 'primary'
            ? Theme.palette.error.dark
            : talebiKind === 'text'
            ? 'transparent'
            : Theme.palette.error.p10
          : talebiKind === 'primary'
          ? Theme.palette.primary.dark
          : talebiKind === 'text'
          ? 'transparent'
          : Theme.palette.text.p10,
        color: error
          ? talebiKind === 'primary'
            ? 'white'
            : Theme.palette.error.dark
          : talebiKind === 'primary'
          ? 'white'
          : talebiKind === 'text'
          ? Theme.palette.primary.main
          : Theme.palette.text.p160,
        },
        '& .Mui-disabled': {
          backgroundColor:
            talebiKind === 'primary'
              ? Theme.palette.text.p10 + '!important'
              : 'transparent !important',
          color:
            talebiKind === 'primary'
              ? Theme.palette.text.p50
              : talebiKind === 'text'
              ? Theme.palette.text.p100
              : Theme.palette.text.p100,
        },    
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
  