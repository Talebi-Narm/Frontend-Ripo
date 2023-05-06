import { render, screen, waitFor } from "@testing-library/react";

import OfferPage from "./Pages/OfferPage";
import axiosInstance from "./Utils/axios";

jest.mock("./Utils/axios");

describe("OfferPage", () => {
  beforeEach(() => {
    axiosInstance.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "50% off",
          start_date: "2022-05-01",
          end_date: "2022-05-31",
          discount: 50,
          code: "ABC123",
        },
      ],
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the offer card after fetching data from the API", async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<OfferPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith("/v1/order/coupons");
    });

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("50% off")).toBeInTheDocument();
    expect(screen.getByText("ABC123")).toBeInTheDocument();
  });
});
