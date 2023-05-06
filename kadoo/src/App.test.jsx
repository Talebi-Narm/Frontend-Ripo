import { render, waitFor } from "@testing-library/react";
import * as React from "react";

import OfferPage from "./Pages/OfferPage";

describe("App", () => {
  it("renders App component", async () => {
    const { getByText } = render(<OfferPage />);
    await waitFor(() => {
      expect(getByText("code")).toBeInTheDocument();
    });
    expect(getByText("l7aw49")).toBeInTheDocument();
  });
});
