import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from './config.service';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(ConfigService);

  if (typeof window === 'undefined') {
    return next(req);
  }

  const apiUrl = config.apiUrl;
  if (!apiUrl || !req.url.startsWith(apiUrl)) {
    return next(req);
  }

  return next(req.clone({ withCredentials: true }));
};

