import {FetchMentorStudentsInput, FetchMentorStudentsOutput,} from "./fetchMentorStudents.types";
import axios from "axios";

export const fetchMentorStudents = async (
    props: FetchMentorStudentsInput
): Promise<FetchMentorStudentsOutput> => {
    // const res = await fetch('/mentor-students.json')
    // const res = await fetch('/api/mentorship/subscriptions')
    // const data = await res.json() as FetchMentorStudentsOutput['students']
    const res = await axios.get('/api/mentorship/subscriptions');
    const data = res.data as FetchMentorStudentsOutput['students'];

    const filtered = data.filter(d => d.status === props.status)

    return {
        students: filtered.slice(props.skip, props.skip + props.take),
        total: filtered.length,
    };
};
