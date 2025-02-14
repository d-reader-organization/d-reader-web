import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      '320': '320px',
      '660': '660px',
      '1160': '1160px',
      xs: '0px',
      sm: '580px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      size: {
        '3.5': '0.875rem',
        '4.5': '1.125rem',
      },
      height: {
        '3.5': '0.875rem',
        '4.5': '1.125rem',
      },
      width: {
        '3.5': '0.875rem',
        '4.5': '1.125rem',
      },
      aspectRatio: {
        'comic-cover': '900/1000',
        'comic-banner': '1920/900',
        'comic-issue-cover': '1024/1484',
        'creator-banner': '1920/900',
        'creator-avatar': '500/500',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      fontSize: {
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        xxs: ['10px', '1.25'],
        xs: ['12px', '1.25'],
        sm: ['14px', '1.25'],
        base: ['16px', '1.4'],
        lg: ['18px', '1.4'],
        xl: ['20px', '1.4'],
      },
      letterSpacing: {
        '0096': '0.096px',
        '008': '0.08px',
        '0064': '0.064px',
        '0048': '0.048px',
        '004': '0.04px',
        '0032': '0.032px',
        '024': '0.24px',
      },
      lineHeight: {
        '1/2': '0.5',
      },
      colors: {
        grey: {
          '50': '#ebedf3',
          '100': '#c2c5ce',
          '200': '#777d8c',
          '300': '#414756',
          '400': '#2f333e',
          '500': '#1f222a',
          '600': '#15171c',
          '700': '#12141c',
          '900': '#212121',
        },
        green: {
          '100': '#88C169',
          '400': '#5fe1a2',
          '500': '#49c187',
          '600': '#34a26d',
          genesis: '#08CC77',
          accent: '#07BD74',
        },
        yellow: {
          '50': '#FFFCE3',
          '100': '#FFF8B8',
          '200': '#FFF387',
          '300': '#FCEB54',
          '400': '#CEC149',
          '500': '#A0963E',
          '600': '#716C32',
          '700': '#434127',
        },
        orange: {
          '100': '#FFBF78',
          '200': '#FC835D',
          '300': '#E15456',
          '400': '#F2CA63',
          '500': '#e9a860',
        },
        red: {
          '100': '#cf5656',
          '500': '#e3635b',
        },
        blue: {
          '100': '#87C7E4',
          '200': '#727CAC',
          '300': '#3D3E60',
          '500': '#3926b4',
        },
        purple: {
          '100': '#FFABC4',
          '200': '#EA69C5',
          '500': '#8377f2',
        },
        pink: {
          '500': '#c413e0',
        },
        'important-color': '#fceb54',
        'text-color': '#fafafa',
        'text-black': '#17191D',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
      },
      boxShadow: {
        '3': '3px 3px 3px #15171c',
        'issue-cover': '6px 6px 0px 0px #000',
      },
      gradientColorStopPositions: {
        '36%': '36%',
        '72%': '72%',
      },
      backgroundPosition: {
        '0-top': '0 top',
      },
      transitionProperty: {
        height: 'height',
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)'],
        obviouslyNarrow: ['var(--font-obviously-narrow)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
} satisfies Config

export default config
