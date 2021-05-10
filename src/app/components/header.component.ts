import { Component } from '~/decorators/component';
import { Input } from '~/decorators/input';

@Component({
  selector: 'app-header',
  template: '<div>Привет {{status}} Гузель</div>'
})
export class HeaderComponent {

  @Input status = 'waiting';
  @Input isEnable = false;
}
