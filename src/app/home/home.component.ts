
    import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    @Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
      styleUrls: ['./home.component.scss'],
    })
    export class HomeComponent implements OnInit {
      constructor(private http: HttpClient) {}
      username = 'Vivek Pandey'
      pingServer(location) {
        this.http
          .post('http://localhost:4000/ping', location)
          .subscribe((res) => {});
      }
      ngOnInit() {
        if ('geolocation' in navigator) {
          navigator.geolocation.watchPosition((position) => {
            this.pingServer({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }
      }
    }