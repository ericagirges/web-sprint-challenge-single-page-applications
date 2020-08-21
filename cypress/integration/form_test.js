describe("Order Pizza App", () => {

    it("can navigate to http://localhost:3001/order-form", () => {
        cy.visit("http://localhost:3001/order-form")
        cy.url().should("includes", "localhost")
    })

    it("can type something in the 'text' input", () => {
        cy.get("input[name='fname']")
        .type("Cardi")
        .should("have.value", "Cardi")
        lnameInput().type("Belcalis").should("have.value", "Belcalis")
    })

    it("terms of service checkbox functional", () => {
        cy.get("[type='checkbox']")
        .check()
    })

    it("can submit registration form", () => {
        submitButton().should('be.enabled')
        submitButton().click()
          })
    })
})