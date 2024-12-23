import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access');
        if (token) {
            const newReq = req.clone({
                headers: req.headers.append('Authorization', `JWT ${token}`)
            })
            return next.handle(newReq);
        }
        return next.handle(req);
    }
}