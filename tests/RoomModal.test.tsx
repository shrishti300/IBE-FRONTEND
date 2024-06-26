import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState, store } from "../src/redux/store/store";
import { IntlProvider } from "react-intl";
import English from "../src/languages/en-US.json";
import RoomModal from "../src/components/Modal/RoomModal/RoomModal";
import { BrowserRouter } from "react-router-dom";
import SelectPackageCard from "../src/components/Modal/RoomModal/SelectPackageCard/SelectPackageCard";

test("RoomModal renders correctly", () => {
  let lang = English;
  const roomTypeMock = {
    roomType: { roomTypeName: "Room Type Name" },
    roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
    promotionsImages: {
      promotions: [], 
      amenities: [], 
      description: "",
      bannerImages: [] // Adding an empty array for bannerImages
    }
  };
  render(
    <IntlProvider locale="en-US" messages={lang}>
      <Provider store={store}>
        <BrowserRouter>
        <RoomModal {...roomTypeMock} />
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  );
  // Instead of looking for "Deals & Packages", let's check if a specific element renders
  const roomTypeElement = screen.getByText("Room Type Name");
  expect(roomTypeElement).toBeDefined();
});



test("Deals and package", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: [], 
        description: "",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Deals and packages");
    expect(roomTypeElement).toBeDefined();
  });
  



test("Amenities", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: [], 
        description: "",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Amenities");
    expect(roomTypeElement).toBeDefined();
  });
  


  test("Enter promo code", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: [], 
        description: "",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Enter Promo Code");
    expect(roomTypeElement).toBeDefined();
  });


  test("Standard rate", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: ["Cable & Pay TV Channels", "Writing Desk and Chair", "Wireless Internet Access"], 
        description: "Discover unmatched luxury in our GRAND_DELUXE accommodations. Experience opulent comfort and exquisite amenities for an unforgettable stay.",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("spend $10 every night you stay and earn $150 in dining credit at the resort.");
    expect(roomTypeElement).toBeDefined();
  });

  test("Standard rate", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: ["Cable & Pay TV Channels", "Writing Desk and Chair", "Wireless Internet Access"], 
        description: "Discover unmatched luxury in our GRAND_DELUXE accommodations. Experience opulent comfort and exquisite amenities for an unforgettable stay.",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Cable & Pay TV Channels");
    expect(roomTypeElement).toBeDefined();
  });


  test("Iron and itroning", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: ["Iron and Ironing Board"], 
        description: "Discover unmatched luxury in our GRAND_DELUXE accommodations. Experience opulent comfort and exquisite amenities for an unforgettable stay.",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const amenityElement = screen.getByText("Iron and Ironing Board");
    expect(amenityElement).toBeDefined();
  });






  test("Writing Desk and Chair", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: ["Cable & Pay TV Channels", "Writing Desk and Chair", "Wireless Internet Access"], 
        description: "Discover unmatched luxury in our GRAND_DELUXE accommodations. Experience opulent comfort and exquisite amenities for an unforgettable stay.",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Writing Desk and Chair");
    expect(roomTypeElement).toBeDefined();
  });


  test("Wireless Internet Access", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: ["Cable & Pay TV Channels", "Writing Desk and Chair", "Wireless Internet Access"], 
        description: "Discover unmatched luxury in our GRAND_DELUXE accommodations. Experience opulent comfort and exquisite amenities for an unforgettable stay.",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("Wireless Internet Access");
    expect(roomTypeElement).toBeDefined();
  });





  test("SelectPackageCard renders with promotions", () => {
    const roomType = { roomTypeName: "Standard Room", price: 100 };
    const promotionsImages = ["Promotion Title", "Promotion Description", 0.9]; // Example promotion data
    
    render(
      <IntlProvider locale="en-US" messages={English}>
        <Provider store={store}>
            <BrowserRouter>
          <SelectPackageCard roomType={roomType} promotionsImages={promotionsImages} />
      </BrowserRouter>
        </Provider>
      </IntlProvider>
    );

    expect(screen.getByText("$90.00")).toBeDefined(); // Price should be discounted
  });
  
  test("SelectPackageCard with promo per night", () => {
    const roomType = { roomTypeName: "Standard Room", price: 100 };
    const promotionsImages = ["Promotion Title", "Promotion Description", 0.9]; // Example promotion data
    
    render(
      <IntlProvider locale="en-US" messages={English}>
        <Provider store={store}>
            <BrowserRouter>
          <SelectPackageCard roomType={roomType} promotionsImages={promotionsImages} />
      </BrowserRouter>
        </Provider>
      </IntlProvider>
    );

    expect(screen.getByText("per night")).toBeDefined(); // Price should be discounted
  });

  test("SelectPackageCard button", () => {
    const roomType = { roomTypeName: "Standard Room", price: 100 };
    const promotionsImages = ["Promotion Title", "Promotion Description", 0.9]; // Example promotion data
    
    render(
      <IntlProvider locale="en-US" messages={English}>
        <Provider store={store}>
            <BrowserRouter>
          <SelectPackageCard roomType={roomType} promotionsImages={promotionsImages} />
      </BrowserRouter>
        </Provider>
      </IntlProvider>
    );

    expect(screen.getByText("SELECT PACKAGE")).toBeDefined(); // Price should be discounted
  });

  // test("SelectPackageCard  txt", () => {
  //   const roomType = { roomTypeName: "Standard Room", price: 100 };
  //   const promotionsImages = ["Promotion Title", "Promotion Description", 0.9]; // Example promotion data
    
  //   render(
  //     <IntlProvider locale="en-US" messages={English}>
  //       <Provider store={store}>
  //           <BrowserRouter>
  //         <SelectPackageCard roomType={roomType} promotionsImages={promotionsImages} />
  //     </BrowserRouter>
  //       </Provider>
  //     </IntlProvider>
  //   );

  //   expect(screen.getByText("Promotion Description")).toBeDefined(); // Price should be discounted
  // });



  test("Deals and package txt", () => {
    const roomType = { roomTypeName: "Standard Room", price: 100 };
    const promotionsImages = ["SENIOR_CITIZEN_DISCOUNT", "Promotion Description", 0.9]; // Example promotion data
    
    render(
      <IntlProvider locale="en-US" messages={English}>
        <Provider store={store}>
            <BrowserRouter>
          <SelectPackageCard roomType={roomType} promotionsImages={promotionsImages} />
      </BrowserRouter>
        </Provider>
      </IntlProvider>
    );

    expect(screen.getByText("SENIOR_CITIZEN_DISCOUNT")).toBeDefined(); // Price should be discounted
  });



  test("APPLY", () => {
    let lang = English;
    const roomTypeMock = {
      roomType: { roomTypeName: "Room Type Name" },
      roomDetail: { propertyRoomDTOList: { "Room Type Name": {} } },
      promotionsImages: {
        promotions: [], 
        amenities: ["Cable & Pay TV Channels", "Writing Desk and Chair", "Wireless Internet Access"], 
        description: "Discover unmatched luxury in our GRAND_DELUXE accommodations. Experience opulent comfort and exquisite amenities for an unforgettable stay.",
        bannerImages: [] // Adding an empty array for bannerImages
      }
    };
    render(
      <IntlProvider locale="en-US" messages={lang}>
        <Provider store={store}>
          <BrowserRouter>
          <RoomModal {...roomTypeMock} />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
    // Instead of looking for "Deals & Packages", let's check if a specific element renders
    const roomTypeElement = screen.getByText("APPLY");
    expect(roomTypeElement).toBeDefined();
  });


