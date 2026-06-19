describe('Services and Appointment', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('button').contains('Explore My Services', { timeout: 30000 }).click()
  })

  it('scrolls to appointment section and fills the form', () => {
    cy.get('a[href="#appointment"]').contains('Book Now').click({ force: true })
    cy.get('#appointment').should('be.visible')
    
    // Fill the form
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="phone"]').type('1234567890')
    cy.get('input[name="email"]').type('john@example.com')
    cy.get('input[name="date"]').type('2026-10-10')
    cy.get('select[name="time"]').select('Morning (9AM - 12PM)')
    cy.get('select[name="service"]').select('General Consultation')
    cy.get('textarea[name="message"]').type('Need a general checkup.')
    cy.get('input[name="consent"]').check()
  })
})
