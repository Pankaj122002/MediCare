// Tests for Hero section, Navigation, Theme toggle, and Intro sequence

const HERO_READY_TIMEOUT = 30000; // Intro sequence can take time

describe('Intro & Hero Section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows a loading indicator while intro loads', () => {
    // Spinner or "Loading..." text should appear initially
    cy.get('.fixed.inset-0.z-50').should('exist');
  });

  it('displays hero content after intro finishes', () => {
    cy.get('h1', { timeout: HERO_READY_TIMEOUT })
      .contains('Your Health')
      .should('be.visible');

    cy.contains('Our Priority.').should('be.visible');
    cy.contains('Experience premium healthcare').should('be.visible');
  });

  it('has Book Appointment and Call Emergency buttons in hero', () => {
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');

    cy.get('a').contains('Book Appointment').should('be.visible');
    cy.get('a').contains('Call Emergency').should('be.visible');
  });

  it('Book Appointment button scrolls to appointment section', () => {
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');

    cy.get('a').contains('Book Appointment').first().click({ force: true });
    cy.get('#appointment').should('exist');
  });
});

describe('Navigation — Desktop', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
  });

  it('shows the MediCarePro logo', () => {
    cy.get('header').contains('MediCare').should('be.visible');
  });

  it('renders all desktop nav links', () => {
    const links = ['Home', 'About', 'Services', 'Testimonials', 'FAQ', 'Contact'];
    links.forEach(link => {
      cy.get('nav').contains(link).should('be.visible');
    });
  });

  it('renders Book Now and Emergency buttons', () => {
    cy.get('header').contains('Book Now').should('be.visible');
    cy.get('header').contains('Emergency').should('be.visible');
  });

  it('smooth-scrolls to About section on click', () => {
    cy.get('nav a').contains('About').click({ force: true });
    cy.get('#about').should('exist');
  });

  it('smooth-scrolls to Services section on click', () => {
    cy.get('nav a').contains('Services').click({ force: true });
    cy.get('#services').should('exist');
  });

  it('smooth-scrolls to Contact section on click', () => {
    cy.get('nav a').contains('Contact').click({ force: true });
    cy.get('#contact').should('exist');
  });
});

describe('Navigation — Mobile', () => {
  beforeEach(() => {
    cy.viewport(390, 844); // iPhone 14 Pro
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
  });

  it('desktop nav links are hidden on mobile', () => {
    cy.get('nav.hidden').should('exist'); // desktop nav has class hidden md:flex
  });

  it('hamburger button is visible on mobile', () => {
    cy.get('button[aria-label="Toggle menu"]').should('be.visible');
  });

  it('mobile menu opens when hamburger is clicked', () => {
    cy.get('button[aria-label="Toggle menu"]').click({ force: true });
    cy.contains('Book Appointment').should('be.visible');
    cy.contains('Call Emergency').should('be.visible');
  });

  it('mobile menu closes when a nav link is clicked', () => {
    cy.get('button[aria-label="Toggle menu"]').click({ force: true });
    cy.contains('About').click({ force: true });
    cy.get('#about').should('exist');
  });
});

describe('Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
  });

  it('starts in dark mode by default', () => {
    cy.get('html').should('have.class', 'dark');
  });

  it('switches to light mode when theme button clicked', () => {
    cy.get('button[aria-label="Toggle theme"]').first().click({ force: true });
    cy.get('html').should('not.have.class', 'dark');
  });

  it('switches back to dark mode on second click', () => {
    cy.get('button[aria-label="Toggle theme"]').first().click({ force: true });
    cy.get('html').should('not.have.class', 'dark');
    cy.get('button[aria-label="Toggle theme"]').first().click({ force: true });
    cy.get('html').should('have.class', 'dark');
  });
});
