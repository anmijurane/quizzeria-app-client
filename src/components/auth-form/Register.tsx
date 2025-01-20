import { PropsWithChildren, FC } from 'react'
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";

import { formRegisterSchema, type FormRegisterZod } from '@schemas/auth-form';

export const RegisterForm: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  const formRegister = useForm<FormRegisterZod>({
    resolver: zodResolver(formRegisterSchema)
  });

  const handleOnSubmit: SubmitHandler<FormRegisterZod> = (data) => {
    console.log(data);
  }

  return (
    <div className="w-1/2">
      <Form {...formRegister}>
        <form onSubmit={formRegister.handleSubmit(handleOnSubmit)}>
          <FormField
            name='name'
            control={formRegister.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('name')} {...field} />
                </FormControl>
                <FormDescription>
                  Escribe tu nombre
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='username'
            control={formRegister.control}
            render={({ field }) => (
              <FormItem className='my-4'>
                <FormLabel aria-required>{t('username')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('username')} {...field} />
                </FormControl>
                <FormDescription>
                  Escribe tu alias
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='email'
            control={formRegister.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('email')} type='email' {...field} />
                </FormControl>
                <FormDescription>
                  The email is a public
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={formRegister.control}
            render={({ field }) => (
              <FormItem className='my-4'>
                <FormLabel aria-required>{t('password')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('password')} {...field} />
                </FormControl>
                <FormDescription>
                  Escribe tu contraseña
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='confirm_password'
            control={formRegister.control}
            render={({ field }) => (
              <FormItem className='my-4'>
                <FormLabel aria-required>{t('confirm password')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('confirm password')} {...field} />
                </FormControl>
                <FormDescription>
                  Confirma tu contraseña
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {children}
        </form>
      </Form>
    </div>
  )
}
