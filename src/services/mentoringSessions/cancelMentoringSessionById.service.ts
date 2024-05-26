import axios from "axios";


const cancelMentoringSessionById = async (id: string): Promise<number> => {
    const { status } =  await axios.delete(`/api/1.0/event/${id}`);
    return status;
};

export default cancelMentoringSessionById;