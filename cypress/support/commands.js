// Custom Cypress commands for MediCarePro clinic website

/**
 * Wait for the intro sequence to finish and hero section to be visible.
 * Usage: cy.waitForHero()
 */
Cypress.Commands.add('waitForHero', () => {
  cy.get('h1', { timeout: 30000 }).contains('Your Health').should('be.visible');
});

/**
 * Navigate to a section by clicking the nav link.
 * Usage: cy.navigateTo('About')
 */
Cypress.Commands.add('navigateTo', (sectionName) => {
  cy.waitForHero();
  cy.get('nav a').contains(sectionName).click({ force: true });
});

/**
 * Fill the appointment form with default test data.
 * Usage: cy.fillAppointmentForm()
 */
Cypress.Commands.add('fillAppointmentForm', (overrides = {}) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const dateStr = futureDate.toISOString().split('T')[0];

  const data = {
    name: 'Test Patient',
    phone: '9876543210',
    email: 'test@example.com',
    service: 'General Consultation',
    date: dateStr,
    time: 'Morning (9AM - 12PM)',
    message: 'Routine checkup.',
    ...overrides,
  };

  cy.get('input[name="name"]').clear().type(data.name);
  cy.get('input[name="phone"]').clear().type(data.phone);
  cy.get('input[name="email"]').clear().type(data.email);
  cy.get('select[name="service"]').select(data.service);
  cy.get('input[name="date"]').type(data.date);
  cy.get('select[name="time"]').select(data.time);
  cy.get('textarea[name="message"]').clear().type(data.message);
  cy.get('input[name="consent"]').check();
});
