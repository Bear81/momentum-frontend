import { http, HttpResponse } from 'msw';

// Example habits API mocks
export const handlers = [
  http.get('/api/habits/', () =>
    HttpResponse.json([
      { id: 1, name: 'Swim', frequency: 'daily' },
      { id: 2, name: 'Read', frequency: 'daily' },
    ])
  ),
  http.post('/api/habits/', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),
];
