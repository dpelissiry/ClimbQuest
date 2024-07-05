import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {  
  
  title = 'climb-quest';

  constructor(private analytics: AngularFireAnalytics) {
    this.logEvent();
  }

  logEvent() {
    this.analytics.logEvent('app_initialized');
    console.log('Firebase initialized and event logged');
  } // main app componenet that is nested in the index.html
}