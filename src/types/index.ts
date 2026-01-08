export interface ComponentInfo {
  name: string;
  dimensions: string;
  description: string;
}

// Configuration Types
export interface Option {
  value: string;
  label: string;
}

export interface Control {
  id: string;
  label?: string;
  defaultValue: string | boolean;
  options?: Option[]; // If options exist, it's a choice. If not, it's a boolean
}

export interface Group {
  id: string;
  label: string;
  controls: Control[];
}

export interface Config {
  groups: Group[];
}
