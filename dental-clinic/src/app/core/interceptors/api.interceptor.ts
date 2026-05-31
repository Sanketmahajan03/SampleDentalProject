import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Add JWT Bearer token here when authentication is implemented
  // Example:
  // const authService = inject(AuthService);
  // const token = authService.getToken();
  // if (token) {
  //   const authReq = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${token}`)
  //   });
  //   return next(authReq);
  // }
  return next(req);
};
