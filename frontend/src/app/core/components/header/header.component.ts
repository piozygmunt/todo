import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(public spinnerService: SpinnerService) {
  }
}
