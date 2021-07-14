import ProductPage from "../function/product.pages"

describe("Product", {retries: {runMode: 2}}, function(){
    it("Access a Product via category after applying multiple filters", function(){
        ProductPage.visit_ebay();
        ProductPage.search_items("cell phones and accessories");
        cy.wait(5000);
        ProductPage.click_button_search();
        ProductPage.choose_category("Cell Phones & Smartphones");
        
        //Choose Filters
        cy.get('[class="x-refine__item"]').contains('Price').click();
        ProductPage.click_button_more_filters();
        ProductPage.choose_filters("Screen Size", "4.5 - 4.9 in");
        ProductPage.choose_filters("Item Location", "Asia");
        ProductPage.choose_filters_price("Price", "IDR1000000 - IDR10000000", "1000000", "10000000");
        ProductPage.click_button_apply();

        //3 Filters tags Applied
        ProductPage.verify_filters_are_applied("4.5 - 4.9 in");
        ProductPage.verify_filters_are_applied("IDR1,000,000.00 to IDR10,000,000.00");
        ProductPage.verify_filters_are_applied("Asia");
    });

    it("Access a Product via Search", function(){
        var test_data={
            "items": /Apple MacBook Pro/
        }
        ProductPage.visit_ebay();
        ProductPage.search_items("Macbook");
        cy.wait(5000);
        ProductPage.click_button_search();
        ProductPage.choose_category("Computers/Tablets & Networking");
        ProductPage.verify_success_load_page();
        ProductPage.verify_first_item_on_pages(test_data.items);
    });

});
