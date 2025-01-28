import { apiResponseHandler } from "../../utils/apiResponseHandler";
import httpStatus from 'http-status'
import { asyncHandler } from "../../utils/asyncHandler";
import { authServices } from "./auth.service";
import config from "../../config";

const registerUser = asyncHandler(async (req, res) => {
  const result = await authServices.registerUser(req.body);
  apiResponseHandler(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result
  });
});

const loginUser = asyncHandler(async (req, res) => {
    const result = await authServices.loginUser(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
    });
    apiResponseHandler(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    });
  });

  const refreshToken = asyncHandler(async (req, res) => {
    const result = await authServices.refreshToken(req.body);
    apiResponseHandler(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Refresh token generated successfully',
      data: result
    });
  });


  const changePassword = asyncHandler(async (req, res) => {
    const result = await authServices.changePassword(req.user, req.body);
    apiResponseHandler(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: result
    });
  });

  const forgetPassword = asyncHandler(async (req, res) => {
    const result = await authServices.forgetPassword(req.body.email);
    apiResponseHandler(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reset Password link send to your email',
      data: result
    });
  });

  const resetPassword = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const result = await authServices.resetPassword(req.body, token);
    apiResponseHandler(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password reset successfully',
      data: result,
    });
  });

  export const authControllers = {
    registerUser,
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword
  };