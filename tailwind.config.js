/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			 colors: {
        tui: {
          'background-base-alt': 'var(--tui-background-base-alt)', // Variable de Taiga UI
         
        },
      },
		},
	},
		darkMode: ['class', '[tuiTheme="dark"]'],
	plugins: [],
};

