import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiJXb0szR0hSNUxsbUg5U3RqU3NUdWdUMHlaWmFEcmZ4dWs1alRaNl9fQU1RIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjNfcElmTHF1SENleHROWURpb3l1d3llbEVOdzk4N2JCbTVMYWZoTXZCNDgiLCJpc3MiOiJodHRwczovL29hdXRoMi5pbm5vdmEtcy5jb20vb2F1dGgyL2F1c3V3M3hmaFVUdERubWs0MzU2IiwiYXVkIjoiQXBpR2VzdCBhY2NvdW50cyIsImlhdCI6MTYzODcxODg1OSwiZXhwIjoxNjM4ODA1MjU5LCJjaWQiOiIwb2Eya244YmRua0FSR0dIQjM1NyIsInNjcCI6WyJST0xFX1NFUlZJQ0UiXSwic3ViIjoiMG9hMmtuOGJkbmtBUkdHSEIzNTcifQ.BiLqaTTn-nQGVSiMv9HJsfMicmCABMaBgreckodT_fhfkx50Vuk16xhj6UQY_NQeaSDDQbDmfdUqtOO-VAIlZCwCmGdEImFjPd0idp1QRiLr2wH6O6BI-i-evuNpSYDocM_gGhrbtbmF2Nqfke0Mz2lj9oBiKuvzgOEjetOvT8uuOEt0_fjbnybnd72vnfijjVz7HS5rM6sothwO_4aHlvjB0uwSzJeZBJkWiwOQ-xKyYPrS3WCPY6hGDolUDcijzAQHmkIIuYlAsC5ntTotc1WeAZG4ODR-S1V9S5-c6indmwGmanG7FHFYqKGDuA7UmJNBTiZhHqIY6fV9uISk3w',
                'X-Tenant-Code': 'smlc',
            }
        });
        return next.handle(req);
    }
}