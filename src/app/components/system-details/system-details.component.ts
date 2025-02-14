import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemCheck } from '../../models/system-check';

@Component({
  selector: 'app-system-details',
  template: `
    <h2 mat-dialog-title>System Details</h2>
    <mat-dialog-content>
      <div class="checks-list">
        <h3>Services</h3>
        <div *ngFor="let service of data.services" class="check-item">
          <mat-icon [color]="service.isRunning ? 'primary' : 'warn'">
            {{service.isRunning ? 'check_circle' : 'error'}}
          </mat-icon>
          <div class="check-info">
            <h4>{{service.name}}</h4>
            <p>Status: {{service.status}}</p>
            <p *ngIf="service.displayName">Display Name: {{service.displayName}}</p>
          </div>
        </div>

        <h3>Network</h3>
        <div class="check-item">
          <mat-icon [color]="data.network.isConnected && data.network.hasInternetAccess ? 'primary' : 'warn'">
            {{data.network.isConnected && data.network.hasInternetAccess ? 'wifi' : 'wifi_off'}}
          </mat-icon>
          <div class="check-info">
            <p>Connected: {{data.network.isConnected ? 'Yes' : 'No'}}</p>
            <p>Internet Access: {{data.network.hasInternetAccess ? 'Yes' : 'No'}}</p>
            <p *ngIf="data.network.ipAddress">IP Address: {{data.network.ipAddress}}</p>
          </div>
        </div>

        <h3>Storage</h3>
        <div *ngFor="let disk of data.disks; let i = index" class="check-item">
          <mat-icon [color]="disk.usagePercentage < 90 ? 'primary' : 'warn'">
            storage
          </mat-icon>
          <div class="check-info">
            <h4>Disk {{i + 1}}</h4>
            <p>Usage: {{disk.usagePercentage | number:'1.0-1'}}%</p>
            <p>Free Space: {{formatBytes(disk.freeSpace)}}</p>
            <p>Total Space: {{formatBytes(disk.totalSpace)}}</p>
            <mat-progress-bar
              [color]="disk.usagePercentage < 90 ? 'primary' : 'warn'"
              mode="determinate"
              [value]="disk.usagePercentage">
            </mat-progress-bar>
          </div>
        </div>

        <h3>Resources</h3>
        <div class="check-item">
          <mat-icon [color]="data.cpu.usagePercentage < 80 ? 'primary' : 'warn'">
            memory
          </mat-icon>
          <div class="check-info">
            <p>CPU Usage: {{data.cpu.usagePercentage | number:'1.0-1'}}%</p>
            <mat-progress-bar
              [color]="data.cpu.usagePercentage < 80 ? 'primary' : 'warn'"
              mode="determinate"
              [value]="data.cpu.usagePercentage">
            </mat-progress-bar>
            <p class="mt-3">Memory Usage: {{data.memory.usagePercentage | number:'1.0-1'}}%</p>
            <mat-progress-bar
              [color]="data.memory.usagePercentage < 80 ? 'primary' : 'warn'"
              mode="determinate"
              [value]="data.memory.usagePercentage">
            </mat-progress-bar>
            <p class="mt-2">Available Memory: {{formatBytes(data.memory.availablePhysicalMemory)}}</p>
            <p>Total Memory: {{formatBytes(data.memory.totalPhysicalMemory)}}</p>
          </div>
        </div>

        <h3>Open Ports</h3>
        <div *ngFor="let port of data.ports" class="check-item">
          <mat-icon [color]="port.isOpen ? 'primary' : 'warn'">
            {{port.isOpen ? 'link' : 'link_off'}}
          </mat-icon>
          <div class="check-info">
            <h4>Port {{port.port}}</h4>
            <p>Status: {{port.isOpen ? 'Open' : 'Closed'}}</p>
            <p *ngIf="port.service">Service: {{port.service}}</p>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .checks-list {
      padding: 16px 0;
    }
    .check-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .check-info {
      margin-left: 16px;
      flex: 1;
    }
    h3 {
      margin: 24px 0 16px 0;
    }
    h4 {
      margin: 0 0 4px 0;
    }
    p {
      margin: 0;
      color: rgba(0, 0, 0, 0.6);
    }
    .mt-2 {
      margin-top: 8px;
    }
    .mt-3 {
      margin-top: 12px;
    }
    mat-progress-bar {
      margin-top: 4px;
    }
  `]
})
export class SystemDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SystemCheck) {}

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
} 