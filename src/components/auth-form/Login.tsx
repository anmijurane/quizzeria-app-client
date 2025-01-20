import { PropsWithChildren, FC, Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { useSessionStore } from '@src/store';
import { formLoginSchema, type FormLoginZod } from '@src/schemas/auth-form';
import { getErrorFromCatalog } from '@src/utils/errors-leyends';

interface Props extends PropsWithChildren {
  errorsAlert: Dispatch<SetStateAction<{ title: string; description: string; show: boolean; }>>
}

export const LoginForm: FC<Props> = ({ children, errorsAlert }) => {
  const { t } = useTranslation();

  const loginSession = useSessionStore(state => state.login);

  const formLogin = useForm<FormLoginZod>({
    resolver: zodResolver(formLoginSchema)
  });

  const handleOnSubmit: SubmitHandler<FormLoginZod> = async ({ email, password }) => {
    const { status, codeError } = await loginSession(email, password);
    if (status === 401) {
      const { BANNER_DESC, BANNER_TITLE } = getErrorFromCatalog(codeError || '');
      errorsAlert({ show: true, title: BANNER_TITLE, description: BANNER_DESC });
    }
  };

  return (
    <Form {...formLogin}>
      <form onSubmit={formLogin.handleSubmit(handleOnSubmit)}>
        <FormField
          name='email'
          control={formLogin.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>{t('email')}</FormLabel>
              <FormDescription>
                {t('email description')}
              </FormDescription>
              <FormControl>
                <Input placeholder={t('email')} type='email' defaultValue='anmijurane1@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='password'
          control={formLogin.control}
          render={({ field }) => (
            <FormItem className='my-6'>
              <FormLabel aria-required>{t('password')}</FormLabel>
              <FormDescription>
                {t('password description')}
              </FormDescription>
              <FormControl>
                <Input placeholder={t('password')} defaultValue='Rn@i8Adf2' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
