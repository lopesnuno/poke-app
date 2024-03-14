describe('Poke App', () => {
  context('Main features', () => {
    it('Should look for a pokemon', () => {
      searchPokemon('charizard');
      verifyPokemonData('charizard', 6);
    });

    it('Should show error if pokemon doesn\'\t exist', () => {
      searchPokemon('Unknown');

      cy.get('[data-cy=error]')
        .contains('No pokemon found, please try another one!');
    });

    context('Show previous/next pokemon', () => {
      it('Should load next pokemon', () => {
        searchPokemon('charizard');

        cy.location().should((l) => {
          expect(l.pathname).to.eq('/charizard');
        })

          .get('button[name=action]')
          .eq(1)
          .click()

          .location().should((l) => {
          expect(l.pathname).to.eq('/7');
        });

        verifyPokemonData('squirtle', 7);
      });

      it('Should load previous pokemon', () => {
        searchPokemon('charizard');

        cy.location().should((l) => {
          expect(l.pathname).to.eq('/charizard');
        })

          .get('button[name=action]')
          .eq(0)
          .click()

          .location().should((l) => {
          expect(l.pathname).to.eq('/5');
        });

        verifyPokemonData('charmeleon', 5);
      });
    });
  });
});

function searchPokemon(name: string) {
  return cy.visit('/')

    // This is used to wait for page hydration
    .get('body[data-cy=ready]')

    .get('input[name=name]')
    .should('exist')

    .type(name)

    .get('button[name=search]')
    .should('exist')
    .click()

    // This is used to wait for page hydration
    .get('body[data-cy=ready]')

    .location()
    .should((l) => {
      expect(l.pathname).to.eq(`/${name.toLowerCase()}`);
    });
}

function verifyPokemonData(name: string, number: number) {
  return cy.get('[data-cy=pokemon-name]')
    .contains(name)

    .get('[data-cy=pokemon-number]')
    .contains(number);
}