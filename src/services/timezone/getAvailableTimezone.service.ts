import { DropdownOption } from "@customTypes/dropdownOption";
import moment from "moment-timezone";

const getAvailableTimezone = async (): Promise<DropdownOption[]> => {
  try {
    const names = moment.tz.names();
    return names.map((t) => ({
      value: t,
      label: t,
    }));
  } catch (e) {}
  return [];
};

export default getAvailableTimezone;
