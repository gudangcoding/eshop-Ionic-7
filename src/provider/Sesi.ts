import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sesi {
  // Simpan data ke penyimpanan
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Dapatkan data dari penyimpanan
  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Hapus data dari penyimpanan
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
