
describe('Cypress E2E Testing', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    
    it('Visits main page and tests header', () => {
        
        // Ensure header appears and that the project name appears on header
        cy.get('[data-cy=headerHeader]').contains('WasmFiddle');
        
        // Test question button functionality
        cy.get('[data-cy=headerQuestionButton]').click();
        cy.get('[data-cy=headerQuestionDialogTitle]').contains('How to use the project');
        cy.get('[data-cy=headerQuestionDialogContent]').contains('Happy coding!');
        cy.get('[data-cy=headerQuestionDialogClose]').click();

        // Test about button functionality
        cy.get('[data-cy=headerAboutButton]').click();
        cy.get('[data-cy=headerAboutDialogTitle]').contains('About the project');
        cy.get('[data-cy=headerAboutDialogContent]').contains('C, C++, or Rust');
        cy.get('[data-cy=headerAboutDialogClose]').click();

    })
})