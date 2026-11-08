import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../../../shared/api/rtkQuery';
import { SignInFormValues, SignUpFormValues } from '../model/types';
import type { User } from '../../../entities/user';

type SignUpResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: string;
};

type SignInResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: string;
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpFormValues>({
			query: (signUpFormValues) => ({
				url: '/auth/register',
				method: 'POST',
				body: signUpFormValues,
			}),
		}),
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			query: (signInFormValues) => ({
				url: '/auth/login',
				method: 'POST',
				body: signInFormValues,
			}),
		}),
	}),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
