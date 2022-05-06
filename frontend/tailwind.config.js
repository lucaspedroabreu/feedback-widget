module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          standard: '#8257e6',
          hover: '#996DFF',
          textOnBrandColor: '#FFFFFF',
        },
        darkTheme: {
          surfacePrimary: '#18181B',
          surfaceSecondary: '#27272A',
          surfaceSecondaryHover: '#3F3F46',
          stroke: '#52525B',
          tooltip: '#F4F4F5',
          textPrimary: '#F4F4F5',
          textSecondary: '#A1A1AA',
          textOnTooltip: '#27272A',
        },
        lightTheme: {
          surfacePrimary: '#FFFFFF',
          surfaceSecondary: '#F4F4F5',
          surfaceSecondaryHover: '#E4E4E7',
          stroke: '#D4D4D8',
          tooltip: '#27272A',
          textPrimary: '#27272A',
          textSecondary: '#71717A',
          textOnTooltip: '#F4F4F5',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
