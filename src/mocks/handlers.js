import { http, HttpResponse } from 'msw';

const baseUrl = 'http://localhost:3000';

export const handlers = [
  http.post(`${baseUrl}/registrations`, () => {
    return new HttpResponse({
      created: true,
      message: 'Registration created successfully'
    })
  }),
  http.get(`${baseUrl}/registrations`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "email": "saulo@caju.com.br",
          "employeeName": "Saulo Silva",
          "cpf": "56646466084",
          "admissionDate": "02/12/2024",
          "id": "okja",
          "status": "REVIEW"
        },
        {
          "admissionDate": "22/10/2023",
          "email": "luiz@caju.com.br",
          "employeeName": "Luiz Filho",
          "status": "REPROVED",
          "cpf": "56642105087",
          "id": "3"
        },
      ])
    );
  }),
];
