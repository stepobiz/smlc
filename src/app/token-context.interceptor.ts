import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiJlU2h3aDdNMEhOYUdROEVYX0trYWUzNDNEczJGYjBVQnNacG5mWlRGT1VNIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnZzVXZmOTV2VEg2bng3MThQQVYyb1B5Y3JuckRRT1dqUVBxNU1FMFFDcGMiLCJpc3MiOiJodHRwczovL29hdXRoMi5pbm5vdmEtcy5jb20vb2F1dGgyL2F1c3V3M3hmaFVUdERubWs0MzU2IiwiYXVkIjoiQXBpR2VzdCBhY2NvdW50cyIsImlhdCI6MTYwODAyOTIyOCwiZXhwIjoxNjA4MTE1NjI4LCJjaWQiOiIwb2ExYTRrMzNvWWNmS21UMDM1NyIsInNjcCI6WyJST0xFX1NFUlZJQ0UiXSwic3ViIjoiMG9hMWE0azMzb1ljZkttVDAzNTcifQ.AVSGXl6zJoGWwkfyIaHhtoxOQ1AzS5Naash7Cv4gX4J4xV8INcUZEo43pf1SVXRbGEbqCrBb7_tm9t-RN19pS-Lmx7wQHt9_YIzbTAJX-qi141ZgcRN72Rdglm69uuZwJ3oQ3hIJuQzGOjbOY6yj8VjltXYLBE9tZr0i3FomQfsDEBNBSEiJP_hchZ9wiAJSS0Ew6G4eYi1lxChgxw4oEup8t-w7E0a2i7KDpxf-b5Pn_adtG_h88c_vXJMKBgujEX9zQTcySZVb5fpzkmw3uO8QQZH_6vB08iKeDNEN7C4QYq-YqwVbf4QE87CTpz11l3hVY-3Hp4nnn33lafGV7A',
                'X-Tenant-Code': 'smlc',
            }
        });
        return next.handle(req);
    }
}