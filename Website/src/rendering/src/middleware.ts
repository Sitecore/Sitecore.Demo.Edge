import { NextResponse, NextRequest } from 'next/server';
import { getSessionURLByContentHubID } from 'src/api/getSessionByContentHubID';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Redirect to the specific session page on the website if one is found
  // after scanning a QR code (or copy/ pasting the link in the browser)
  // Otherwise redirect to the sessions page
  if (request.nextUrl.search.includes('chid')) {
    const url = request.nextUrl.clone();
    const contentHubSessionId = url.searchParams.get('chid');
    const sessionURL = (await getSessionURLByContentHubID(contentHubSessionId)) ?? '/sessions';

    url.pathname = sessionURL;
    url.search = 'qr-code-scan=true';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
