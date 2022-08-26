import { Component } from '@angular/core';

interface Alert {
  type: string;
  message: string;
  icon: string;
  bordered?: boolean;
}

const ALERTS: Alert[] = [{
    type: 'info',
    message: 'This is an info alert.',
    icon: 'icon-info-circle',
  }, {
    type: 'success',
    message: 'This is a success alert.',
    icon: 'icon-check-circle-regular',
  }, {
    type: 'warning',
    message: 'This is a warning alert.',
    icon: 'icon-bell-regular',
  }, {
    type: 'error',
    message: 'This is an error alert.',
    icon: 'icon-bell-regular',
  }, {
    type: 'info',
    message: 'This is an info alert.',
    icon: 'icon-info-circle',
    bordered: true,
  }, {
    type: 'success',
    message: 'This is a success alert.',
    icon: 'icon-check-circle-regular',
    bordered: true,
  }, {
    type: 'warning',
    message: 'This is a warning alert.',
    icon: 'icon-bell-regular',
    bordered: true,
  }, {
    type: 'error',
    message: 'This is an error alert.',
    icon: 'icon-bell-regular',
    bordered: true,
  }
];

@Component({
  selector: 'app-alert-dismissible-example',
  templateUrl: './alert-dismissible-example.component.html'
})
export class AlertDismissibleExampleComponent {
  alerts: Alert[];

  constructor() {
    this.showAlerts();
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  showAlerts() {
    this.alerts = Array.from(ALERTS);
  }
}
