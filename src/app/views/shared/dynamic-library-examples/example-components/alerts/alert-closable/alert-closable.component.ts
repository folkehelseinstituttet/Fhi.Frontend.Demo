import { Component } from '@angular/core';

interface Alert {
  type: string;
  message: string;
  icon: string;
  bordered?: boolean;
}

const ALERTS: Alert[] = [
  {
    type: 'info',
    message: 'Dette er en melding til informasjon.',
    icon: 'icon-info-circle',
  },
  {
    type: 'success',
    message: 'Dette er en melding om suksess!',
    icon: 'icon-check-circle',
  },
  {
    type: 'warning',
    message: 'Dette er en advarsel!',
    icon: 'icon-bell',
  },
  {
    type: 'error',
    message: 'Dette er en feilmelding.',
    icon: 'icon-exclamation-circle',
  },
  {
    type: 'info',
    message: 'Dette er en melding til informasjon.',
    icon: 'icon-info-circle',
    bordered: true,
  },
  {
    type: 'success',
    message: 'Dette er en melding om suksess!',
    icon: 'icon-check-circle',
    bordered: true,
  },
  {
    type: 'warning',
    message: 'Dette er en advarsel!',
    icon: 'icon-bell',
    bordered: true,
  },
  {
    type: 'error',
    message: 'Dette er en feilmelding.',
    icon: 'icon-exclamation-circle',
    bordered: true,
  },
];

@Component({
  selector: 'app-alert-closable',
  templateUrl: './alert-closable.component.html',
})
export class AlertClosableComponent {
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
