'use server';

import { authKey } from '@/constant/authKey';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const setAccessToken = (token: string, option?: any) => {
   cookies().set(authKey, token);
   
   if (option && option.redirect) {
      redirect(option.redirect);
   }
};

export default setAccessToken;