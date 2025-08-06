module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "^@radix-ui/themes$": "<rootDir>/node_modules/@radix-ui/themes",
    "^@radix-ui/react-dialog$": "<rootDir>/node_modules/@radix-ui/react-dialog",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  // 👇 Add this to transform Radix UI and Next.js node_modules
  transformIgnorePatterns: [
    "/node_modules/(?!((@radix-ui|@next|next|react-dom|react)/))"
  ]
};