import { render, screen } from "@testing-library/react"
import Header from "../src/components/Header/Header"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../src/redux/store/store"
import { IntlProvider } from "react-intl"
import English from "../src/languages/en-US.json";
import Footer from "../src/components/Footer/Footer"

test("footer ", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <Footer />
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("All rights reserved");
    expect(copyrightTxt).toBeDefined();
})

test("footer copyright ", () => {
    let lang = English;
    render(
        <IntlProvider locale="en-US" messages={lang}>
            <Provider store={store}>
                <Footer />
            </Provider>
        </IntlProvider>
    )
    const copyrightTxt = screen.getByText("© Kickdrum Technology Group LLC.");
    expect(copyrightTxt).toBeDefined();
})

















