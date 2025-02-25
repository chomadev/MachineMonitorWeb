import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemCheck, NetworkInterface } from '../../models/system-check';

@Component({
  selector: 'app-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.scss']
})
export class SystemDetailsComponent {
  parsedInterfaces: NetworkInterface[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: SystemCheck) {
    this.parseActiveInterfaces();
  }

  parseActiveInterfaces(): void {
    if (this.data.network && this.data.network.activeInterfaces) {
      try {
        if (typeof this.data.network.activeInterfaces === 'string') {
          this.parsedInterfaces = JSON.parse(this.data.network.activeInterfaces)
            .map((name: string) => ({ name }));
        } else if (Array.isArray(this.data.network.activeInterfaces)) {
          this.parsedInterfaces = this.data.network.activeInterfaces as unknown as NetworkInterface[];
        }
      } catch (e) {
        console.error('Error parsing active interfaces:', e);
        this.parsedInterfaces = [];
      }
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  getMachineName(): string {
    return this.data.machine?.name || `Machine ${this.data.machineId}`;
  }
} 