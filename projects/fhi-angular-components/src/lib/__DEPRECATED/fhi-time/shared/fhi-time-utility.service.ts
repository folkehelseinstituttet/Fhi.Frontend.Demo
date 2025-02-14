import { Injectable } from '@angular/core';

@Injectable()
export class FhiTimeUtilityService {
  getRandomID(): string {
    return `id${Math.floor(Math.random() * Math.pow(10, 8))}`;
  }
}
