// import { screen, waitFor, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import showToast from "../index";

// describe("showToast", () => {
//   test("displays toast notification with the correct message and severity", async () => {
//     showToast("Test Message", "success");

//     // Wait for the toast notification to appear
//     await waitFor(() => {
//       const toastContainer = screen.getByRole("alert");
//       expect(
//         within(toastContainer).getByText("Test Message")
//       ).toBeInTheDocument();
//     });

//     const toastContainer = screen.getByRole("alert");
//     const toastElement = within(toastContainer).getByText("Test Message");
//     expect(toastElement).toBeInTheDocument();

//     // Test the appearance of the toast notification based on the success severity
//     expect(toastContainer).toHaveClass("Toastify__toast--success");
//   });

//   test("closes the toast notification when clicked", async () => {
//     showToast("Test Message");

//     // Wait for the toast notification to appear
//     await waitFor(() => {
//       const toastContainer = screen.getByRole("alert");
//       expect(
//         within(toastContainer).getByText("Test Message")
//       ).toBeInTheDocument();
//     });

//     const toastContainer = screen.getByRole("alert");
//     const toastElement = within(toastContainer).getByText("Test Message");
//     expect(toastElement).toBeInTheDocument();

//     // Simulate clicking the toast notification
//     userEvent.click(toastContainer);

//     // Wait for the toast notification to disappear
//     await waitFor(() => {
//       expect(toastContainer).not.toBeInTheDocument();
//     });
//   });
// });

import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import showToast from "../index";

describe("showToast", () => {
  test("displays toast notification with the correct message and severity", async () => {
    showToast("Test Message", "success");

    // Wait for the toast notification to appear
    await waitFor(() => {
      const toastContainer = screen.getByRole("alert");
      expect(
        within(toastContainer).getByText("Test Message")
      ).toBeInTheDocument();
    });

    const toastContainer = screen.getByRole("alert");
    const toastElement = within(toastContainer).getByText("Test Message");
    expect(toastElement).toBeInTheDocument();

    // Test the appearance of the toast notification based on the success severity
    expect(toastContainer).toHaveClass("Toastify__toast--success");
  });

  test("closes the toast notification when clicked", async () => {
    showToast("Test Message");

    // Wait for the toast notification to appear
    await waitFor(() => {
      const toastContainer = screen.getByRole("alert");
      expect(
        within(toastContainer).getByText("Test Message")
      ).toBeInTheDocument();
    });

    const toastContainer = screen.getByRole("alert");
    const toastElement = within(toastContainer).getByText("Test Message");
    expect(toastElement).toBeInTheDocument();

    // Simulate clicking the toast notification
    userEvent.click(toastContainer);

    // Wait for the toast notification to disappear
    await waitFor(() => {
      expect(toastContainer).not.toBeInTheDocument();
    });
  });
});
