import {DropdownOption} from "@customTypes/dropdownOption";

export type FilterName =
    | "priceMin"
    | "priceMax"
    | "categories"
    | "skills"
    | "services"
    | "phrase"
    | "sort"
    | "topics";

export type SortOption = "rateASC" | "rateDESC" | "priceASC" | "priceDESC";

export type SpecialVariant = "success" | "warning" | "error";

export type Option = {
    value: string;
    label: string;
};

export type Terms = {
    categories: Option[];
    skills: Option[];
    services: Option[];
    topics: Option[];
};

export type FiltersOptions = {
    priceMin: number;
    priceMax: number;
    categories: Option[];
    skills: Option[];
    services: Option[];
    topics: Option[];
};

export type FiltersSelected = {
    priceMin: number;
    priceMax: number;
    categories: Option[];
    skills: Option[];
    services: Option[];
    topics: Option[];
    phrase: string;
    sort: SortOption;
};

export type Mentor = {
    avatar_url: string;
    description: string;
    id: string;
    name: string;
    company: string;
    price: number;
    profession: string;
    reviewsAvgRate: number;
    reviewsCount: number;
    special: string;
    specialVariant: SpecialVariant;
    skill: DropdownOption[];
    title: string;
    username: string;
};

export type FilterTag = {
    name: FilterName;
    displayValue: string;
};

export type Review = {
    id: string;
    rate: number;
    title: string;
    authorName: string;
    createdAt: string;
    content: string;
};
