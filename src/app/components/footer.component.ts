import { Component } from '~/decorators/component';
import { LogService } from '~/services/log';
import { StoreService } from '~/services/store';

@Component({
  selector: 'app-footer',
  template: '<div>footer</div>'
})
export class FooterComponent {
  constructor(private logService: LogService, private store: StoreService) {
    this.logService.log(`Hello from [${this.constructor.name}]`);
    this.logService.log(this.store.name);
  }
}
