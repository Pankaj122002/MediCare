import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 30000,
    video: false,
  },
});
