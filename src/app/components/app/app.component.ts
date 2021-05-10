import { Component } from '~/decorators/component';
import { LogService } from '~/services/log';
import { StoreService } from '~/services/store';
import { Input } from '~/decorators/input';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div>root</div>
      <app-footer></app-footer>
      <app-header></app-header>
    </div>
  `
})
export class AppComponent {
  constructor(private logService: LogService, private store: StoreService) {
    this.logService.log(`Hello from [${this.constructor.name}]`);
  }
}
