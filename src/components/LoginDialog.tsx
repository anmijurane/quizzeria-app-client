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

const LABELS_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
}

export const LoginDialog = () => {
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
        <Button variant='secondary' type='button'>Iniciar Sesion</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciar Sesion</DialogTitle>
          <DialogDescription>o puedes registrarte</DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={loginAction}>
          <Input name={LABELS_FORM.EMAIL} placeholder='Correo electronico' defaultValue='anmijurane1@gmail.com'/>
          <Input name={LABELS_FORM.PASSWORD} type='password' placeholder='Contraseña' defaultValue='Rn@i8Adf2'/>
          <div className='flex justify-center w-full flex-col mt-6'>
            <Button type='submit' className='w-full'>
              Acceder
            </Button>
            <Separator className='my-4'/>
            <Button type='button' variant='link' onClick={console.log}>
              Registrarse
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
