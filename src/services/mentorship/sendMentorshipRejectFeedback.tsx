const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMentorshipRejectFeedback = async (offerId: number, feedback: string) : Promise<boolean> => {
    await delay(1000);

    return true
}
