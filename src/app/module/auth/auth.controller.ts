import { apiResponseHandler } from "../../utils/apiResponseHandler";
import httpStatus from 'http-status'
import { asyncHandler } from "../../utils/asyncHandler";
import { authServices } from "./auth.service";
import config from "../../config";

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

  export const authControllers = {
    loginUser,
  };