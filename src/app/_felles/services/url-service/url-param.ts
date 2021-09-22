import { BehaviorSubject, Observable } from 'rxjs';
import { UrlService } from './url.service';

export class UrlParam {
  constructor(
    private name: string,
    private urlService: UrlService
  ) {
    this.urlService.addToParamsRegistry(this.name);
  }

  private paramSubject = new BehaviorSubject<string>(this.value);

  get value(): string {
    return this.urlService.getUrlTree()?.queryParams[this.name];
  }

  set value(value: string) {
    if (value.length === 0) {
      this.deleteParam();
    } else {
      this.urlService.updateUrlTree({ [this.name]: value });
      this.paramSubject.next(value);
    }
  }

  getParamAsObservable(): Observable<string> {
    return this.paramSubject.asObservable();
  }

  removeFromParamsRegistry() {
    const array = this.urlService.urlParamsInRegistry;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === this.name) {
        array.splice(i, 1);
      }
    }
  }

  private deleteParam() {
    delete this.urlService.getUrlTree().queryParams[this.name];
  }

}
