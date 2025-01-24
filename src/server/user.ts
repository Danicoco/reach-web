import { instance, next } from "./base"

export const createAccount = async (body: Partial<IUser>) => {
    const { data } = await instance().post('/v1/users/create-account', body).catch(e => next(e));
    return data;
}

export const verifyAccount = async (body: Partial<IUser>) => {
    const { data } = await instance().post('/v1/users/verify', body).catch(e => next(e));
    return data;
}

export const regenerateOtp = async (body: Partial<IUser>) => {
    const { data } = await instance().post('/v1/users/regenerate-code', body).catch(e => next(e));
    return data;
}

export const changePassword  = async (body: Partial<IUser>): Promise< Partial<IUser>> => {
    const { data } = await instance().patch('/v1/users/change-password', body).catch(e => next(e));
    return data?.data;
}

export const forgetPassword  = async (body: Pick<IUser, 'email'>) => {
    const { data } = await instance().post('/v1/users/forget-password', body).catch(e => next(e));
    return data?.data;
}

export const resetPassword  = async (body: Pick<IUser, 'email' | 'otp' | 'password'>) => {
    const { data } = await instance().put('/v1/users/reset-password', body).catch(e => next(e));
    return data?.data;
}

export const createPassword = async (body: Partial<IUser>): Promise< Partial<IUser>> => {
    const { data } = await instance().post('/v1/users/create-password', body).catch(e => next(e));
    return data?.data;
}

export const addOnboardingData = async (body: Partial<IUser>) => {
    const id = body.id;
    delete body.id;
    const { data } = await instance().put(`/v1/users/onboarding/${id}`, body).catch(e => next(e));
    return data?.data;
}

export const getOnboardingData = async () => {
    const { data } = await instance().get(`/v1/users/onboarding`).catch(e => next(e));
    return data?.data?.record;
}

export const getProfileData = async () => {
    const { data } = await instance().get(`/v1/users/onboarding?isProfile=true`).catch(e => next(e));
    return data?.data;
}

export const updateProfile = async (values: Partial<IUser>) => {
    const { data } = await instance().patch(`/v1/users/profile`, values).catch(e => next(e));
    return data?.data;
}

export const login = async (body: Pick<IUser, 'email' | 'password'>) => {
    const { data } = await instance().post(`/v1/users/login`, body).catch(e => next(e));
    return data?.data;
}

export const googleAuth = async (body: { credential: string; type: string }) => {
    const { data } = await instance().post(`/v1/users/google-auth`, body).catch(e => next(e));
    return data?.data;
}

export const deactivateAccount = async () => {
    const { data } = await instance().delete(`/v1/users/deactivate`).catch(e => next(e));
    return data?.data;
}

export const getUserMessage = async () => {
    const { data } = await instance().get(`/v1/prompts/user-message`).catch(e => next(e));
    return data?.data;
}