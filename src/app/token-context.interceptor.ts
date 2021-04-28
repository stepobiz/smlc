import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiJmMjh1bnlFMElUb2IwVkR5MEk5cG9qNDA2QW0tSEFGblBJQkVYTzlmM3E4IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnFld0w4djkxVFlpT0FEY2hESzFfSmd6YWt6YjFoS0FraHlpRWdaeXU1ZFUiLCJpc3MiOiJodHRwczovL29hdXRoMi5pbm5vdmEtcy5jb20vb2F1dGgyL2F1c3V3M3hmaFVUdERubWs0MzU2IiwiYXVkIjoiQXBpR2VzdCBhY2NvdW50cyIsImlhdCI6MTYxMjI3MzcyNywiZXhwIjoxNjEyMzYwMTI3LCJjaWQiOiIwb2ExYTRrMzNvWWNmS21UMDM1NyIsInNjcCI6WyJST0xFX1NFUlZJQ0UiXSwic3ViIjoiMG9hMWE0azMzb1ljZkttVDAzNTcifQ.HF4Sddp16KRcIiXpmgYkB4b1NvVrio2NqTd2rD2wSs49B4xif8Czc06FpqmFbpkiMrUDwzqv0o-2yq309Z0AxOyZocuqQkPUnhWKfx-BNUnpvYFRhDl4kz83FVD14iydDMk_k-1xOeJHvxBLdZxjS95E1zbJHcPTadZ_MTix1QPosaY0ZuLESO8ip86rIsvEEnRQzlc6Q5j51BhREQPy55SBCSawBTrgKqXwcW8Zi8fXFBmkqBHPs2bBu2oI_1U1eZQiWzDs6xydsCi32RsovXVgfGMRJuyH3DjFx15TAcavzVV_tGuyIRoNOx80AXgcOBytg2UKc1lgXkBx5G4PrQ',
                'X-Tenant-Code': 'smlc',
            }
        });
        return next.handle(req);
    }
}