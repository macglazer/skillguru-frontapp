import {DropdownOption} from "@customTypes/dropdownOption";
import axios from "axios";


export const fetchMentorLanguage = (): Promise<DropdownOption[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/mentor/get-all-language')

            .then(response => {
                const data: DropdownOption[] = response.data.map((item: any) => ({
                    label: item.label,
                    value: item.value
                }));

                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching mentor categories:', error);
                reject({success: false, error: 'Error'});
            });
    });
};

const getAvailableLanguage = async (): Promise<DropdownOption[]> => {
    return [
        { value: 'pl', label: 'Polski' },
        { value: 'en', label: 'Angielski' },
        { value: 'ja', label: 'Japoński' },
        { value: 'de', label: 'Niemiecki' },
    ]
    // return fetchMentorLanguage();
}
export default getAvailableLanguage;