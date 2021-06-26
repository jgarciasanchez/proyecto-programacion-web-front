import { Component, HostBinding } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-programacion-web-front';

  constructor(private _themeService: ThemeService) { };

  @HostBinding('class')
  get themeMode() {
    if (this._themeService.getCurrentTheme() == "dark") {
      return 'theme-dark';
    } else {
      return 'theme-default';
    }
  };

}
