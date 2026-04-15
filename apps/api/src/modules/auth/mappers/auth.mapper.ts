import type { AuthTokensResponse } from '../dto/responses/auth-tokens.response';

export function toAuthTokensResponse(accessToken: string, refreshToken: string, expiresIn: number): AuthTokensResponse {
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  };
}
