import {DropdownOption} from "@customTypes/dropdownOption";
import axios from "axios";

const fetchMentorSkill = (query: string): Promise<DropdownOption[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/mentor/get-all-skills')
            .then(response => {
                const data: DropdownOption[] = response.data.map((item: any) => ({
                    label: item.name,
                    value: item.id
                }));


                setTimeout(() => {
                    if (!query) {
                        resolve([data[0], data[1]]);
                    } else {
                        resolve(data.filter((element) => element.label.toLowerCase().includes(query.toLowerCase())));
                    }
                }, 1000);
            })
            .catch(error => {
                console.error('Error fetching mentor skills:', error);
                reject({success: false, error: 'Error'});
            });
    });
};


const getAvailableSkillsService = async (query: string, abortController: AbortController): Promise<DropdownOption[]> => {
    return fetchMentorSkill(query);
}

export default getAvailableSkillsService;