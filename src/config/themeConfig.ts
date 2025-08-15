// Central Bank Portal Theme Configuration
// This file centralizes all styling: colors, fonts, layout, spacing

export const themeConfig = {
  // Color palette following Material Design 3 principles
  colors: {
    // Primary colors (CBB Brand)
    primary: {
      50: 'hsl(210, 100%, 97%)',
      100: 'hsl(210, 100%, 93%)',
      200: 'hsl(210, 100%, 87%)',
      300: 'hsl(210, 100%, 78%)',
      400: 'hsl(210, 100%, 66%)',
      500: 'hsl(210, 100%, 54%)', // Main brand
      600: 'hsl(210, 100%, 47%)',
      700: 'hsl(210, 100%, 40%)',
      800: 'hsl(210, 100%, 33%)',
      900: 'hsl(210, 100%, 27%)',
      950: 'hsl(210, 100%, 15%)'
    },
    
    // Secondary colors
    secondary: {
      50: 'hsl(215, 25%, 97%)',
      100: 'hsl(215, 25%, 93%)',
      200: 'hsl(215, 25%, 87%)',
      300: 'hsl(215, 25%, 78%)',
      400: 'hsl(215, 25%, 66%)',
      500: 'hsl(215, 25%, 54%)',
      600: 'hsl(215, 25%, 47%)',
      700: 'hsl(215, 25%, 40%)',
      800: 'hsl(215, 25%, 33%)',
      900: 'hsl(215, 25%, 27%)',
      950: 'hsl(215, 25%, 15%)'
    },

    // System status colors
    status: {
      success: 'hsl(142, 71%, 45%)',
      warning: 'hsl(38, 92%, 50%)',
      error: 'hsl(0, 84%, 60%)',
      info: 'hsl(210, 100%, 54%)',
      pending: 'hsl(45, 93%, 47%)',
      processing: 'hsl(262, 83%, 58%)'
    },

    // Gradients for visual appeal
    gradients: {
      primary: 'linear-gradient(135deg, hsl(210, 100%, 54%) 0%, hsl(210, 100%, 40%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(215, 25%, 27%) 0%, hsl(215, 25%, 15%) 100%)',
      surface: 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(210, 100%, 99%) 100%)',
      header: 'linear-gradient(90deg, hsl(210, 100%, 97%) 0%, hsl(210, 100%, 93%) 100%)'
    }
  },

  // Typography system
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      display: ['Inter', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem'       // 48px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  // Layout and spacing following Material Design 3
  layout: {
    // Header configuration
    header: {
      height: '64px',
      zIndex: 50
    },

    // Navigation drawer configuration (Material Design 3)
    navigation: {
      // Primary navigation (always visible)
      primary: {
        width: '80px',
        collapsedWidth: '80px',
        expandedWidth: '240px'
      },
      // Secondary navigation (contextual)
      secondary: {
        width: '280px',
        collapsedWidth: '0px'
      },
      // Total navigation area
      total: {
        maxWidth: '360px' // primary + secondary
      }
    },

    // Container settings
    container: {
      maxWidth: '1440px',
      padding: '24px'
    },

    // Content areas
    content: {
      padding: '24px',
      gap: '24px'
    }
  },

  // Spacing scale (4px base unit)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px'
  },

  // Border radius scale
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px'
  },

  // Shadows following Material Design elevation
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)'
  },

  // Animation and transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export default themeConfig;