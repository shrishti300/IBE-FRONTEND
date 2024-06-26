import { render, screen } from "@testing-library/react"
import Header from "../src/components/Header/Header"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import BookingForm from "../src/components/BookingForm/BookingForm"
import { BrowserRouter } from "react-router-dom"
import PageNotFound from "../src/pages/PageNotFound"

test("hello", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <BrowserRouter>
                <PageNotFound/>
                </BrowserRouter>
            </Provider>
        </IntlProvider>
    )
    const inputEle = screen.getByText("Page Not Found");
    expect(inputEle).toBeDefined();
})



  