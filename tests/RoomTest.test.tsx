import { render, screen } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import ProgressBar from "../src/components/RoomsPage/ProgressBar/ProgressBar"
import Filters from "../src/components/RoomsPage/Filters/Filters";
import ListRooms from "../src/components/RoomsPage/ListRooms/ListRooms"
import RoomCard from "../src/components/RoomsPage/ListRooms/RoomCard/RoomCard"
import NewProperty from "../src/components/RoomsPage/ListRooms/RoomCard/NewProperty/NewProperty"
import RoomsPage from "../src/pages/RoomsPage"
import SpecialDeal from "../src/components/RoomsPage/ListRooms/RoomCard/SpecialDeal/SpecialDeal"
import RoomPageMenubar from "../src/components/RoomsPage/ListRooms/RoomCard/RoomPageMenuBar/RoomPageMenubar"
import Rating from "../src/components/RoomsPage/ListRooms/RoomCard/Rating/Rating";
import Filter from "../src/components/RoomsPage/Filters/Filters";
import RoomPageMenubar from "../src/components/RoomsPage/ListRooms/RoomCard/RoomPageMenuBar/RoomPageMenubar"
import OTPmodal from "../src/components/Modal/OTPModal/OTPModal";
import CancelConfirmModal from "../src/components/Modal/CancelConfirmModal/CancelConfirmModal";
import TermsAndConditions from "../src/components/Checkout/TermsAndConditions/TermsAndCondition";

test("progress bar 1", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <ProgressBar />
        </Provider>
      </IntlProvider>
    );
  
    // Check if the component renders without crashing
    const guestsComponent = screen.getByText("1: Choose Rooms");
    expect(guestsComponent).toBeDefined();
  });
  
  
  
  test("Progress bar 2", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <ProgressBar />
        </Provider>
      </IntlProvider>
    );
    const guestSelectText = screen.getByText("2: Choose add ons");
    expect(guestSelectText).toBeDefined();
  
  });

    
  test("Progress bar 3", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <ProgressBar />
        </Provider>
      </IntlProvider>
    );
    const guestSelectText = screen.getByText("3: Check Out");
    expect(guestSelectText).toBeDefined();
  
  });
  
  test("Filter Heading", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <Filters />
        </Provider>
      </IntlProvider>
    );
    const guestSelectText = screen.getByText("Narrow your results");
    expect(guestSelectText).toBeDefined();
  
  });
  

  test("Room Results", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <RoomPageMenubar />
        </Provider>
      </IntlProvider>
    );
    const guestSelectText = screen.getByText("Room Results");
    expect(guestSelectText).toBeDefined();
  });


  test("Room Card 1", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
         <NewProperty />
        </Provider>
      </IntlProvider>
    );
    const guestSelectText = screen.getByText("New property");
    expect(guestSelectText).toBeDefined();
  });

  const promotionsImagesMock = {
    promotions: ["Promo1, Description1, 0.2", "Promo2, Description2, 0.3"] // Example data
  };

  test("Room Card 2", () => {
    let lang = English;
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <SpecialDeal promotionsImages={promotionsImagesMock} /> {/* Provide the mock prop */}
        </Provider>
      </IntlProvider>
    );
    const specialDealText = screen.getByText("Special deal");
    expect(specialDealText).toBeDefined();
  });




const mockRoomType = {
  roomTypeName: "GRAND_DELUXE",
  price: 110,
};

const mockRoomDetail = {
  propertyAddress: "Kickdrum",
  propertyRoomDTOList: {
    "GRAND_DELUXE": {
      areaInSquareFeet: 450,
      maxCapacity: 2,
      singleBed: 1,
      doubleBed: 2
    }
    }
};





test("RoomCard renders correctly with mock data", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomCard roomType={mockRoomType} roomDetail={mockRoomDetail} />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const roomName = screen.getByText("GRAND_DELUXE");
  expect(roomName).toBeDefined();

  // Check if room address is rendered
  const roomAddress = screen.getByText("Kickdrum");
  expect(roomAddress).toBeDefined();

});



test("Select room", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomCard roomType={mockRoomType} roomDetail={mockRoomDetail} />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const selectroom = screen.getByText("SELECT ROOM");
  expect(selectroom).toBeDefined();

});


test("per night", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomCard roomType={mockRoomType} roomDetail={mockRoomDetail} />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const pernight = screen.getByText("per night");
  expect(pernight).toBeDefined();
});


test("Select room", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomCard roomType={mockRoomType} roomDetail={mockRoomDetail} />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("Inclusive");
  expect(inclusive).toBeDefined();
});


test("Promocode", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomCard roomType={mockRoomType} roomDetail={mockRoomDetail} />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("Kickdrum");
  expect(inclusive).toBeDefined();
});

test("filter", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <Filter />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("Chexk Itinerary");
  expect(inclusive).toBeDefined();
});


test("filter", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomPageMenubar />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("DEFAULT");
  expect(inclusive).toBeDefined();
});

test("filter", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomPageMenubar />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("Room Results");
  expect(inclusive).toBeDefined();
});


test("filter", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <RoomPageMenubar />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("|");
  expect(inclusive).toBeDefined();
});

test("otp", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <OTPmodal />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("Enter OTP for cancelling the room booking");
  expect(inclusive).toBeDefined();
});



test("otp 2", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <OTPmodal />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("CONFIRM OTP");
  expect(inclusive).toBeDefined();
});



test("cancel 1", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <CancelConfirmModal />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("Do you really want to cancel the booking");
  expect(inclusive).toBeDefined();
});


test("cancel 2", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <CancelConfirmModal />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("YES");
  expect(inclusive).toBeDefined();
});

test("termsandcondition 1", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <TermsAndConditions />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("WEBSITE");
  expect(inclusive).toBeDefined();
});



test("termsandcondition 2", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <TermsAndConditions />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("infringes any patent, trademark, copyright or other proprietary rights;");
  expect(inclusive).toBeDefined();
});

test("termsandcondition 3", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <TermsAndConditions />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("violates any law for the time being in force;");
  expect(inclusive).toBeDefined();
});

test("termsandcondition 4", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <TermsAndConditions />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("impersonates another person;");
  expect(inclusive).toBeDefined();
});



test("termsandcondition 5", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <TermsAndConditions />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("is harmful to child;");
  expect(inclusive).toBeDefined();
});

test("termsandcondition 5", () => {
  // Setup
  const lang = English;

  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <TermsAndConditions />
      </Provider>
    </IntlProvider>
  );

  // Assertions
  // Check if room type name is rendered
  const inclusive = screen.getByText("User(s) shall not host, display, upload, publish, transmit or share any information on KDU website or app which:");
  expect(inclusive).toBeDefined();
});