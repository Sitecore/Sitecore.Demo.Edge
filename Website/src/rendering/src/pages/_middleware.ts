import { NextResponse, NextRequest } from 'next/server';
import { getSessionURLByContentHubID } from 'src/api/getSessionByContentHubID';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Redirect to the specific session page on the website if one is found
  // after scanning a QR code (or copy/ pasting the link in the browser)
  // Otherwise redirect to the sessions page
  if (request.nextUrl.search.includes('chid')) {
    const contentHubSessionId = request.nextUrl.searchParams.get('chid');
    const sessionURL = await getSessionURLByContentHubID(contentHubSessionId);

    let websiteSessionURL = '';
    if (sessionURL) {
      const urlParts = sessionURL.split('/');
      websiteSessionURL = `/sessions/${urlParts[urlParts.length - 1]}`;
    } else {
      websiteSessionURL = '/sessions';
    }
    return NextResponse.redirect(`${process.env.PUBLIC_URL}${websiteSessionURL}`).cookie(
      'qr-code-scan',
      'true',
      { maxAge: 10000 }
    );
  }
  return NextResponse.next();
}
