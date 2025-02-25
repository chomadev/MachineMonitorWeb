export interface NetworkInterface {
  name: string;
  description?: string;
  status?: string;
}

export interface MonitoredAddress {
  id: number;
  address: string;
  isReachable: boolean;
  responseTime: number;
  networkStatusId: number;
}

export interface Folder {
  id: number;
  path: string;
  exists: boolean;
  isEmpty: boolean;
  lastModified: string | null;
  hasZeroByteFiles: boolean;
  isValid: boolean;
  errorMessage: string | null;
  zeroByteFiles: string;
  systemCheckHistoryId: number;
}

export interface FolderChange {
  id: number;
  path: string;
  lastChanged: string;
  lastChangeType: string;
  systemCheckHistoryId: number;
}

export interface SystemCheck {
  id: number;
  timestamp: string;
  machineId: number;
  machine: {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
  } | null;
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
    activeInterfaces: string;
    systemCheckHistoryId: number;
    monitoredAddresses: MonitoredAddress[];
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
  folders: Folder[];
  folderChanges: FolderChange[];
  monitoredAddresses: any[];
} 