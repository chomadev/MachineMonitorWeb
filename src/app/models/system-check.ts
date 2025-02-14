export interface SystemCheck {
  id: number;
  timestamp: string;
  machineId: number;
  services: {
    id: number;
    name: string;
    displayName: string;
    status: string;
    isRunning: boolean;
    systemCheckHistoryId: number;
  }[];
  network: {
    id: number;
    isConnected: boolean;
    hasInternetAccess: boolean;
    ipAddress: string | null;
    systemCheckHistoryId: number;
  };
  disks: {
    id: number;
    name: string;
    totalSpace: number;
    freeSpace: number;
    usagePercentage: number;
    systemCheckHistoryId: number;
  }[];
  cpu: {
    id: number;
    usagePercentage: number;
    systemCheckHistoryId: number;
  };
  memory: {
    id: number;
    totalPhysicalMemory: number;
    availablePhysicalMemory: number;
    usagePercentage: number;
    systemCheckHistoryId: number;
  };
  ports: {
    id: number;
    port: number;
    isOpen: boolean;
    service: string;
    systemCheckHistoryId: number;
  }[];
} 