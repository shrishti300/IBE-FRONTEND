import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store/store";
import { IntlProvider } from "react-intl";
import English from "../src/languages/en-US.json";
import TenantForm from "../src/components/TenantForm/TenantForm";
import Banner from "../src/components/TenantForm/Banner/Banner";
import MaximumDays from "../src/components/TenantForm/Days/MaximumDays";
import MaximumGuests from "../src/components/TenantForm/Guests/MaximumGuests";
import HeaderLogo from "../src/components/TenantForm/HeaderLogo/HeaderLogo";
import PercentPayable from "../src/components/TenantForm/PercentPayable/PercentPayable";
import Taxes from "../src/components/TenantForm/Taxes/Taxes";
import Title from "../src/components/TenantForm/Title/Title";
import TenantConfig from "../src/pages/TenantConfig"
import Amenities from "../src/components/TenantForm/AmenitiesConfig/AmenitiesConfig"
import PropertyDescription from "../src/components/TenantForm/PropertyDescription/PropertyDescription";
import Promotions from "../src/components/TenantForm/PromotionsConfig/PromotionsConfig"
import Sort from "../src/components/TenantForm/SortConfig/SortConfig"
import FiltersConfig from "../src/components/TenantForm/FiltersConfig/FiltersConfig";
import { BrowserRouter } from "react-router-dom";




test("Banner", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <Banner />
      </Provider>
    </IntlProvider>
  );
  // Assert that the component is rendered
  const bannerElement = screen.getByTestId('banner');
  expect(bannerElement).toBeDefined();
});

test("banner-input", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Banner />
        </Provider>
      </IntlProvider>
    );
    // Assert that the component is rendered
    const bannerElement = screen.getByTestId("banner-input");
    expect(bannerElement).toBeDefined();
  });


  // days test 


test("renders guests component1", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <MaximumDays/>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const maxdays= screen.getByText("Max Rooms");
    expect(maxdays).toBeDefined();
  });
  

  // maximum guests

  test("renders guests component2", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <MaximumGuests />
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const maxdays= screen.getByText("Max Guests");
    expect(maxdays).toBeDefined();
  });
  

  // header logo

  test("renders guests component3", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <HeaderLogo />
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const headerLogo =screen.getByText("Header Logo");
    expect(headerLogo).toBeDefined();
  });
  

  // percentage paybale

  test("renders guests component4", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <PercentPayable/>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const percentPayable =screen.getByText("Due At Resort");
    expect(percentPayable).toBeDefined();
  });

  // taxes 

  test("renders guests component5", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Taxes />
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Occupancy Tax");
    expect(taxPercent).toBeDefined();
  });


  // Title


  test("renders guests component6", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Title />
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Title");
    expect(taxPercent).toBeDefined();
  });



  test("renders guests component7", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
        <BrowserRouter>
          <TenantConfig/>
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Room Config");
    expect(taxPercent).toBeDefined();
  });

  test("renders personal config", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <TenantConfig/>
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Personal Config");
    expect(taxPercent).toBeDefined();
  });

  test("renders property component", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <TenantConfig/>
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Property Config");
    expect(taxPercent).toBeDefined();
  });


  test("renders property component", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Amenities/>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Amenities");
    expect(taxPercent).toBeDefined();
  });

  test("property description", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <PropertyDescription/>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Room Description");
    expect(taxPercent).toBeDefined();
  });

  test("promotions config", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Promotions/>
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const taxPercent =screen.getByText("Promotions");
    expect(taxPercent).toBeDefined();
  });
  

  test("update personal details", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <TenantForm />
        </Provider>
      </IntlProvider>
    );
  
    const taxPercent =screen.getByText("Update Personal Details");
    expect(taxPercent).toBeDefined();
  });

  test("Configure Promo Codes", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <TenantForm />
        </Provider>
      </IntlProvider>
    );
  
    const taxPercent =screen.getByText("Configure Promo Codes");
    expect(taxPercent).toBeDefined();
  });
  

  test("Add Promo Code", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <TenantForm />
        </Provider>
      </IntlProvider>
    );
  
    const taxPercent =screen.getByText("Add Promo Code");
    expect(taxPercent).toBeDefined();
  });
  
  test("Add Promo Code", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Sort/>
        </Provider>
      </IntlProvider>
    );
  
    const taxPercent =screen.getByText("Sort");
    expect(taxPercent).toBeDefined();
  });
  test("Filterconfig", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <FiltersConfig/>
        </Provider>
      </IntlProvider>
    );
  
    const taxPercent =screen.getByText("Filter");
    expect(taxPercent).toBeDefined();
  });
  