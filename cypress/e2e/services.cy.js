// Tests for Services section and Appointment booking form

const HERO_READY_TIMEOUT = 30000;

describe('Services Section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('nav a').contains('Services').click({ force: true });
    cy.get('#services').should('exist');
  });

  it('shows the section heading', () => {
    cy.get('#services').contains('Premium Treatments').should('exist');
    cy.get('#services').contains('Our Services').should('exist');
  });

  it('renders all 4 service cards', () => {
    cy.get('#services').find('.grid > div').should('have.length', 4);
  });

  it('shows General Consultation card with correct price', () => {
    cy.get('#services').contains('General Consultation').should('exist');
    cy.get('#services').contains('₹500').should('exist');
  });

  it('shows Full Body Checkup card with correct price', () => {
    cy.get('#services').contains('Full Body Checkup').should('exist');
    cy.get('#services').contains('₹1,500').should('exist');
  });

  it('shows Preventative Care card with correct price', () => {
    cy.get('#services').contains('Preventative Care').should('exist');
    cy.get('#services').contains('₹800').should('exist');
  });

  it('shows Virtual Consultation card with correct price', () => {
    cy.get('#services').contains('Virtual Consultation').should('exist');
    cy.get('#services').contains('₹300').should('exist');
  });

  it('each card has a Details button', () => {
    cy.get('#services').find('button').contains('Details').should('have.length.gte', 1);
  });
});

describe('Appointment Booking Form', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('nav a').contains('Home').click({ force: true });
    cy.get('a[href="#appointment"]').first().click({ force: true });
    cy.get('#appointment').should('exist');
  });

  it('shows the section heading', () => {
    cy.get('#appointment').contains('Book an Appointment').should('exist');
    cy.get('#appointment').contains('Secure Your Spot').should('exist');
  });

  it('renders all required form fields', () => {
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="phone"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('select[name="service"]').should('exist');
    cy.get('input[name="date"]').should('exist');
    cy.get('select[name="time"]').should('exist');
    cy.get('textarea[name="message"]').should('exist');
    cy.get('input[name="consent"]').should('exist');
  });

  it('shows all services in the service dropdown', () => {
    const services = [
      'General Consultation',
      'Full Body Checkup',
      'Preventative Care',
      'Virtual Consultation',
    ];
    services.forEach(service => {
      cy.get('select[name="service"]').contains(service).should('exist');
    });
  });

  it('shows all time slot options', () => {
    cy.get('select[name="time"]').contains('Morning (9AM - 12PM)').should('exist');
    cy.get('select[name="time"]').contains('Afternoon (12PM - 4PM)').should('exist');
    cy.get('select[name="time"]').contains('Evening (4PM - 8PM)').should('exist');
  });

  it('shows validation errors when submitting empty form', () => {
    cy.get('button').contains('Book via WhatsApp').click({ force: true });
    cy.contains('must be at least 3 characters').should('exist');
  });

  it('fills the appointment form successfully', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateStr = futureDate.toISOString().split('T')[0];

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="phone"]').type('9876543210');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('select[name="service"]').select('General Consultation');
    cy.get('input[name="date"]').type(dateStr);
    cy.get('select[name="time"]').select('Morning (9AM - 12PM)');
    cy.get('textarea[name="message"]').type('Need a general checkup.');
    cy.get('input[name="consent"]').check();

    // Verify all fields have values before submitting
    cy.get('input[name="name"]').should('have.value', 'John Doe');
    cy.get('input[name="phone"]').should('have.value', '9876543210');
    cy.get('select[name="service"]').should('have.value', 'general-consultation');
    cy.get('select[name="time"]').should('have.value', 'Morning (9AM - 12PM)');
    cy.get('input[name="consent"]').should('be.checked');
  });

  it('shows Book via WhatsApp and Book via Email buttons', () => {
    cy.get('button').contains('Book via WhatsApp').should('be.visible');
    cy.get('button').contains('Book via Email').should('be.visible');
  });
});
