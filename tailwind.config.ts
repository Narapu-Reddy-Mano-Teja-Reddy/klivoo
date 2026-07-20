import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
        // Editorial accent serif for single highlighted words in headlines.
        'serif-display': ['var(--font-serif-display)', 'Georgia', 'ui-serif', 'serif'],
      },
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#b9e0fd',
          300: '#7cc9fb',
          400: '#38adf7',
          500: '#0e91e8',
          600: '#0271c6',
          700: '#0159a0',
          800: '#064b84',
          900: '#0b3f6d',
        },
        // brand blue — same scale used across accent classes
        blue: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#b9e0fd',
          300: '#7cc9fb',
          400: '#38adf7',
          500: '#0e91e8',
          600: '#0271c6',
          700: '#0159a0',
          800: '#064b84',
          900: '#0b3f6d',
        },
        // deep navy from the logo wordmark
        navy: {
          DEFAULT: '#0A1628',
          soft: '#0f2040',
          line: '#1a3460',
          text: '#d8e8f7',
          muted: '#6a8fba',
        },

        // ── Semantic design tokens ──────────────────────────────────
        canvas: '#FFFFFF',   // pure white background
        surface: '#FFFFFF',  // cards/panels
        ink: {
          DEFAULT: '#0A1628', // primary text — deep navy
          muted: '#4a6080',   // secondary text
          faint: '#8aabcc',   // tertiary / muted
        },
        line: {
          DEFAULT: '#d8e8f7', // borders — light blue-tinted
          soft: 'rgba(216, 232, 247, 0.6)',
        },

        // ── Landing editorial palette ───────────────────────────────
        bone: '#f0f7ff',    // very light blue tint — alternating light band
        cream: '#e3f0fc',   // slightly richer blue-tint paper
        espresso: {
          DEFAULT: '#0A1628', // dark section base — deep navy
          soft: '#0f2040',    // elevated surface on dark
          line: '#1a3460',    // hairline border on dark
          text: '#d8e8f7',    // blue-tinted body text on dark
          muted: '#6a8fba',   // secondary text on dark
        },
        // Supporting cyan-to-blue tone — bridge between icon blue and navy.
        terracotta: {
          300: '#7cc9fb',
          400: '#38adf7',
          500: '#0e91e8',
          600: '#0271c6',
        },
      },
      fontSize: {
        // Editorial display scale — deliberate hierarchy with optical tracking
        // that tightens as size grows. Used for section headlines below the
        // hero (the hero keeps its own bespoke sizing).
        'display-sm': ['2.5rem', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
        display: ['3.25rem', { lineHeight: '1.04', letterSpacing: '-0.027em' }],
        'display-lg': ['4.25rem', { lineHeight: '1', letterSpacing: '-0.032em' }],
        'display-xl': ['6rem', { lineHeight: '0.94', letterSpacing: '-0.038em' }],
      },
      maxWidth: {
        // A comfortable ~62-character measure for editorial body copy.
        measure: '34rem',
      },
      boxShadow: {
        // Soft, warm, barely-there shadows — premium, never harsh.
        soft: '0 1px 2px 0 rgba(10,22,40,0.04), 0 1px 3px 0 rgba(10,22,40,0.05)',
        'soft-md': '0 2px 8px -2px rgba(10,22,40,0.06), 0 6px 20px -4px rgba(10,22,40,0.06)',
        'soft-lg': '0 10px 40px -8px rgba(10,22,40,0.12)',
        up: '0 -1px 3px rgba(10,22,40,0.04)',

        // ── Landing elevation scale ──────────────────────────────
        'lift-1': '0 1px 2px rgba(2,113,198,0.07), 0 3px 8px -2px rgba(2,113,198,0.07)',
        'lift-2': '0 2px 4px rgba(2,113,198,0.07), 0 10px 24px -6px rgba(2,113,198,0.12)',
        'lift-3': '0 4px 8px rgba(2,113,198,0.07), 0 22px 48px -12px rgba(2,113,198,0.18)',
        'lift-4': '0 8px 16px rgba(2,113,198,0.08), 0 40px 80px -20px rgba(2,113,198,0.25)',
        // Brand glow — electric blue
        ember: '0 18px 48px -16px rgba(14,145,232,0.55)',
        'ember-lg': '0 30px 80px -24px rgba(14,145,232,0.65)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -32px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 18px) scale(0.94)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Mobile bottom-sheet / drawer slide-up.
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        // Quick fade for overlays/backdrops.
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // A slow light sweep across a surface — used once, on the popular
        // plan, so it reads as a highlight rather than decoration.
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        // Warm ambient drift for the large background glows (parallax's
        // slower cousin — no scroll dependency).
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-18px,0) scale(1.05)' },
        },
        // Tide-like drift for the section wave dividers — a double-width
        // wave tile scrolls one full pattern-width for a seamless, gentle
        // rolling motion (not a fast marquee).
        'wave-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'wave-x-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        'gradient-pan': 'gradient-pan 6s ease infinite',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-fast': 'fade-in-fast 0.2s ease-out both',
        sheen: 'sheen 5.5s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
        'wave-x': 'wave-x 16s linear infinite',
        'wave-x-reverse': 'wave-x-reverse 20s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
