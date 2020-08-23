declare global {
  interface Window {
    __USER__: any;
    flash: (type: string, content: string) => void;
  }
}

export {};
