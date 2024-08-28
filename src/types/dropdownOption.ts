export type DropdownOption<OptionMetadataT = undefined> = {
    value: string | number;
    label: string;
    metadata?: OptionMetadataT;
};