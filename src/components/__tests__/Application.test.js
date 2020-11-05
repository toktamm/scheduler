import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";



import Application from "components/Application";

afterEach(cleanup);



describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));

    // const appointments = getAllByTestId(container, "appointment");

    // console.log(prettyDOM(appointments));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    // console.log(prettyDOM(appointment));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // console.log(prettyDOM(appointment));


    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // debug();

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );

    console.log(prettyDOM(day));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();




  });



})