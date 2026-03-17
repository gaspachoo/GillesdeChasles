import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }

  const apiUrl = (window as any).__env?.apiUrl as string | undefined;
  if (!apiUrl || !req.url.startsWith(apiUrl)) {
    return next(req);
  }

  return next(req.clone({ withCredentials: true }));
};

