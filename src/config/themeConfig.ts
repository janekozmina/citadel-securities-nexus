// Theme configuration for colors, fonts, and spacing
export const themeConfig = {
  // Color palette
  colors: {
    primary: {
      50: 'hsl(210, 100%, 97%)',
      100: 'hsl(210, 100%, 93%)',
      200: 'hsl(210, 100%, 87%)',
      300: 'hsl(210, 100%, 78%)',
      400: 'hsl(210, 100%, 66%)',
      500: 'hsl(210, 100%, 54%)', // Main primary
      600: 'hsl(210, 100%, 47%)',
      700: 'hsl(210, 100%, 40%)',
      800: 'hsl(210, 100%, 33%)',
      900: 'hsl(210, 100%, 27%)',
      950: 'hsl(210, 100%, 15%)'
    },
    
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
      info: 'hsl(210, 100%, 54%)'
    },

    // Background gradients
    gradients: {
      sidebar: 'linear-gradient(135deg, hsl(215, 25%, 27%) 0%, hsl(215, 25%, 15%) 100%)',
      header: 'linear-gradient(90deg, hsl(210, 100%, 97%) 0%, hsl(210, 100%, 93%) 100%)',
      card: 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(210, 100%, 99%) 100%)'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem' // 30px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    menu: {
      primary: '0.875rem',   // 14px - main menu items
      secondary: '0.8125rem', // 13px - sub menu items  
      tertiary: '0.75rem',   // 12px - third level items
    }
  },

  // Spacing and layout
  spacing: {
    container: {
      padding: '1.5rem', // 24px
      maxWidth: '1400px'
    },
    header: {
      height: '4rem' // 64px
    },
    sidebar: {
      width: '16rem',         // 256px expanded
      collapsedWidth: '4rem', // 64px collapsed
      collapsed: '4rem',      // 64px collapsed
      expanded: '12rem',      // 192px - optimized width
      subPanel: '15rem',      // 240px - optimized sub panel width
    },
    card: {
      padding: '1.5rem',
      borderRadius: '0.75rem'
    }
  },

  // Animations and transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Shadows and effects
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },

  // Border radius
  borderRadius: {
    sm: '0.25rem',  // 4px
    default: '0.5rem',   // 8px
    md: '0.75rem',  // 12px
    lg: '1rem',     // 16px
    xl: '1.5rem',   // 24px
    full: '9999px'
  }
};

export default themeConfig;