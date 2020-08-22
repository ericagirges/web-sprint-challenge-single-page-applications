describe("Order Pizza App", () => {
    const fnameInput = () => cy.get("input[name='fname']")
    const lnameInput = () => cy.get("input[name='lname']")
    const sizeSelect = () => cy.get("select[name='pizzaSize']")
    const submitButton = () => cy.get("button")

    it("can navigate to http://localhost:3001/order-form", () => {
        cy.visit("http://localhost:3001/order-form")
        cy.url().should("includes", "localhost")
    })

    it("can type something in the 'text' input", () => {
        cy.get("input[name='fname']")
        .type("Cardi")
        .should("have.value", "Cardi")
    })

    it("can type something in the 'text' input", () => {
        cy.get("input[name='lname']")
        .type("Belcalis")
        .should("have.value", "Belcalis")
    })

    it("can type email in the 'text' input", () => {
        cy.get("input[name='email']")
        .type("cardib@email.com")
        .should("have.value", "cardib@email.com")
    })

    it("can select size", () => {
        sizeSelect().select(["small"]).should("have.value", "small")  
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
