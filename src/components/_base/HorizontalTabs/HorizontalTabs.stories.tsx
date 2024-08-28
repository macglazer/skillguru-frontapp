import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HorizontalTabs, HorizontalTabsButton } from ".";

const meta = {
  title: "base/HorizontalTabs",
  component: HorizontalTabs,
  //   subcomponents: { HorizontalTabsButton },
  tags: ["autodocs"],
} satisfies Meta<typeof HorizontalTabs>;

export default meta;
type Story = StoryObj<typeof HorizontalTabs>;

export const Basic: Story = {
  render: (args) => {
    const [active, setActive] = useState<string>("1");
    const handleClick = (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
    ) => {
      const btn = e.target as HTMLButtonElement;
      setActive(btn.value);
    };
    return (
      <HorizontalTabs>
        <HorizontalTabsButton
          isActive={"1" === active}
          text="Default active tab 1"
          name=""
          value="1"
          onClick={handleClick}
        />
        <HorizontalTabsButton
          isActive={"2" === active}
          text="Tab 2"
          name=""
          value="2"
          onClick={handleClick}
        />
        <HorizontalTabsButton
          isActive={"3" === active}
          disabled
          text="Disabled tab 3"
          name=""
          value="3"
          onClick={handleClick}
        />
        <HorizontalTabsButton
          isActive={"4" === active}
          text="Tab 4"
          name=""
          value="4"
          onClick={handleClick}
        />
      </HorizontalTabs>
    );
  },
};
