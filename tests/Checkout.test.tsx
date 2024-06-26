import { render, screen } from "@testing-library/react"
import Header from "../src/components/Header/Header"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import { BrowserRouter } from "react-router-dom"
import { Authenticator } from "@aws-amplify/ui-react"
import TravelerInfo from "../src/components/CheckoutComponent/TravellerInfo";
import BillingInfo from "../src/components/CheckoutComponent/BillingInfo";
import PaymentInfo from "../src/components/CheckoutComponent/PaymentInfoComponent";
import Timer from "../src/components/Checkout/TImer/Timer"
import Checkout from "../src/pages/Checkout";
import pkg from '@aws-crypto/sha256-js';
import { configureStore } from "@reduxjs/toolkit"
const { Sha256 } = pkg;


test("hello", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Header />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Kickdrum");
    expect(inputEle).toBeDefined();
})



test("traveller info 1", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <TravelerInfo  />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("1. Traveler Info");
    expect(inputEle).toBeDefined();
})


test("traveller info 2", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <TravelerInfo  />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("First Name");
    expect(inputEle).toBeDefined();
})

test("traveller info 2", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <TravelerInfo  />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Last Name");
    expect(inputEle).toBeDefined();
})



test("traveller info 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <TravelerInfo  />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Phone Number");
    expect(inputEle).toBeDefined();
})


test("traveller info 5", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <TravelerInfo  />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Email");
    expect(inputEle).toBeDefined();
})

test("traveller info 6", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <TravelerInfo  />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Next:Billing Info");
    expect(inputEle).toBeDefined();
})


test("Billing info 1", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("2. Billing Info");
    expect(inputEle).toBeDefined();
})


test("Billing info 2", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("First Name");
    expect(inputEle).toBeDefined();
})


test("Billing info 3", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Last Name");
    expect(inputEle).toBeDefined();
})


test("Billing info 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Mailing Address 1");
    expect(inputEle).toBeDefined();
})

test("Billing info 5", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Mailing Address 2");
    expect(inputEle).toBeDefined();
})

test("Billing info 6", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Country");
    expect(inputEle).toBeDefined();
})
test("Billing info 7", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("State");
    expect(inputEle).toBeDefined();
})


test("Billing info 8", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("City");
    expect(inputEle).toBeDefined();
})


test("Billing info 9", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("ZIP Code");
    expect(inputEle).toBeDefined();
})



test("Billing info 10", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <BillingInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Next: Payment Info");
    expect(inputEle).toBeDefined();
})



test("Payment info 1", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("3.Payment Info");
    expect(inputEle).toBeDefined();
})

test("Payment info 2", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Card Holder Name");
    expect(inputEle).toBeDefined();
})

test("Payment info 3", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Card Number");
    expect(inputEle).toBeDefined();
})


test("Payment info 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Expiration Month");
    expect(inputEle).toBeDefined();
})

test("Payment info 5", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Expiration Year");
    expect(inputEle).toBeDefined();
})
test("Payment info 6", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("CVV Code");
    expect(inputEle).toBeDefined();
})


test("Payment info 7", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Send me special offers");
    expect(inputEle).toBeDefined();
})


test("Payment info 8", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("I agree to the Terms and Policies of travel");
    expect(inputEle).toBeDefined();
})



test("Payment info 9", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Edit Billing Info");
    expect(inputEle).toBeDefined();
})


test("Payment info 9", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <PaymentInfo />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Purchase");
    expect(inputEle).toBeDefined();
})

test("Payment info 9", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Checkout />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Need help?");
    expect(inputEle).toBeDefined();
})


test("Payment info 9", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Checkout />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Call 123456789");
    expect(inputEle).toBeDefined();
})

test("Payment info 9", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Checkout />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Mon-Fri 8a-5p EST");
    expect(inputEle).toBeDefined();
})





