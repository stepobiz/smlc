import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenContextInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + 'eyJraWQiOiJrVzJGOXd2QUNyK0NoK1JSNmNrZ2pEeXdGTGh3SFRlRmVQMXo5VXhPem9ZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzbWMwOTVpbWhjamxqczlvaWlybWlhMTBhOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiUElHRVMuSU9cL1NFUlZJQ0UiLCJhdXRoX3RpbWUiOjE2NTEzOTg2MjEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xXzA4QXVSeGxUayIsImV4cCI6MTY1MTQ4NTAyMSwiaWF0IjoxNjUxMzk4NjIxLCJ2ZXJzaW9uIjoyLCJqdGkiOiI5MDA2NWFkNC01NzE3LTRmMjUtOWNlNC02ZWMwY2Q0YjUzZDgiLCJjbGllbnRfaWQiOiIzbWMwOTVpbWhjamxqczlvaWlybWlhMTBhOSJ9.gZZkap4OoUAVZYZYmOcjuiNebLUZAW1d7jrFEg6shvj2rM88-u41QnQdrRBkGTnBdpuODcCazJhrOm7CuOhLVbcRdQLNY-rD5MeOynDokboRh5YVx69oXbLLdooYooPdOEHBCEHVxLSeVY7PUEgKwWypwhPfT-CdtyIMxROOQC2oX7hQLTfZcNEFUUwAc_Mw0MR_NIQ89-svfY0eDNXVnULgfuyp5EYOz4QT5DA47jgN6aZxLVqyS2ejBg6eWDwWd6kQqGGu1LOVvtssO1wR3za52aZtIgQ6garGj7VHPCiZJVQY1H9cz-vw_3wxtnp18Tm6vK57ADg5AIOVEKgNMw',
                'X-Tenant-Code': 'smlc',
            }
        });
        return next.handle(req);
    }
}