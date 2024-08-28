export const mentorsFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((d) => d.mentors);
