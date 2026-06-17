describe('Clinic Website Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads the intro sequence and navigates to hero section', () => {
    // Check intro sequence loads
    cy.get('button').contains('Explore My Services', { timeout: 30000 }).should('be.visible').click()
    
    // Check navigation and hero load
    cy.get('h1').contains('Your Health', { timeout: 15000 }).should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('toggles theme correctly', () => {
    cy.get('button').contains('Explore My Services', { timeout: 30000 }).click()
    cy.get('html').should('have.class', 'dark')
    cy.get('button[aria-label="Toggle theme"]').first().click({ force: true })
    cy.get('html').should('not.have.class', 'dark')
  })

  it('has working navigation links', () => {
    cy.get('button').contains('Explore My Services', { timeout: 30000 }).click()
    cy.get('nav a').contains('About').click({ force: true })
    cy.url().should('include', '#about')
  })
})
