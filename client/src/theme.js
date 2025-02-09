export const tokensDark = {
    grey: {
        0: '#ffffff', 
        10: '#f6f6f6', 
        50: '#f0f0f0', 
        100: '#e0e0e0',
        200: '#c2c2c2',
        300: '#a3a3a3',
        400: '#858585',
        500: '#666666',
        600: '#525252',
        700: '#3d3d3d',
        800: '#292929',
        900: '#141414',
        1000: '#000000', 
    },
    primary: {
        // black
        100: '#596773',
        200: '#454F59',
        300: '#38414A',
        400: '#2C333A',
        500: '#282E33',
        600: '#22272B', 
        700: '#1D2125',
        800: '#161A1D',
        900: '#101214',
    },
    secondary: {
        // yellow
        50: "#E7F9FF",
        100: "#C6EDFB",
        200: "#9DD9EE",
        300: "#6CC3E0",
        400: "#42B2D7",
        500: "#2898BD",
        600: "#227D9B",
        700: "#206A83",
        800: "#164555",
        900: "#1E3137",
    },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      // palette values for dark mode
                      primary: {
                          ...tokensDark.primary,
                          main: tokensDark.primary[600],
                          light: tokensDark.primary[600],
                      },
                      secondary: {
                          ...tokensDark.secondary,
                          main: tokensDark.secondary[500],
                      },
                      neutral: {
                          ...tokensDark.grey,
                          main: tokensDark.grey[700],
                      },
                      background: {
                          default: tokensDark.primary[800],
                          alt: tokensDark.primary[700],
                      },
                  }
                : {
                      // palette values for light mode
                      primary: {
                          ...tokensLight.primary,
                          main: tokensDark.grey[50],
                          light: tokensDark.grey[100],
                      },
                      secondary: {
                          ...tokensLight.secondary,
                          main: tokensDark.secondary[600],
                          light: tokensDark.secondary[700],
                      },
                      neutral: {
                          ...tokensLight.grey,
                          main: tokensDark.grey[500],
                      },
                      background: {
                          default: tokensDark.grey[0],
                          alt: tokensDark.grey[50],
                      },
                  }),
        },
        typography: {
            fontFamily: ['Inter', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 24,
            },
            h4: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h5: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 16,
            },
            h6: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 14,
            },
        },
    };
};
