/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				50: '#f0f4ff',
  				100: '#e0e9ff',
  				200: '#c7d7ff',
  				300: '#a5bbff',
  				400: '#8195ff',
  				500: '#6366f1',
  				600: '#4f46e5',
  				700: '#4338ca',
  				800: '#3730a3',
  				900: '#312e81',
  				950: '#1e1b4b'
  			},
  			secondary: {
  				50: '#fdf4ff',
  				100: '#fae8ff',
  				200: '#f5d0fe',
  				300: '#f0abfc',
  				400: '#e879f9',
  				500: '#d946ef',
  				600: '#c026d3',
  				700: '#a21caf',
  				800: '#86198f',
  				900: '#701a75',
  				950: '#4a044e'
  			},
  			accent: {
  				50: '#f0fdfa',
  				100: '#ccfbf1',
  				200: '#99f6e4',
  				300: '#5eead4',
  				400: '#2dd4bf',
  				500: '#14b8a6',
  				600: '#0d9488',
  				700: '#0f766e',
  				800: '#115e59',
  				900: '#134e4a',
  				950: '#042f2e'
  			},
  			dark: {
  				DEFAULT: '#1a1a2e',
  				50: '#eaeaf0',
  				100: '#d4d4e0',
  				200: '#a9a9c2',
  				300: '#7f7fa3',
  				400: '#545485',
  				500: '#2b2a47',
  				600: '#1f1e3a',
  				700: '#1a1a2e',
  				800: '#141422',
  				900: '#0f0f17'
  			}
  		},
    		fontFamily: {
    			sans: [
    				'Sora',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI',
    				'Roboto',
    				'sans-serif'
    			],
    			heading: [
    				'Sora',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI',
    				'Roboto',
    				'sans-serif'
    			]
    		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out'
  		}
  	}
  },
}
