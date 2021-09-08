import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Description from "../Description";

test("Does description have the correct text", () => {
    const { getByTestId } = render(<Description />);
    const textEl = getByTestId("desc_h1");
    expect(textEl.textContent).toBe("Learn to code by watching others");

    const textEl2 = getByTestId("desc_p");
    expect(textEl2.textContent).toBe("See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.");
});

