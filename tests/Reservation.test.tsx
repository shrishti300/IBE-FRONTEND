import { render, screen } from "@testing-library/react"
import Header from "../src/components/Header/Header"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import { BrowserRouter } from "react-router-dom"
import Reservation from "../src/pages/Reservations";
import { Authenticator } from "@aws-amplify/ui-react"
import pkg from '@aws-crypto/sha256-js';
import { configureStore } from "@reduxjs/toolkit"
const { Sha256 } = pkg;


test("reservation 1", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Print");
    expect(inputEle).toBeDefined();
})

test("reservation 2", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Email");
    expect(inputEle).toBeDefined();
})

test("reservation 3", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Check In");
    expect(inputEle).toBeDefined();
})

test("reservation 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Check Out");
    expect(inputEle).toBeDefined();
})

test("reservation 5", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Room total summary");
    expect(inputEle).toBeDefined();
})

test("reservation 6", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Guest Information");
    expect(inputEle).toBeDefined();
})

test("reservation 7", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Billing Address");
    expect(inputEle).toBeDefined();
})

test("reservation 8", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Payment Info");
    expect(inputEle).toBeDefined();
})


test("reservation 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Standard Rate");
    expect(inputEle).toBeDefined();
})

test("reservation 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("$/night total");
    expect(inputEle).toBeDefined();
})
test("reservation 4", () => {
    let lang = English;
    render(
        <Authenticator.Provider>
            <IntlProvider locale="en-US" messages={lang}>
                <Provider store={store}>
                    <BrowserRouter>
                    <Reservation />
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </Authenticator.Provider>

    )
    const inputEle = screen.getByText("Upcoming Reservation");
    expect(inputEle).toBeDefined();
})