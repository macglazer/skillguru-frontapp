import theme from "./theme";

const globalStylesOverride = {
    "ul.MuiMultiSectionDigitalClockSection-root" :  {
        width: '64px'
    },

    '.MuiOutlinedInput-root.Mui-disabled': {
        backgroundColor: theme.palette.base['20'],
        borderColor: theme.palette.base['40'],
        opacity: 0.75
    }
}

export default globalStylesOverride;