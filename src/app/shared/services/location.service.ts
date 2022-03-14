import { Injectable } from '@angular/core';
import { win } from '../utils/window';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  assign(url: string) {
    win.globalWindow.location.href = url;
  }

  openTab(url: string) {
    win.globalWindow.open(url, '_blank');
  }

  getHref(): string {
    return win.globalWindow.location.href;
  }
}
