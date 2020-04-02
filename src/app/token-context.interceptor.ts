import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiJXblFIYkstQ2ZDR2x1T19TNTRZUTVtNWRNWkxvajM3N1hzQkxNNGhyT3pFIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnZMMlJIWVFNVFB0VE1GSE5welJlenRhTHg3bDhnd2hBQU5zZGpJN3llNXMiLCJpc3MiOiJodHRwczovL29hdXRoMi5pbm5vdmEtcy5jb20vb2F1dGgyL2F1c3V3M3hmaFVUdERubWs0MzU2IiwiYXVkIjoiQXBpR2VzdCBhY2NvdW50cyIsImlhdCI6MTU4NTgyNDgzNCwiZXhwIjoxNTg1OTExMjM0LCJjaWQiOiIwb2ExYTRrMzNvWWNmS21UMDM1NyIsInNjcCI6WyJST0xFX1NFUlZJQ0UiXSwic3ViIjoiMG9hMWE0azMzb1ljZkttVDAzNTcifQ.Jwa1giMzFYG22xq75jwVidhIjq03Cvil3kpAYOn9UOyWOMvFRB_9a21rcNc6aVtEQ3cnwmeITerh_6Xq-HSqXrcRwddBnk009312NGWV8s3UvCgIen_WFzQ5HlFuOdk0mciahiZGTzLTg4bp1fQkr92gjgkg9nwVBI9DqAo733OtqYxsPZ3OQF3GJH_p5g-OqkhJTVyZ_nOef900GqRxUwK1qRyTT9rh1dQqPJ3KOxmLlZhNailR62jyVH64lE285K2K-AV8dR74U6-6hTcZgBbR2juJ0hAVl5IXiahVii1WTumUukjFCppyArxRsY_qnGCtu_MdJaNIn6Flc0rgYg',
                'X-Tenant-Code': 'comune-smlc',
            }
        });
        return next.handle(req);
    }
}