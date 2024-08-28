import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableCell, TableRow } from ".";

const meta = {
  title: "base/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Table>
        <TableRow heading>
          <TableCell text="Cell 1A" heading flex />
          <TableCell text="Cell 1B" heading flex={3} />
          <TableCell text="Cell 1C" heading flex />
          <TableCell text="Cell 1D" heading flex />
          <TableCell text="Cell 1E" heading flex />
        </TableRow>
        <TableRow>
          <TableCell text="Cell 2A" flex />
          <TableCell text="Cell 2B" primary flex={3} />
          <TableCell text="Cell 2C" flex />
          <TableCell text="Cell 2D" flex />
          <TableCell text="Cell 2E" flex />
        </TableRow>
        <TableRow>
          <TableCell text="Cell 3A" flex />
          <TableCell text="Cell 3B" primary flex={3} />
          <TableCell text="Cell 3C" flex />
          <TableCell text="Cell 3D" flex />
          <TableCell text="Cell 3E" flex />
        </TableRow>
        <TableRow>
          <TableCell text="Cell 4A" flex />
          <TableCell text="Cell 4B" primary flex={3} />
          <TableCell text="Cell 4C" flex />
          <TableCell text="Cell 4D" flex />
          <TableCell text="Cell 4E" flex />
        </TableRow>
        <TableRow>
          <TableCell text="Cell 5A" flex />
          <TableCell text="Cell 5B" primary flex={3} />
          <TableCell text="Cell 5C" flex />
          <TableCell text="Cell 5D" flex />
          <TableCell text="Cell 5E" flex />
        </TableRow>
        <TableRow heading>
          <TableCell>
            <span>other component</span>
          </TableCell>
        </TableRow>
      </Table>
    );
  },
};
