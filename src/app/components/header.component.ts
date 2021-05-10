import { Component } from '~/decorators/component';

@Component({
  selector: 'app-header',
  template: '<div>Привет {{name}} Гузель</div>'
})
export class HeaderComponent {}
