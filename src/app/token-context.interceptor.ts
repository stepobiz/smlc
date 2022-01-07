import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiI1SXZ0QTEyNURKRXJ5YzllRVNHWEFGeW84aGR0b09nalAzaklrVXBMZlpjIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnJGWVF5ZlR6NVJEelZuSTZONDNOQVg3aExlSkxJSjhVVUxSZXpVd0hIVHciLCJpc3MiOiJodHRwczovL29hdXRoMi5pbm5vdmEtcy5jb20vb2F1dGgyL2F1c3V3M3hmaFVUdERubWs0MzU2IiwiYXVkIjoiQXBpR2VzdCBhY2NvdW50cyIsImlhdCI6MTY0MTU0Njk2NSwiZXhwIjoxNjQxNjMzMzY1LCJjaWQiOiIwb2Eya244YmRua0FSR0dIQjM1NyIsInNjcCI6WyJST0xFX1NFUlZJQ0UiXSwic3ViIjoiMG9hMmtuOGJkbmtBUkdHSEIzNTcifQ.OsZA6b4mGSZjcqekoqYQ3hrNPG4o_4qag__NNXwI_vCmmnDe4mKzfGFu0rG0EJkKmXhuV2R0Qs4raeLYIUAm9IInUH4gxRYf53EaSEHjPZ-2LIkP57jRYxJYHkplB4L9yz3RxCmzexvXI2TpUMSbE9HC7SucXK0qRPOfrwDKQjO9-AGOfK0uJAU0U0e4oDuF1KoXTFo_J7ojXrZ0FoMSSvozE9mN4UMFF2veuyNQAyf2jT72oJf6SvTP_YEUXMQKcsvfAN8lG1-d52UOygt413R2-xkyEEoB2Uz9fU7TMomrtAH3zpwohbRD7O2c4B8VIPNIawjrH4rakYtjaJEXvA',
                'X-Tenant-Code': 'smlc',
            }
        });
        return next.handle(req);
    }
}