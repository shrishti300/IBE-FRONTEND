import { render, screen } from "@testing-library/react";
import Rooms from "../src/components/BookingForm/Rooms/Rooms";
import { Provider } from "react-redux";
import { store } from "../src/redux/store/store";
import React from "react";
import { IntlProvider } from "react-intl";
import English from "../src/languages/en-US.json";
import Guests from "../src/components/BookingForm/Guest/Guests";
import SelectDate from "../src/components/BookingForm/SelectDate/SelectDate";
import BookingForm from "../src/components/BookingForm/BookingForm";
import RoomCard from "../src/components/RoomsPage/ListRooms/RoomCard/RoomCard";
import { BrowserRouter } from "react-router-dom";

// room test 

test("renders rooms select", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <Rooms />
      </Provider>
    </IntlProvider>
  );
  const roomsSelect = screen.getByText("Rooms *");
  expect(roomsSelect).toBeDefined();
});

test("changes adult count on increment and decrement", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <Rooms />
      </Provider>
    </IntlProvider>
  );
  const guestSelectText = screen.getByText("1");
  expect(guestSelectText).toBeDefined();

});


// guest test


test("renders guests component", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <Guests />
      </Provider>
    </IntlProvider>
  );

  // Check if the component renders without crashing
  const guestsComponent = screen.getByText("Guests *");
  expect(guestsComponent).toBeDefined();
});



test("changes adult count on increment and decrement", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <Guests />
      </Provider>
    </IntlProvider>
  );
  const guestSelectText = screen.getByText("Adult: 1");
  expect(guestSelectText).toBeDefined();

});

//  select date test

test("renders guests component", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <SelectDate/>
      </Provider>
    </IntlProvider>
  );

  // Check if the component renders without crashing
  const guestsComponent = screen.getByText("Select dates *");
  expect(guestsComponent).toBeDefined();
});


test("Search", () => {
  let lang = English;
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
      <BrowserRouter>
        <BookingForm/>
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  );

  // Check if the component renders without crashing
  const searchbtn= screen.getByText("SEARCH");
  expect(searchbtn).toBeDefined();
});




  