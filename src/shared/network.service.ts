/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  public networkStatus: BehaviorSubject<boolean>;
  private watchConnect: Subscription;
  private watchDisconnect: Subscription;

  constructor(private network: Network, private platform: Platform) {
    this.networkStatus = new BehaviorSubject(false);
    this.checkNetworkStatus();
    this.createNetworkObserverSubscriptions();
  }

  public checkNetworkStatus() {
    if (this.platform.is('cordova')) {
      if (
        this.network.type === undefined ||
        this.network.type === null ||
        this.network.type === 'unknown'
      ) {
        this.updateNetworkStatus(false);
      } else {
        this.updateNetworkStatus(true);
      }
    } else {
      this.updateNetworkStatus(navigator.onLine);
    }
  }

  public createNetworkObserverSubscriptions() {
    this.watchConnect = this.network.onConnect().subscribe(
      (data) => {
        this.updateNetworkStatus(true);
      },
      (error) => {
        alert(error);
      }
    );
    this.watchDisconnect = this.network.onDisconnect().subscribe(
      (data) => {
        this.updateNetworkStatus(false);
      },
      (error) => {
        alert(error);
      }
    );
  }

  public updateNetworkStatus(isOnline: boolean) {
    this.networkStatus.next(isOnline);
  }
}
