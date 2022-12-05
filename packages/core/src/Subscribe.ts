import { nativeTryCatch } from "@monitor/utils";

export class Subscribe<T> {
  dep: Map<T, any[]> = new Map();
  constructor() {}
  watch(eventName: T, callback: (data: any) => void) {
    const fns = this.dep.get(eventName);
    if (fns) {
      fns.push(callback);
      return;
    }
    this.dep.set(eventName, [callback]);
  }
  notify<D = any>(eventName: T, data: any) {
    const fns = this.dep.get(eventName);
    if (!eventName || !fns) return;
    fns.forEach((fn) => {
      nativeTryCatch(
        () => {
          fn();
        },
        (e: Error) => {
          console.error(e);
        }
      );
    });
  }
}
