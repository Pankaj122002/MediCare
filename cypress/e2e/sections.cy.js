// Tests for About, FAQ, Contact, Testimonials, and Footer sections

const HERO_READY_TIMEOUT = 30000;

describe('About Section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('nav a').contains('About').click({ force: true });
    cy.get('#about').should('exist');
  });

  it('shows the doctor name', () => {
    cy.get('#about').contains('Dr. Umesh Sharma').should('exist');
  });

  it('shows the doctor title', () => {
    cy.get('#about').contains('General Physician').should('exist');
  });

  it('shows years of experience badge', () => {
    cy.get('#about').contains('5+').should('exist');
    cy.get('#about').contains('Years Exp.').should('exist');
  });

  it('shows doctor qualification tags', () => {
    cy.get('#about').contains('MBBS').should('exist');
  });

  it('shows stats: awards, patients, surgeries', () => {
    cy.get('#about').contains('Awards Won').should('exist');
    cy.get('#about').contains('Happy Patients').should('exist');
    cy.get('#about').contains('Surgeries').should('exist');
  });

  it('shows Download CV button', () => {
    cy.get('#about').contains('Download CV').should('exist');
  });
});

describe('FAQ Section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('nav a').contains('FAQ').click({ force: true });
    cy.get('#faq').should('exist');
  });

  it('shows section heading', () => {
    cy.get('#faq').contains('Frequently Asked').should('exist');
    cy.get('#faq').contains('Got Questions?').should('exist');
  });

  it('renders 5 FAQ items', () => {
    cy.get('#faq').find('button').should('have.length', 5);
  });

  it('first FAQ is open by default', () => {
    cy.get('#faq').contains('What are your clinic hours?').should('be.visible');
    cy.get('#faq').contains('9:00 AM to 6:00 PM').should('be.visible');
  });

  it('clicking a closed FAQ opens it', () => {
    cy.get('#faq').contains('Do I need an appointment').click({ force: true });
    cy.get('#faq').contains('first-come, first-served').should('be.visible');
  });

  it('clicking an open FAQ closes it', () => {
    // First FAQ is open by default — click it to close
    cy.get('#faq').contains('What are your clinic hours?').click({ force: true });
    cy.get('#faq').contains('9:00 AM to 6:00 PM').should('not.be.visible');
  });

  it('shows all 5 FAQ questions', () => {
    const questions = [
      'What are your clinic hours?',
      'Do I need an appointment',
      'What should I bring to my first appointment?',
      'Do you offer virtual or telemedicine',
      'What is your cancellation policy?',
    ];
    questions.forEach(q => {
      cy.get('#faq').contains(q).should('exist');
    });
  });
});

describe('Contact Section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('nav a').contains('Contact').click({ force: true });
    cy.get('#contact').should('exist');
  });

  it('shows section heading', () => {
    cy.get('#contact').contains('Visit Our Clinic').should('exist');
    cy.get('#contact').contains('Get in Touch').should('exist');
  });

  it('shows clinic address', () => {
    cy.get('#contact').contains('Near Ambedkar Gate').should('exist');
    cy.get('#contact').contains('Muradnagar').should('exist');
  });

  it('shows clinic phone number', () => {
    cy.get('#contact').contains('+918954040631').should('exist');
  });

  it('shows emergency phone number', () => {
    cy.get('#contact').contains('Emergency').should('exist');
  });

  it('shows email address', () => {
    cy.get('#contact').contains('doctor@medicarepro.com').should('exist');
  });

  it('shows clinic hours for Monday', () => {
    cy.get('#contact').contains('monday', { matchCase: false }).should('exist');
    cy.get('#contact').contains('9:00 AM - 6:00 PM').should('exist');
  });

  it('shows Sunday as Closed', () => {
    cy.get('#contact').contains('sunday', { matchCase: false }).should('exist');
    cy.get('#contact').contains('Closed').should('exist');
  });

  it('renders an embedded Google Map', () => {
    cy.get('#contact').find('iframe').should('exist');
  });
});

describe('Testimonials Section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('nav a').contains('Testimonials').click({ force: true });
    cy.get('#testimonials').should('exist');
  });

  it('shows section heading', () => {
    cy.get('#testimonials').contains('Trusted by Thousands').should('exist');
    cy.get('#testimonials').contains('Patient Stories').should('exist');
  });

  it('renders at least one testimonial card', () => {
    cy.get('#testimonials').find('.flex-none').should('have.length.gte', 1);
  });

  it('shows swipe hint on mobile', () => {
    cy.viewport(390, 844);
    cy.reload();
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('#testimonials').contains('Swipe to see more').should('be.visible');
  });
});

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.scrollTo('bottom');
  });

  it('shows MediCarePro brand name', () => {
    cy.get('footer').contains('MediCarePro').should('exist');
  });

  it('shows Quick Links section', () => {
    cy.get('footer').contains('Quick Links').should('exist');
    cy.get('footer').contains('About The Doctor').should('exist');
    cy.get('footer').contains('Our Services').should('exist');
    cy.get('footer').contains('Contact Us').should('exist');
  });

  it('shows Services section', () => {
    cy.get('footer').contains('Services').should('exist');
    cy.get('footer').contains('General Consultation').should('exist');
  });

  it('shows Contact info', () => {
    cy.get('footer').contains('doctor@medicarepro.com').should('exist');
  });

  it('shows copyright', () => {
    cy.get('footer').contains('MediCare Pro. All rights reserved.').should('exist');
  });

  it('scroll-to-top button exists', () => {
    cy.get('footer').find('button').should('exist');
  });
});

describe('Floating Emergency Button', () => {
  it('is always visible on the page', () => {
    cy.visit('/');
    cy.get('h1', { timeout: HERO_READY_TIMEOUT }).contains('Your Health');
    cy.get('a[aria-label="Call Emergency"]').should('exist');
  });
});
