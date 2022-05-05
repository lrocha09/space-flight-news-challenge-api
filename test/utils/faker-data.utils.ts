import { name, lorem, internet, datatype, date } from 'faker/locale/pt_BR';

export function generateArticles() {
  return {
    featured: datatype.boolean(),
    title: lorem.words(8),
    url: internet.url(),
    imageUrl: internet.avatar(),
    newsSite: name.title(),
    summary: lorem.words(15),
    publishedAt: date.recent().toISOString(),
    updatedAt: date.recent().toISOString(),
    launches: [
      {
        id: datatype.number(1000).toString(),
        provider: name.title(),
      },
    ],
    events: [
      {
        id: datatype.number(1000),
        provider: name.title(),
      },
    ],
  };
}
