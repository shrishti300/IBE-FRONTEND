import { render, screen } from "@testing-library/react"
import Header from "../src/components/Header/Header"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import Footer from "../src/components/Footer/Footer"
import Mybookings from "../src/components/MyBookingCard/MyBookingCard"
import MybookingsPage from "../src/pages/MyBookings";
import { BrowserRouter } from "react-router-dom"

test("mybooking 1 ", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("Confirmed");
    expect(copyrightTxt).toBeDefined();
})


test("mybooking 2", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("Booking ID:");
    expect(copyrightTxt).toBeDefined();
})

test("mybooking 3 ", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("Room Type :");
    expect(copyrightTxt).toBeDefined();
})

test("mybooking 4 ", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("FROM :");
    expect(copyrightTxt).toBeDefined();
})


test("mybooking 5 ", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("TO:");
    expect(copyrightTxt).toBeDefined();
})

test("mybooking 6", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("Total : $");
    expect(copyrightTxt).toBeDefined();
})


test("mybooking 7", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <Mybookings />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("View More");
    expect(copyrightTxt).toBeDefined();
})







