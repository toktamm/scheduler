import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  // test #1
  // props.children = Base
  .add("Base", () => <Button>Base</Button>) 
  // test #2
  // props.confirm = true, props.children = Confirm
  .add("Confirm", () => <Button confirm>Confirm</Button>)  
  // test #3
  // props.danger = true, props.children = Cancel we are passing 2 keys for the props here, danger and children
  .add("Danger", () => <Button danger>Cancel</Button>)
  // test #4
  // props.onClick = function, props.children = Clickable
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button> // props.children = Clickable
  ))
  // test #5
  // props.disabled = true, props.onClick = function, props.children = Disabled
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
