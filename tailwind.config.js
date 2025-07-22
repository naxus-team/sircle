/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // يعتمد على prefers-color-scheme\
  content: [
    './src/**/*.{ts,tsx,html}', // تضمين ملفات المشروع
  ],
  theme: {
    extend: {
      colors: {
        mColor: 'rgba(10, 116, 255,1)',
        mColor3: 'rgba(10, 116, 255,.3)',
        mColor2: 'rgba(10, 116, 255,.2)',
        mColor1: 'rgba(10, 116, 255,.1)',

        msColor: 'rgba(211, 34, 61,1)',
        msColor3: 'rgba(211, 34, 61,.3)',
        msColor2: 'rgba(211, 34, 61,.2)',
        msColor1: 'rgba(211, 34, 61,.1)',


        xColor: 'rgba(255,255,255,1)',
        xColor08: 'rgba(255,255,255,.08)',
        xColor04: 'rgba(255,255,255,.04)',


        zColor: 'rgba(245,245,245,1)',

        sColor: 'rgba(2,0,3,1)',
        sColor9: 'rgba(2,0,3,.9)',
        sColor8: 'rgba(2,0,3,.8)',
        sColor2: 'rgba(2,0,3,.2)',
        sColor1: 'rgba(2,0,3,.1)',
        sColor09: 'rgba(2,0,3,.09)',
        sColor08: 'rgba(2,0,3,.08)',
        sColor07: 'rgba(2,0,3,.07)',
        sColor06: 'rgba(2,0,3,.06)',
        sColor05: 'rgba(2,0,3,.05)',
        sColor04: 'rgba(2,0,3,.04)',
      },
      fontFamily: {
        vazirmatn: ['Vazirmatn', 'sans-serif'],
        poppins: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};