import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SchoolsData } from "../Components/SchoolsData";

describe("SchoolList", () => {
  it("renders school names and toggles paragraph", async () => {
    const mockData = [
      {
        school_name: "School 1",
        dbn: "DBN 1",
        overview_paragraph: "Overview 1",
      },
      {
        school_name: "School 2",
        dbn: "DBN 2",
        overview_paragraph: "Overview 2",
      },
    ];

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    } as unknown as Response);

    const { getByText } = render(<SchoolsData />);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText("Loading...")).toBeInTheDocument();
    });

    expect(getByText("School 1 - DBN 1")).toBeInTheDocument();
    expect(getByText("School 2 - DBN 2")).toBeInTheDocument();

    fireEvent.click(getByText("School 1 - DBN 1"));
    expect(getByText("Overview 1")).toBeInTheDocument();

    fireEvent.click(getByText("School 1 - DBN 1"));
    expect(getByText("Overview 1")).not.toBeInTheDocument();
  });
});
