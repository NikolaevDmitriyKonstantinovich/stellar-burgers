import { before } from 'node:test';

const addIngridientBtn = '[data-cy="ingredient № 1] button[type=button]';

describe('e2e', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('POST', '**/orders', {
      fixture: 'orders.json'
    });

    cy.setCookie('accessToken', 'testAccessToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });
  afterEach(() => {});

  it('add ingridients to list', () => {
    cy.visit('/');
    cy.get(
      '[data-test=ingredient-643d69a5c3f7b9001cfa0943] button[type=button]'
    ).click();
    cy.get('[data-test=constructor-element]')
      .contains('Соус фирменный Space Sauce')
      .should('exist');
  });

  it('open and close modal vindow', () => {
    cy.visit('/');
    cy.get('[data-test=ingredient-643d69a5c3f7b9001cfa0943]').click();
    cy.get('[data-test=ingredient-details]').should('exist');
    cy.get('[data-test=modal] button[type=button]').click();
    cy.get('[data-test=ingredient-details]').should('not.exist');
  });

  it('get order', () => {
    cy.visit('/');
    //add ingredient
    cy.get(
      '[data-test=ingredient-643d69a5c3f7b9001cfa0943] button[type=button]'
    ).click();
    //add bun
    cy.get(
      '[data-test=ingredient-643d69a5c3f7b9001cfa093c] button[type=button]'
    ).click();
    cy.get('[data-test=constructor-element]')
    .contains('Соус фирменный Space Sauce')
    .should('exist');
    cy.get('[data-test=burger-constructor-bun-top]')
    .contains('Краторная булка N-200i')
    .should('exist');
    //get order
    cy.get('[data-test=get-order-button]').trigger('click');
    cy.get('[data-test=modal]').contains('65464').should('exist');
    cy.get('[data-test=modal]')
      .contains('Ваш заказ начали готовить')
      .should('exist');
    cy.get('[data-test=modal] button[type=button]').click();
    cy.get('[data-test=modal]').should('not.exist');
    cy.get('[data-test=burger-ingredients-list]').should('not.exist');
    cy.get('[data-test=burger-constructor-bun-top').should('not.exist');
  });
});
