import React from 'react';
import {Components, createTheme, PaletteOptions, Theme} from "@mui/material";
import {TypographyOptions} from "@mui/material/styles/createTypography";
import CloseIcon from '@mui/icons-material/Close';

declare module '@mui/material/styles' {
    interface Palette {
        base: {
            "0": string,
            "10": string,
            "20": string,
            "40": string,
            "60": string,
            "80": string,
            "100": string,
        };
        // Other properties are not provided in design system
        errorBase: {
            "20": string,
            "40": string,
        }
    }

    interface PaletteOptions {
        base: {
            "0": string,
            "10": string,
            "20": string,
            "40": string,
            "60": string,
            "80": string,
            "100": string,
        };
        errorBase: {
            "20": string,
            "40": string,
        }
    }

    interface TypographyVariants {
        buttonLg: React.CSSProperties;
        buttonMd: React.CSSProperties;
        buttonSm: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        buttonLg: React.CSSProperties;
        buttonMd: React.CSSProperties;
        buttonSm: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        buttonLg: true;
        buttonMd: true;
        buttonSm: true;
    }
}

export const palette: PaletteOptions = {
    primary: {
        dark: '#f44813',
        main: '#ff6a3c',
        light: '#ffa88d',
        contrastText: '#ffffff',
    },
    secondary: {
        dark: '#0f1c3f',
        main: '#252B61',
        light: '#303669',
        contrastText: '#ffffff',
    },
    error: {
        main: '#e72749',
    },
    success: {
        main: '#34c759',
    },
    text: {
        primary: '#252b61',
    },
    base: {
        "0": "#ffffff",
        "10": "#FCFCFC",
        "20": "#F8F8F8",
        "40": "#E2E9FC",
        "60": "#8E9ABB",
        "80": "#56658F",
        "100": "#000000",
    },
    errorBase: {
        "20": '#f9ebeb',
        "40": '#f7d9d9',
    },
    grey: {
        "100": "#F9FAFB",
        "200": "#F3F4F6",
        "300": "#F2F4F8",
    }
};

const typography: TypographyOptions = {
    fontFamily: "Montserrat, sans-serif",
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    // TODO use rem if html font size wont be set 10 px
    h1: {
        fontSize: '48px',
        fontWeight: 700,
        lineHeight: '150%',
        letterSpacing: '-2px',
        color: '#252B61',
    },
    h2: {
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '150%',
        letterSpacing: '-1px',
        color: '#252B61',
    },
    h3: {
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '150%',
        letterSpacing: '-1px',
        color: '#252B61',
    },
    subtitle1: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '130%',
        color: '#252B61',
    },
    subtitle2: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '150%',
        color: '#252B61',
    },
    body1: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '180%',
        color: '#252B61',
    },
    body2: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '180%',
        color: '#252B61',
    },
    caption: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '180%',
        color: '#252B61',
    },
    buttonLg: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '180%',
        color: '#252B61',
    },
    buttonMd: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '180%',
        color: '#252B61',
    },
    buttonSm: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '180%',
        color: '#252B61',
    },
};

const components: Components<Omit<Theme, "components">> = {
    MuiButton: {
        styleOverrides: {
            containedPrimary: {
                // @ts-ignore
                color: palette.primary?.contrastText,
            },
            containedError: {
                // @ts-ignore
                color: palette.error.main,
                background: palette.errorBase['20'],

                '&:hover': {
                    background: palette.errorBase['40'],
                }
            },
            containedSecondary: {
                // @ts-ignore
                color: palette.secondary.main,
                background: palette.base['20'],

                '&:hover': {
                    background: palette.base['40'],
                }
            },
            root: {
                textTransform: 'none',
                borderRadius: '100px',
                fontSize: typography.buttonMd.fontSize,
                fontWeight: 600,
                boxShadow: 'none',
                padding: '12px 20px',

                '&:hover': {
                    boxShadow: 'none',
                }
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: '10px',
            },
            notchedOutline: {
                borderColor: palette.base["40"],
            },
        }
    },
    MuiChip: {
        defaultProps: {
            deleteIcon: <CloseIcon fontSize='small'/>
        },
        styleOverrides: {
            label: {
                fontSize: typography.caption?.fontSize,
                fontWeight: typography.caption?.fontWeight,
                padding: '20px',
            },
            deleteIcon: {
                background: 'none'
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                fontSize: '14px',
            }
        }
    }
}

const theme = createTheme({
    palette,
    typography,
    components
});

export default theme;