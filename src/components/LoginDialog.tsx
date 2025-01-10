import { FormEvent, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/dialog'
import { useSessionStore } from '@src/store';
import { Separator } from '@ui/separator';
import { Button } from '@ui/button';
import { Input } from '@ui/input.tsx';
import { useTranslation } from 'react-i18next';

const LABELS_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
}

export const LoginDialog = () => {
  const { t } = useTranslation();
  const loginSession = useSessionStore(state => state.login);
  const formRef = useRef<HTMLFormElement>(null);

  const loginAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const form = new FormData(formRef.current);
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      // validate data
      await loginSession(email, password);
      console.log(form, email, password);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className='justify-center'>
        <Button variant='secondary' type='button'>{t('login')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('login')}</DialogTitle>
          <DialogDescription>{t('or you can register')}</DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={loginAction}>
          <Input name={LABELS_FORM.EMAIL} placeholder={t('email')} defaultValue='anmijurane1@gmail.com' />
          <Input name={LABELS_FORM.PASSWORD} type='password' placeholder={t('password')} defaultValue='Rn@i8Adf2' />
          <div className='flex justify-center w-full flex-col mt-6'>
            <Button type='submit' className='w-full'>
              {t('access')}
            </Button>
            <Separator className='my-4' />
            <Button type='button' variant='link' onClick={console.log}>
              {t('register')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
