import { Injectable } from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const hardcodedToken = environment;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${hardcodedToken}`
      }
    });

    return next.handle(request)
      .pipe(
        // Retry on failure
        retry(2),

        // Handle errors
        catchError((error: HttpErrorResponse) => {
          // TODO: Add error handling logic here
          alert(`HTTP Error: ${request.url}`);
          return throwError(error);
        }),

        // PROFILING
        finalize(() => {
          const profilingMsg = `${request.method} "${request.urlWithParams}"`;
          console.log(profilingMsg);
        })
        );
  }
}
