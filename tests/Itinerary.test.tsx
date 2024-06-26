import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store/store";
import { IntlProvider } from "react-intl";
import English from "../src/languages/en-US.json";
import RoomModal from "../src/components/Modal/RoomModal/RoomModal";
import { BrowserRouter } from "react-router-dom";
import SelectPackageCard from "../src/components/Modal/RoomModal/SelectPackageCard/SelectPackageCard";
import Itinerary from "../src/components/Checkout/Itinerary"
import MockAdapter from 'axios-mock-adapter'
import axios from "axios";

const mock = new MockAdapter(axios)

// Mock the API response
mock.onGet('/api/data').reply(200, { /* mocked data */ })


test("itinerary title", async() => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    await waitFor(() => {
        const roomTypeElement = screen.getByText("Your Trip Itinerary");
        expect(roomTypeElement).toBeDefined();
      });
  });


//   test("itinerary property name", () => {
//     let lang = English;

//     render(
//       <IntlProvider locale="en-US" messages={lang}>
//         <Provider store={store}>
//           <BrowserRouter>
//           <Itinerary />
//           </BrowserRouter>
//         </Provider>
//       </IntlProvider>
//     );
//     const roomTypeElement = screen.getByText("Long Beautiful Resort Name");
//     expect(roomTypeElement).toBeDefined();
//   });

  test("Remove btn", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    const roomTypeElement = screen.getByText("Remove");
    expect(roomTypeElement).toBeDefined();
  });

//   test("Itinerary date ", () => {
//     let lang = English;

//     render(
//       <IntlProvider locale="en-US" messages={lang}>
//         <Provider store={store}>
//           <BrowserRouter>
//           <Itinerary />
//           </BrowserRouter>
//         </Provider>
//       </IntlProvider>
//     );
//     const roomTypeElement = screen.getByText("May 6- May 9 2024 | 1 adult | 1 child");
//     expect(roomTypeElement).toBeDefined();
//   });


  test("Executive txt ", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    const roomTypeElement = screen.getByText("your itinerary");
    expect(roomTypeElement).toBeDefined();
  });



  test("vat ", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    const roomTypeElement = screen.getByText("VAT");
    expect(roomTypeElement).toBeDefined();
  });



  test("Due now", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    const roomTypeElement = screen.getByText("Due Now");
    expect(roomTypeElement).toBeDefined();
  });



  test("Due at resort", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    const roomTypeElement = screen.getByText("Due at Resort");
    expect(roomTypeElement).toBeDefined();
  });


  test("Subtotal", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Subtotal");
    expect(roomTypeElement).toBeDefined();
  });

  test("Check out", () => {
    let lang = English;

    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <Itinerary />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Check Out");
    expect(roomTypeElement).toBeDefined();
  });