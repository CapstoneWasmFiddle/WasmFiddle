
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

    it('Tests dropdown controls, alert messages, and building and running buttons for C', () => {

        // Build fails if no compilation chosen for C
        cy.get('[data-cy=infoAlert]').contains('Choose a language');
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownC').click();
        cy.get('[data-cy=mainInputEditor]').click().type('int main (){return 0;}', {parseSpecialCharSequences: false});
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildFailAlert]').contains('failed');

        // Build and run succeeds if compilation chosen for C
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownC').click();
        cy.get('[data-cy=compilationDropdown]').click();
        cy.get('[data-cy=dropdownGcc').click();
        cy.get('[data-cy=mainInputEditor]').click();
        cy.get('[data-cy=mainInputEditor]').clear().type('int main (){return 0;}', {parseSpecialCharSequences: false});
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildSuccessAlert]').contains('succesful');
        cy.get('[data-cy=codeInputRun]').click();
        cy.get('[data-cy=runSuccessAlert]').contains('succesful');
    
    });

    it('Tests dropdown controls, alert messages, and building and running buttons for Cpp', () => {
        // Build fails if no compilation chosen for Cpp
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownCpp').click();
        cy.get('[data-cy=mainInputEditor]').click();
        cy.get('[data-cy=mainInputEditor]').type('int main (){return 0;}', {parseSpecialCharSequences: false});
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildFailAlert]').contains('failed');

        // Build and run succeeds if compilation chosen for Cpp
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownCpp').click();
        cy.get('[data-cy=compilationDropdown]').click();
        cy.get('[data-cy=dropdownGpp').click();
        cy.get('[data-cy=mainInputEditor]').click();
        cy.get('[data-cy=mainInputEditor]').clear().type('int main (){return 0;}', {parseSpecialCharSequences: false});
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildSuccessAlert]').contains('succesful');
        cy.get('[data-cy=codeInputRun]').click();
        cy.get('[data-cy=runSuccessAlert]').contains('succesful');

    });
        
    it('Tests dropdown controls, alert messages, and building and running buttons for Rust', () => {
        // Build fails if no compilation chosen for Rust
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownRust').click();
        cy.get('[data-cy=mainInputEditor]').click();
        cy.get('[data-cy=mainInputEditor]').type('fn main (){println!("Hello World!");}', {parseSpecialCharSequences: false});
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildFailAlert]').contains('failed');

        // Build and run succeeds if compilation chosen for Rust
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownRust').click();
        cy.get('[data-cy=compilationDropdown]').click();
        cy.get('[data-cy=dropdownRustc').click();
        cy.get('[data-cy=mainInputEditor]').click();
        cy.get('[data-cy=mainInputEditor]').clear().type('fn main (){println!("Hello World!"}', {parseSpecialCharSequences: false});
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildSuccessAlert]').contains('succesful');
        cy.get('[data-cy=codeInputRun]').click();
        cy.get('[data-cy=runSuccessAlert]').contains('succesful');
    
    });

    it('Tests dropdown controls, alert messages, and building and running buttons for wat', () => {

        // Build and run succeeds for wat
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownWat').click();
        cy.get('[data-cy=wasmEditor]').click();
        cy.get('[data-cy=wasmEditor]').type('(module (table 0 anyfunc) (memory $0 1) (export "memory" (memory $0)) (export "main" (func $main)) (func $main (; 0 ;) (result i32) (i32.const 0)))');
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildSuccessAlert]').contains('succesful');
        cy.get('[data-cy=codeInputRun]').click();
        cy.get('[data-cy=runSuccessAlert]').contains('succesful');

    });

    it('Tests dropdown controls, alert messages, and building and running buttons for wasm', () => {
        
        // Build and run succeeds for wasm
        cy.get('[data-cy=languageDropdown]').click();
        cy.get('[data-cy=languageDropdownWasm').click();
        cy.get('[data-cy=wasmEditor]').click();
        cy.get('[data-cy=wasmEditor]').type('[0,97,115,109,1,0,0,0,1,133,128,128,128,0,1,96,0,1,127,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,145,128,128,128,0,2,6,109,101,109,111,114,121,2,0,4,109,97,105,110,0,0,10,138,128,128,128,0,1,132,128,128,128,0,0,65,0,11];');
        cy.get('[data-cy=codeInputBuild]').click();
        cy.get('[data-cy=buildSuccessAlert]').contains('succesful');
        cy.get('[data-cy=codeInputRun]').click();
        cy.get('[data-cy=runSuccessAlert]').contains('succesful');

    });
})