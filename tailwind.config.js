/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/(screens-components)/nav.tsx", "./app/(screens-components)/AddMission.tsx", "./app/(screens-components)/StatusBox.tsx", "./app/(screens)/dashboard.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}