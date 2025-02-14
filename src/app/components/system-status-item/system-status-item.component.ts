import { Component, Input } from '@angular/core';
import { SystemCheck } from '../../models/system-check';
import { Machine } from '../../models/machine';

@Component({
  selector: 'app-system-status-item',
  templateUrl: './system-status-item.component.html',
  styleUrls: ['./system-status-item.component.scss']
})
export class SystemStatusItemComponent {
  @Input() machine!: Machine;
  @Input() systemCheck?: SystemCheck;
  @Input() allChecksOk: boolean = false;
} 