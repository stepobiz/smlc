import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiIyTjZUUDRjUzdIQmtVR2ZkaFI5cGRJRzY0M1FLcUh4el9ZUXVVQk14YzEwIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlp4cDJVa0NfZTdEUEtFR1hfYlhkNkRwcnhiWDBVTi1MYVdZVzVGcGZDRlUiLCJpc3MiOiJodHRwczovL29hdXRoMi5pbm5vdmEtcy5jb20vb2F1dGgyL2F1c3V3M3hmaFVUdERubWs0MzU2IiwiYXVkIjoiQXBpR2VzdCBhY2NvdW50cyIsImlhdCI6MTU4NzE0MTM0NywiZXhwIjoxNTg3MjI3NzQ3LCJjaWQiOiIwb2ExYTRrMzNvWWNmS21UMDM1NyIsInNjcCI6WyJST0xFX1NFUlZJQ0UiXSwic3ViIjoiMG9hMWE0azMzb1ljZkttVDAzNTcifQ.PxE8tcl3S_5dr-bxy1hatAVAGRqPP99qBY6D9t4f3wk-9X-8LyAZD_D0GrlO9i1DP2PWov6NNl_g_ZkdIfXqIgsgDJexn0RpMhXPsIsm3e6akdhQj06g3FdNGOs2i4-0qWs_Vqhfe9a9nAJSc36vd7jK4QtFpTTU411A6_rsrd9nVILi8mU1ipfE3kD3gq7SgWkHCQ--76KpvA2-nPEn-EFEsaGV_qxqkViiDBUS2W_D0OxVJ16E6s186MtuoiUnyl_3j6a8AeQJLatyC3KpO41tq2iyXe5t4v5pijx6kB8rUCc86p6GxlEKxryKT-yX7d0f7B3qxWR_ZJ_3okmZFg',
                'X-Tenant-Code': 'comune-smlc',
            }
        });
        return next.handle(req);
    }
}