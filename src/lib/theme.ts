export const theme = {
    colors: {
        primary: {
            DEFAULT: '#2c8ccc',
            dark: '#2c8ccc',
            light: '#4da3db',
        },
        secondary: {
            DEFAULT: '#003366',
        }
    }
} as const

// Type for theme
export type Theme = typeof theme 