import { handleSignInRequest } from '$app/bff';

export async function POST(request: Request) {
  return handleSignInRequest(request);
}
