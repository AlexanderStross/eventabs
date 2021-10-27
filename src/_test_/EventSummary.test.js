import React from "react";
import { render } from "@testing-library/react";
import EventSummary from "../components/EventSummary";
import renderer from "react-test-renderer";

it("renders event title", () => {
  const { getByText } = render(
    <EventSummary event={{ title: "My Test Event" }} />
  );
  const title = getByText("My Test Event");
  expect(title).toBeInTheDocument();
});

it("renders event start_datetime", () => {
  const { getByText } = render(
    <EventSummary
      event={{ start_datetime: new Date("10 September 2020, 10:00 am") }}
    />
  );
  const start_datetime = getByText("Thu, Sep 10, 2020 10:00 AM");
  expect(start_datetime).toBeInTheDocument();
});

it("renders event image", () => {
  const { getByRole } = render(
    <EventSummary event={{ image_url: "event.png" }} />
  );
  const image = getByRole("img", { src: "event.png" });
  expect(image).toBeInTheDocument();
});

it("should render a prettier event summary card", () => {
  const tree = renderer
    .create(
      <EventSummary
        event={{
          id: 1,
          title: "My Test Event",
          start_datetime: new Date("10 September 2020, 10:00 am"),
          image_url: "event.png",
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="col-md-4"
    >
      <div
        className="card mb-4 event-card"
        style={
          Object {
            "maxWidth": "22rem",
          }
        }
      >
        <div
          className="ripple ripple-surface bg-image hover-overlay"
          onClick={[Function]}
        >
          <img
            alt="..."
            className="img-fluid"
            src="event.png"
          />
          <a
            href="/events/1"
          >
            <div
              className="mask"
              style={
                Object {
                  "backgroundColor": "rgba(251, 251, 251, 0.15)",
                }
              }
            />
          </a>
        </div>
        <div
          className="card-body"
        >
          <a
            className="card-link event-card-link"
            href="/events/1"
            style={
              Object {
                "color": "black",
                "textDecoration": "none",
              }
            }
          >
            <h5
              className="card-title"
            >
              My Test Event
            </h5>
          </a>
          <p
            className="card-text"
          >
            <span
              className="event-datetime"
            >
               
              Thu, Sep 10, 2020 10:00 AM 
            </span>
          </p>
          <p
            className="card-text"
          >
            <span
              className="event-location"
            />
          </p>
          <a
            className="ripple ripple-surface btn btn-primary"
            href="/events/1"
            onClick={[Function]}
            role="button"
          >
            View Event
          </a>
        </div>
      </div>
    </div>
  `);
});
