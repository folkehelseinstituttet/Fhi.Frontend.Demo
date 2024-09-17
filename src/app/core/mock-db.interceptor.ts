import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { getMockDbBody } from './mock-db';

export function mockDbInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const { url, method } = req;

  if (url.startsWith('api/') && method === 'GET') {
    return of(new HttpResponse({ status: 200, body: getMockDbBody(url) }));
  }

  return next(req);
}
