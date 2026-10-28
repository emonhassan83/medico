import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

const paymentApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      initialPayment: build.mutation({
         query: (id: string) => ({
            url: `/payment/init-payment/${id}`,
            method: 'POST',
         }),
         invalidatesTags: [tagTypes.payment],
      }),

      validatePayment: build.mutation({
         query: (id: string) => {
           return {
             url: `/payment/validate/${id}`,
             method: 'PATCH'
           };
         },
         invalidatesTags: [tagTypes.payment],
       }),
   }),
});

export const { useInitialPaymentMutation, useValidatePaymentMutation } = paymentApi;

export default paymentApi;