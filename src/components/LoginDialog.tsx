import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CircleX } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/dialog';
import { Separator } from '@ui/separator';
import { Button } from '@ui/button';
import { LoginForm } from '@components/auth-form/Login';
import { Alert, AlertDescription, AlertTitle } from '@ui/alert';
import { Show } from './ui/show';
import { useSessionStore } from '@src/store';

export const LoginDialog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoading = useSessionStore(state => state.loading);
  const [bannerInfo, setBannerInfo] = useState({ title: '', description: '', show: false });

  return (
    <Dialog>
      <Button variant='secondary' type='button' asChild>
        <DialogTrigger className='justify-center'>
          {t('login')}
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('login')}</DialogTitle>
          <DialogDescription>{t('or you can register')}</DialogDescription>
        </DialogHeader>
        <Show when={bannerInfo.show}>
          <Alert variant='destructive'>
            <CircleX />
            <div className="ml-2 mt-1">
              <AlertTitle>{t(bannerInfo.title)}</AlertTitle>
              <AlertDescription>{t(bannerInfo.description)}</AlertDescription>
            </div>
          </Alert>
        </Show>
        <LoginForm errorsAlert={setBannerInfo}>
          <div className='flex justify-center w-full flex-col mt-6'>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {t('access')}
            </Button>
            <Separator className='my-4' />
            <Button type='button' variant='link' onClick={() => navigate('/auth/register')} disabled={isLoading}>
              {t('register')}
            </Button>
          </div>
        </LoginForm>
      </DialogContent>
    </Dialog>
  );
}
