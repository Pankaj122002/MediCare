describe('Clinic Website Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads the intro sequence and navigates to hero section', () => {
    // Wait for hero section to appear (intro auto-plays)
    cy.get('h1').contains('Your Health', { timeout: 30000 }).should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('toggles theme correctly', () => {
    cy.get('h1').contains('Your Health', { timeout: 30000 }).should('be.visible')
    cy.get('html').should('have.class', 'dark')
    cy.get('button[aria-label="Toggle theme"]').first().click({ force: true })
    cy.get('html').should('not.have.class', 'dark')
  })

  it('has working navigation links', () => {
    cy.get('h1').contains('Your Health', { timeout: 30000 }).should('be.visible')
    cy.get('nav a').contains('About').click({ force: true })
    cy.url().should('include', '#about')
  })
})
