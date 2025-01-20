import i18next from "i18next";
import { z } from "zod";

const formLoginSchema = z.object({
  email: z
    .string({ message: i18next.t('required field') })
    .email({ message: i18next.t('invalid field') }),
  password: z
    .string({ message: i18next.t('required field') })
    .refine(
      password => new RegExp(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).test(password),
      () => ({ message: i18next.t('password does not match') })
    ),
});

const formRegisterSchema = z.object({
  name: z.string({ message: i18next.t('required field') }),
  username: z.string({ message: i18next.t('required field') }),
  email: z.string({ message: i18next.t('required field') }),
  password: z.string({ message: i18next.t('required field') }),
  confirm_password: z.string({ message: '' }),
}).refine(
  data => data.password === data.confirm_password,
  {
    message: i18next.t('passwords do not match'),
    path: ['confirm_password']
  }
);

type FormLoginZod = z.infer<typeof formLoginSchema>;
type FormRegisterZod = z.infer<typeof formRegisterSchema>;

export {
  formLoginSchema, formRegisterSchema
};
export type { FormLoginZod, FormRegisterZod };
