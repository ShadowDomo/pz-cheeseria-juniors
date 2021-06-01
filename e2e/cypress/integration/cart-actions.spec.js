/// <reference types="cypress" />
// import cy from 'cypress';

// eslint-disable-next-line no-undef
context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })

  // task 4
  it('Purchase items', () => {

    // Theres probably a better way to do this without hardcoding the strings in 
    // by pulling the names directly from the DOM.
    cy.intercept('POST', '/api/makePurchase', (req) => {
      expect((req.body).length).to.equal(2);
      expect(JSON.stringify(req.body)).to.have.string('ADELOST');
      expect(JSON.stringify(req.body)).to.have.string('ABBAYE DU MONT DES CATS');
    })

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=cart-purchase-button]').click();

  })
})


