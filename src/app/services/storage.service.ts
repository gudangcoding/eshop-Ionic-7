import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageIonic: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageIonic.create();
  }

  set(key: string, value: any): void {
    if (this.storage) {
      this.storage.set(key, value);
    }
  }

  get(key: string): Promise<any> {
    return this.storage ? this.storage.get(key) : Promise.resolve(null);
  }

  clear(){
    this.storage?.clear();
  }
}
