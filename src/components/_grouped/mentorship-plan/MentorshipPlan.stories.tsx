import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MentorshipPlan, MentorshipPlanForm, MentorshipPlanSkeleton } from '.';
import { UserIdentity } from 'src/components/_base/UserIdentity';

const meta = {
  title: 'grouped/MentorshipPlan',
  component: MentorshipPlan,
  parameters: {
    variant: 'pro'
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'number' },
    subscriptionVariant: { control: 'text', accept: ['pro','advance','basic'], },
    description: { control: 'text' },
    price: { control: 'number' },
    sessionDuration: { control: 'number' },
    sessionsPerMonth: { control: 'number' },
    responseTime: { control: 'number' },
    planIncludes: { control: 'object' },
    // userIdentity: { control: 'text' },
    selected: { control: 'boolean' },
    selectable: { control: 'boolean' },
    // onClick: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof MentorshipPlan>;

export default meta; 
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    id: 1,
    subscriptionVariant: 'pro',
    description: '',
    price: 119,
    sessionDuration: 45,
    sessionsPerMonth: 3,
    responseTime: 72,
    planIncludes: [
      'Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów',
      'Nieograniczony dostęp do pytań i odpowiedzi'
    ],
    selected: false,
    selectable: false,
  },
};

// export const Pro: Story = {
//   args: {
//     variant: 'danger',
//     text: 'Nieaktywny',
//   },
// };

// export const WithDetailsAndAdditional: Story = {
//   args: {
//     variant: 'warning',
//     text: 'W trakcie',
//   },
// };

// export const WithUserIdentity: Story = {
//   args: {
//     variant: 'warning',
//     text: 'W trakcie',
//   },
// };

export const WithUserIdentity: Story = {
  args: {
    id: 1,
    subscriptionVariant: 'pro',
    description: '',
    price: 119,
    sessionDuration: 45,
    sessionsPerMonth: 3,
    responseTime: 72,
    planIncludes: [
      'Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów',
      'Nieograniczony dostęp do pytań i odpowiedzi'
    ],
    selected: false,
    selectable: false,
  },
  render: (args) => {
    return (
      <MentorshipPlan 
        {...args}
        userIdentity={(<UserIdentity 
          avatarUrl="/images/img_avatar.png"
          avatarSize={64}
          avatarAlt="Example avatar"
          title="Anna Stokrotka"
          subtitle="UX/UI Designer w Google"
          rate={5}
          fullWidth
          noPadding
        />)}
      />
    )
  }
};
