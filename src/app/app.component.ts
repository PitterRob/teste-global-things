import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NetworkService } from 'src/shared/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  active = '';
  nav = [
    {
      name: 'Início',
      link: '/home',
      icon: 'home',
    },
    {
      name: 'Cadastro',
      link: '/cadastro',
      icon: 'add-circle',
    },
  ];

  constructor(private router: Router, private network: NetworkService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });
    this.network.networkStatus.subscribe();
  }
}
