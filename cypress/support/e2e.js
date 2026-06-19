import './commands';

// Suppress common third-party console errors (Three.js deprecation, etc.)
Cypress.on('uncaught:exception', (err) => {
  // Don't fail tests on third-party library warnings
  if (
    err.message.includes('THREE.Clock') ||
    err.message.includes('ResizeObserver loop') ||
    err.message.includes('insertBefore')
  ) {
    return false;
  }
});
