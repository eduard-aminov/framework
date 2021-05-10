import { Component } from '~/decorators/component';
import { LogService } from '~/services/log';
import { StoreService } from '~/services/store';
import { HostListener } from '~/decorators/host-listener';

@Component({
  selector: 'app-footer',
  template: '<div class="footer">Имя: {{name}}, возраст: {{age}}</div>'
})
export class FooterComponent {
  constructor(private logService: LogService, private store: StoreService) {
    this.logService.log(`Hello from [${this.constructor.name}]`);
  }

  name = this.store.name;
  age = this.store.age;

  public changeName(): void {
    this.name = 'Guzel';
  }

  @HostListener('click')
  public changeAge(): void {
    this.age = 50;
    console.log(this.age);
  }
}
