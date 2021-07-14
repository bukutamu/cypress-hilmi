var ProductPage = {

    visit_ebay: function(){
        cy.visit("https://www.ebay.com/");

        cy.get('[alt="eBay Logo"]').should('be.visible');
    },

    search_by_category: function(category_name, category_details_name){
        //Click button shop by category
        cy.get('[id="gh-shop-a"]').contains('Shop by category').click({force:true});
        //Choose Category
        cy.get('[class="scnd"]').contains(category_name).click({force:true});

        //Choose Category Details
        cy.get('[class="b-textlink b-textlink--parent"]').contains(category_details_name).click({force:true});
        //Assert success visit page
        cy.get('[class="b-pageheader__text"]').contains(category_details_name).should('be.visible');
    },

    click_button_all_filters: function(){
        //Click button all filters
        cy.get('[class="brm__all-filters fake-link"]').contains('All Filters').click({force:true});

        //Assert popup
        cy.get('[class="dialog__window"]').should('be.visible');
    },

    click_button_more_filters: function(){
        cy.get('[class="fake-link fake-link--secondary"]').contains('More filters...').click({force:true});
    },

    choose_filters: function(filters, filters_details){
        if(filters == "Screen Size"){
            cy.get('[role="tab"]').contains(filters).click({force:true});
            cy.get('[class="spinner x-overlay-spinner--display"]').should('not.exist');
            cy.get('[class="x-refine__multi-select-label"]').contains(filters_details).click({force:true});
            cy.get('[class="x-tray-pill"]').contains(filters_details).should('be.visible');
        }
        else if(filters == "Item Location"){
            cy.get('[role="tab"]').contains(filters).click({force:true});
            cy.get('[class="spinner x-overlay-spinner--display"]').should('not.exist');
            cy.get('[data-aspect="location"]').contains(filters_details).click({force:true});
            cy.get('[class="x-tray-pill"]').contains(filters_details).should('be.visible');
        }
    },

    choose_filters_price: function(filters, filters_details, min_value, max_value){
        cy.get('[role="tab"]').contains(filters).click({force:true});
        cy.get('[class="spinner x-overlay-spinner--display"]').should('not.exist');
        cy.get('#c3-subPanel-_x-price-0-textrange > div > div:nth-child(2) > div').type(min_value);
        cy.get('#c3-subPanel-_x-price-0-textrange > div > div:nth-child(4) > div').type(max_value).type('{enter}');
        cy.get('[class="x-tray-pill"]').contains(filters_details).should('be.visible');
    },

    click_button_apply: function(){
        //Click button apply
        cy.get('[aria-label="Apply"]').contains('Apply').click({force:true});

        //Assert popup not exist
        cy.get('[class="dialog__window"]').should('not.exist');
    },

    verify_filters_are_applied: function(filters_details){
        cy.get('[class="carousel__snap-point srp-carousel-list__item--large-items srp-multi-aspect__item--applied"]').contains(filters_details);
    },

    search_items: function(items){
        cy.get('[aria-label="Search for anything"]').click().type(items);
    },

    click_button_search: function(){
        cy.get('[value="Search"]').click({force:true});
    },

    choose_category: function(category){
        cy.get('[data-scope="PRIMARY"]').contains(category).click({force:true});
    },

    verify_success_load_page: function(){
        cy.intercept('POST', '/blueberry/v1/ads/identity/pixels').as('assertPage');
        cy.wait('@assertPage');
    },

    verify_first_item_on_pages: function(items){
        cy.get('[data-view="mi:1686|iid:1"]').contains(items).should('be.visible');
    }

    
};

export default ProductPage;