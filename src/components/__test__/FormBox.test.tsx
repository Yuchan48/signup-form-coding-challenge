import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, Matcher, MatcherOptions } from "@testing-library/react";
import FormBox from "../FormBox";

let getByTestId: { (arg0: string): any; (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown): HTMLElement; };
let stateTest;
beforeEach(() => {
    const component = render(<FormBox />);
    getByTestId = component.getByTestId;
});

test("form header has the correct text", () => {
    const headerEl = getByTestId("header_form");
    expect(headerEl.textContent).toBe("Try it free 7 days then $20/mo. thereafter");
});

test("change value of input FirstName works correctly", () => {
    const inputEl = getByTestId("input_firstname");
    fireEvent.change(inputEl, {
        target: {
            value: "test"
        }
    });
    expect(inputEl.value).toBe("test");
});

test("input firstName throws error when submitted empty", () => {
    const btnEl = getByTestId("buttonEl");
    const firstName = getByTestId("input_firstname")
    fireEvent.click(btnEl);
    expect(firstName).toHaveClass("input", "warn");
});

test("change value of input LastName works correctly", () => {
    const inputEl = getByTestId("input_lastname");
    fireEvent.change(inputEl, {
        target: {
            value: "test"
        }
    });
    expect(inputEl.value).toBe("test");
});

test("input lastName throws error when submitted empty", () => {
    const lastName = getByTestId("input_lastname")
    const btnEl = getByTestId("buttonEl");
    fireEvent.click(btnEl);
    expect(lastName).toHaveClass("input", "warn");
});

test("change value of input email works correctly", () => {
    const inputEl = getByTestId("input_email");
    fireEvent.change(inputEl, {
        target: {
            value: "test@test.com"
        }
    });
    expect(inputEl.value).toBe("test@test.com");
});

test("input email throws error when submitted empty", () => {
    const inputEl = getByTestId("input_email");
    const btnEl = getByTestId("buttonEl");

    fireEvent.click(btnEl);

    expect(inputEl).toHaveClass("input", "warn");
});

test("placeholder shows 'name@host.tld' when submitted with invalid email", () => {
    const btnEl = getByTestId("buttonEl");
    const inputEl = getByTestId("input_email");

    fireEvent.change(inputEl, {
        target: {
            value: "invalid email"
        }
    });

    fireEvent.click(btnEl);

    expect(inputEl).toHaveClass("input", "warn");
    expect(inputEl.placeholder).toEqual("name@host.tld");
});

test("change value of input password works correctly", () => {
    const inputEl = getByTestId("input_password");
    fireEvent.change(inputEl, {
        target: {
            value: "abcd1234"
        }
    });
    expect(inputEl.value).toBe("abcd1234");
});

test("input password throws error when submitted empty", () => {
    const inputEl = getByTestId("input_password");
    const btnEl = getByTestId("buttonEl");

    fireEvent.click(btnEl);
    expect(inputEl).toHaveClass("input", "warn");

});

test("input password throws error when submitted with invalid password", () => {
    const btnEl = getByTestId("buttonEl");
    const inputEl = getByTestId("input_password");

    fireEvent.change(inputEl, {
        target: {
            value: "invalidPassword"
        }
    });

    fireEvent.click(btnEl);

    expect(inputEl).toHaveClass("input", "warn");
});


test("button has the right text", () => {
    const btnEl = getByTestId("buttonEl");
    expect(btnEl.textContent).toBe("CLAIM YOUR FREE TRIAL");
})

test("There's a right text at the bottom of the form", () => {
    const spanEl = getByTestId("form_span");
    expect(spanEl.textContent).toBe("By clicking the button, you are agreeing to our Terms and Services");
});