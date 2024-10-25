import { z } from 'zod';
import { validateCPF } from "~/common/utils.ts";

export const statusSchema = z.enum(['APPROVED', 'REVIEW', 'REPROVED']);

const emailSchema = z.string().email({ message: "Por favor, digite um formato de e-mail válido" });

const employeeNameSchema = z
  .string()
  .min(1, { message: "O nome do funcionário é obrigatório" })
  .refine((name) => /^[^\d]/.test(name), {
    message: "O nome não pode começar com um número",
  })
  .refine((name) => name.includes(' '), {
    message: "O nome do funcionário deve ser completo",
  })
  .refine((name) => {
    const parts = name.split(' ');
    return parts.every(part => part.length >= 2);
  }, { message: "É necessário ter dois caracteres, entre nome e sobrenome" });

export const cpfSchema = z
  .string()
  .min(11, { message: "O CPF deve ter pelo menos 11 caracteres" })
  .max(14, { message: "O CPF não pode ter mais de 14 caracteres" })
  .refine((cpf) => validateCPF(cpf), {
    message: "Por favor, digite um CPF válido",
  });

export const admissionDateSchema = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), { message: "Data de admissão inválida" });

export const schema = z.object({
  email: emailSchema,
  employeeName: employeeNameSchema,
  cpf: cpfSchema,
  admissionDate: admissionDateSchema,
});

export const schemaSearch = z.object({
  cpf: cpfSchema.optional(),
});

export type Registration = z.infer<typeof schema> & {
  id?: number;
  status?: 'APPROVED' | 'REVIEW' | 'REPROVED';
};

export type RegistrationSearch = z.infer<typeof schemaSearch>;
