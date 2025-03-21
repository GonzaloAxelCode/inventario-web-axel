import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'app-settiings',
  standalone: true,
  imports: [CommonModule, TuiTabs,
  ],
  templateUrl: './settiings.component.html',
  styleUrl: './settiings.component.scss', changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SettiingsComponent {

}
