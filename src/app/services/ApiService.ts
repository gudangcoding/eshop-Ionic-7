import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://toko-amsis.my.id/api/';
  constructor() {}

  async getWithToken(url: string, token: string): Promise<any> {
    try {
      const response = await CapacitorHttp.request({
        method: 'GET',
        url: this.baseUrl+url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Error occurred in GET request:', error);
      throw error;
    }
  }

  async postWithToken(url: string, data: any, token: string): Promise<any> {
    try {
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: this.baseUrl+url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Error occurred in POST request:', error);
      throw error;
    }
  }
  async get(url: string): Promise<any> {
    try {
      const response = await CapacitorHttp.request({
        method: 'GET',
        url: this.baseUrl+url,
        headers: {
          'Content-Type': `application/json`,
        },
      });
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Error occurred in GET request:', error);
      throw error;
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: this.baseUrl+url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Error occurred in POST request:', error);
      throw error;
    }
  }
}
