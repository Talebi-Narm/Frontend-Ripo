// import axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
// import MockAdapter from "axios-mock-adapter";
// eslint-disable-next-line import/order
import {
  render,
  // screen,
  // fireEvent,
  // waitFor,
  // getByTestId,
} from "@testing-library/react";
import * as React from "react";
import { toast } from "react-toastify";

// import axiosInstance from "../../Utils/axios";

import BookmarksProducts from "./index";

// Mock axios
// const mockAxios = new MockAdapter(axiosInstance);
jest.mock("@lottiefiles/react-lottie-player", () => ({
  Player: jest.fn(({ children }) => (
    <div data-testid="mocked-player">{children}</div>
  )),
}));

describe("BookmarksProducts", () => {
  beforeAll(() => {
    toast.success = jest.fn();
    toast.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Your test case
  it("renders the Lottie Player without errors", () => {
    render(<BookmarksProducts />);
    // Add your assertions here to verify the rendering and behavior of the component
  });

  // it("fetches and displays plant bookmarks", async () => {
  //   const plantBookmarksResponse = {
  //     data: {
  //       results: [
  //         {
  //           id: "bookmark1",
  //           Plant: "plant1",
  //           user: "",
  //         },
  //       ],
  //     },
  //   };
  //   const plantDetailsResponse = {
  //     data: {
  //       name: "Plant 1",
  //       price: 10,
  //       image: "plant1.jpg",
  //     },
  //   };

  //   mockAxios
  //     .onGet("v1/common/plant-bookmarks/")
  //     .reply(200, plantBookmarksResponse);
  //   mockAxios
  //     .onGet("v1/store/admin/plants/plant1")
  //     .reply(200, plantDetailsResponse);

  //   render(<BookmarksProducts />);

  //   await waitFor(async () => {
  //     const element = screen.getByTestId("plant-name");
  //     console.log("Plant Name Element:", element); // Log the element for debugging
  //     expect(element).toHaveTextContent("Plant 1");
  //   });
  // });

  // it("fetches and displays tool bookmarks", async () => {
  //   const toolBookmarksResponse = {
  //     data: {
  //       results: [
  //         {
  //           id: "bookmark1",
  //           tool: "tool1",
  //         },
  //         {
  //           id: "bookmark2",
  //           tool: "tool2",
  //         },
  //       ],
  //     },
  //   };
  //   const toolDetailsResponse = {
  //     data: {
  //       name: "Tool 1",
  //       price: 20,
  //       image: "tool1.jpg",
  //     },
  //   };

  //   mockAxios
  //     .onGet("v1/common/tool-bookmarks/")
  //     .reply(200, toolBookmarksResponse);
  //   mockAxios
  //     .onGet("v1/store/admin/tools/tool1")
  //     .reply(200, toolDetailsResponse);
  //   mockAxios
  //     .onGet("v1/store/admin/tools/tool2")
  //     .reply(200, toolDetailsResponse);

  //   render(<BookmarksProducts />);

  //   await waitFor(() => {
  //     expect(screen.getByText("Tool 1")).toBeInTheDocument();
  //     expect(screen.getByText("$ 20")).toBeInTheDocument();
  //     expect(screen.getAllByRole("img")).toHaveLength(2);
  //   });
  // });

  // it("adds a plant bookmark", async () => {
  //   const plantId = "plant1";

  //   mockAxios.onGet("v1/user/me/").reply(200, { user: { id: "userId" } });
  //   mockAxios.onPost("v1/common/plant-bookmarks/").reply(201, { status: 201 });

  //   render(<BookmarksProducts />);

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByLabelText("add to favorites"));
  //   });

  //   expect(toast.success).toHaveBeenCalledWith("Plant 1 added to bookmarks!");
  //   expect(mockAxios.history.post).toHaveLength(1);
  //   expect(mockAxios.history.post[0].url).toBe("v1/common/plant-bookmarks/");
  //   expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
  //     Plant: plantId,
  //     user: "userId",
  //   });
  // });

  // it("deletes a plant bookmark", async () => {
  //   const bookmarkId = "bookmark1";

  //   mockAxios
  //     .onDelete(`v1/common/plant-bookmarks/${bookmarkId}/`)
  //     .reply(204, { status: 204 });

  //   render(<BookmarksProducts fetchBookMarksPlants={jest.fn()} />);

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByLabelText("add to favorites"));
  //   });

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByLabelText("add to favorites"));
  //   });

  //   expect(toast.success).toHaveBeenCalledWith(
  //     "Plant 1 removed from bookmarks!"
  //   );
  //   expect(mockAxios.history.delete).toHaveLength(1);
  //   expect(mockAxios.history.delete[0].url).toBe(
  //     `v1/common/plant-bookmarks/${bookmarkId}/`
  //   );
  // });

  // it("adds a tool bookmark", async () => {
  //   const toolId = "tool1";

  //   mockAxios.onGet("v1/user/me/").reply(200, { user: { id: "userId" } });
  //   mockAxios.onPost("v1/common/tool-bookmarks/").reply(201, { status: 201 });

  //   render(<BookmarksProducts />);

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByLabelText("add to favorites"));
  //   });

  //   expect(toast.success).toHaveBeenCalledWith("Tool 1 added to bookmarks!");
  //   expect(mockAxios.history.post).toHaveLength(1);
  //   expect(mockAxios.history.post[0].url).toBe("v1/common/tool-bookmarks/");
  //   expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
  //     Tool: toolId,
  //     user: "userId",
  //   });
  // });

  // it("deletes a tool bookmark", async () => {
  //   const bookmarkId = "bookmark1";

  //   mockAxios
  //     .onDelete(`v1/common/tool-bookmarks/${bookmarkId}/`)
  //     .reply(204, { status: 204 });

  //   render(<BookmarksProducts fetchBookMarksTools={jest.fn()} />);

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByLabelText("add to favorites"));
  //   });

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByLabelText("add to favorites"));
  //   });

  //   expect(toast.success).toHaveBeenCalledWith(
  //     "Tool 1 removed from bookmarks!"
  //   );
  //   expect(mockAxios.history.delete).toHaveLength(1);
  //   expect(mockAxios.history.delete[0].url).toBe(
  //     `v1/common/tool-bookmarks/${bookmarkId}/`
  //   );
  // });
});
