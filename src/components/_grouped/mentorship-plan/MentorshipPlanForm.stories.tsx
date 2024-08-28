import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MentorshipPlanForm } from ".";
import { getDefaultPlanValues } from "./utils";
import { MentorshipPlanFormErrors, MentorshipPlanFormTouched, MentorshipPlanFormValues } from './types'

const meta = {
  title: "grouped/MentorshipPlanForm",
  component: MentorshipPlanForm,
  parameters: {
    variant: "pro",
  },
  tags: ["autodocs"],
  argTypes: {
    subscriptionVariant: {
      control: "text",
      accept: ["pro", "advance", "basic"],
    },
    values: {
      control: "object",
    },
    // values: {
    //   description: { control: "text" },
    //   price: { control: "number" },
    //   sessionDuration: { control: "number" },
    //   responseTime: { control: "number" },
    //   sessionsPerMonth: { control: "number" },
    //   planIncludes: { control: "object" },
    // },
  },
  args: {},
} satisfies Meta<typeof MentorshipPlanForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    subscriptionVariant: "pro",
    values: {
      description: "",
      price: 119,
      sessionDuration: 45,
      sessionsPerMonth: 3,
      responseTime: 72,
      planIncludes: [
        "Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów",
        "Nieograniczony dostęp do pytań i odpowiedzi",
      ],
    },
  },
  render: (args) => {
    const [values, setValues] = useState<MentorshipPlanFormValues>(
      getDefaultPlanValues(args.subscriptionVariant)
    );

    return (
      <div>
        <MentorshipPlanForm
          subscriptionVariant={args.subscriptionVariant}
          values={{ ...values }}
          setValues={setValues}
        /> 
      </div>
    );
  },
};

export const Selected: Story = {
  args: {
    subscriptionVariant: "pro",
    values: {
      description: "",
      price: 119,
      sessionDuration: 45,
      sessionsPerMonth: 3,
      responseTime: 72,
      planIncludes: [
        "Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów",
        "Nieograniczony dostęp do pytań i odpowiedzi",
      ],
    },
  },
  render: (args) => {
    const [values, setValues] = useState<MentorshipPlanFormValues>(
      getDefaultPlanValues(args.subscriptionVariant)
    );
    
    return (
      <div>
        <MentorshipPlanForm
          subscriptionVariant={args.subscriptionVariant}
          values={{ ...values }}
          selected
          setValues={setValues}
          handleChange={() => {
            console.log("handleChange")
          }}
        /> 
      </div>
    );
  },
};
