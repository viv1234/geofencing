import { Component, OnInit } from '@angular/core';
    import { MapsAPILoader } from '@agm/core';
    import { PusherService } from '../pusher.service';
    declare const google;
    @Component({
      selector: 'app-admin',
      templateUrl: './admin.component.html',
      styleUrls: ['./admin.component.scss'],
    })
    export class AdminComponent implements OnInit {
      constructor(private loader: MapsAPILoader, private pusher: PusherService) {}
      theRanchPolygon;
      username = 'Vivek Pandey';
      message = '';
      showAlert = false;
      showLocationUpdate = false;
      zoom = 15;
      // Center of the ranch, where the initial marker will be placed
      center = {
        lat: 6.435838,
        lng: 3.451384,
      };
      // This array of latLngs represents the polygon around our ranch
      polygon = [
        { lat: 6.436914, lng: 3.451432 },
        { lat: 6.436019, lng: 3.450917 },
        { lat: 6.436584, lng: 3.450917 },
        { lat: 6.435006, lng: 3.450928 },
        { lat: 6.434953, lng: 3.451808 },
        { lat: 6.435251, lng: 3.451765 },
        { lat: 6.435262, lng: 3.451969 },
        { lat: 6.435518, lng: 3.451958 },
      ];

      ngOnInit() {
        // Wait for the google maps script to be loaded before using the "google" keyword
        this.loader.load().then(() => {
          this.theRanchPolygon = new google.maps.Polygon({ paths: this.polygon });
        });
        const channel = this.pusher.init();
        channel.bind('ping', (position) => {
          this.center = {
            ...position,
          };
          // Create a LatLng using the position returned from the pusher event
          const latLng = new google.maps.LatLng(position);
          this.showLocationUpdate = true;
          this.message = "The user's location has changed";
          // Check if the location is outside the polygon
          if (!google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon)) {
            // Show alert if user has left the polygon
            this.showAlert = true;
          }else{
            this.message = 'The user is currently in the ranch';
          }
        });
      }
    }