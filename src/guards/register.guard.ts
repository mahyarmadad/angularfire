import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Injectable({ providedIn: 'root' })
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private setting: SettingsService
    ) { }

    canActivate(): boolean {
        if (this.setting.getSettings().allowRegister) {
            return true
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}