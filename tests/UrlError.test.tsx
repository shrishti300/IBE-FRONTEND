import { render, screen } from "@testing-library/react"
import Header from "../src/components/Header/Header"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import BookingForm from "../src/components/BookingForm/BookingForm"
import { BrowserRouter } from "react-router-dom"
import UrlError from "../src/pages/UrlErrorPage"


test("url error", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <UrlError />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const inputEle = screen.getByText("Error: Invalid URL Parameters");
    expect(inputEle).toBeDefined();
})

test("url error message", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <UrlError />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const inputEle = screen.getByText("The URL parameters are invalid or missing.");
    expect(inputEle).toBeDefined();
})


test("url error home", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <UrlError />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const inputEle = screen.getByText("Go Back to Home Page");
    expect(inputEle).toBeDefined();
})

test("url error back", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <UrlError />
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const inputEle = screen.getByText("Go Back to previous page");
    expect(inputEle).toBeDefined();
})
