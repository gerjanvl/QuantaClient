import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { MsAdalAngular6Service } from "microsoft-adal-angular6";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private adalSvc: MsAdalAngular6Service) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has("Authorization")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.adalSvc.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
