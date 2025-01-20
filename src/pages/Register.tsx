import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@src/components/auth-form/Register';
import { Button } from '@components/ui/button';
import { Separator } from '@src/components/ui/separator';

export const Register = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center flex-col w-10/12">
        <h1 className='text-4xl my-4'>{t('register')}</h1>
        <p className='italic my-4'>{t('leyend register form')}</p>
      </div>
      <Separator className='mt-4 mb-6 w-10/12 bg-white shadow' />
      <RegisterForm>
        <div className='flex justify-center items-center flex-col'>
          <Button type='submit' className='w-1/4 m-8'>
            {t('create a new user')}
          </Button>
        </div>
      </RegisterForm>
    </>
  )
}
