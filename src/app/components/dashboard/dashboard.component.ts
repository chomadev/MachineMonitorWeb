import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Machine } from '../../models/machine';
import { SystemCheck } from '../../models/system-check';
import { MachineService } from '../../services/machine.service';
import { SystemCheckService } from '../../services/system-check.service';
import { SystemDetailsComponent } from '../system-details/system-details.component';

interface MachineStatus {
  machine: Machine;
  systemCheck?: SystemCheck;
  allChecksOk: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  machineStatuses: MachineStatus[] = [];
  displayedColumns: string[] = ['name', 'status', 'actions'];

  constructor(
    private machineService: MachineService,
    private systemCheckService: SystemCheckService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMachines();
  }

  private checkSystemStatus(systemCheck: SystemCheck): boolean {
    const servicesOk = systemCheck.services.every(s => s.isRunning);
    const networkOk = systemCheck.network.isConnected && systemCheck.network.hasInternetAccess;
    const disksOk = systemCheck.disks.every(d => d.usagePercentage < 90); // Alert if usage > 90%
    const cpuOk = systemCheck.cpu.usagePercentage < 80; // Alert if usage > 80%
    const memoryOk = systemCheck.memory.usagePercentage < 80; // Alert if usage > 80%
    
    return servicesOk && networkOk && disksOk && cpuOk && memoryOk;
  }

  loadMachines(): void {
    this.machineService.getMachines().subscribe(machines => {
      const systemCheckRequests = machines.map(machine => 
        this.systemCheckService.getLatestSystemCheck(machine.apiKey)
      );
      
      forkJoin(systemCheckRequests).subscribe(systemChecks => {
        this.machineStatuses = machines.map((machine, index) => ({
          machine,
          systemCheck: systemChecks[index],
          allChecksOk: this.checkSystemStatus(systemChecks[index])
        }));
      });
    });
  }

  deleteMachine(id: number): void {
    this.machineService.deleteMachine(id).subscribe(() => {
      this.loadMachines();
    });
  }

  openDetails(systemCheck: SystemCheck): void {
    this.dialog.open(SystemDetailsComponent, {
      data: systemCheck,
      width: '600px'
    });
  }
} 