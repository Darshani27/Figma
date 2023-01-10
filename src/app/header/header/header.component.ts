// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
declare var google:any;
@Component({
  selector: 'efficient-routes-modal',
  templateUrl: './efficient-routes.component.html',
  styleUrls: ['./efficient-routes.component.scss'],
})
export class EfficientRoutesComponent implements OnInit {
  isShow:boolean;
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true,suppressMarkers:true});
  cuurentLocation = {lat:23.722000, lng:75.382103}
  map:any
  icons = {start: new google.maps.MarkerImage('/assets/icon/map-delivery-boy.svg')};
  routeData = [{location:{lat:23.179300, lng:75.784912, storeName:'Variety Foods'}}, {location:{lat:23.453360, lng:75.414810, storeName:'Bharat Store'}}, {location:{lat:22.719568, lng:75.857727, storeName:'Relience Store'}}];
  alphaBets = "abcdefghijklmnopqrstuvwxyz".split('')
  marker=new google.maps.Marker();
  labelIndex = 0;
  currLat: any;
  currLng: any;

  constructor() { }

  ngOnInit() {
    this.getCurrentLocation();
    
  }
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: this.cuurentLocation,
      streetViewControl: false,
      zoomControl: true,
      mapTypeControl:false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      fullscreenControlOptions:{
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
    });
    this.directionsDisplay.setMap(this.map);
    this.createEfficientRoute([]);
    // this.getCurrentLocation();
  }

  getCurrentLocation()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position:any)=>{
        console.log(position);
        
        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
      })
    }
    else
    {
      alert("Geolocation is not supported by this browser.");
    }
  }

  createEfficientRoute(coordinates:any[]) {
    coordinates = JSON.parse(JSON.stringify(this.routeData));

    let destination = coordinates[coordinates.length-1].location; // '22.719568, 75.857727'
    coordinates.splice(coordinates.length-1, 1)
    // coordinates.map((item:any,index)=>{
    //   if(index==0)
    //   {
    //     this.marker.setMap(null);
    //   }
    // })
    this.createMarker(this.cuurentLocation,this.icons.start,0);

    var request = {
      origin:this.cuurentLocation, 
      destination:destination,
      travelMode: 'DRIVING',
      waypoints:coordinates,
      optimizeWaypoints:true
    };

    this.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        console.log('geocoded_waypoints', response.routes[0].legs)
        console.log(response);
        this.directionsDisplay.setDirections(response);
        var leg = response.routes[ 0 ].legs[ 1 ];
        response.routes[0].legs.forEach((item:any,index)=>{
        this.createMarker(item.end_location,{} as any,this.labelIndex++);
        });

        // this.makeMarker(leg.start_location, this.icons.start);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  makeMarker( position, icon ) {
    new google.maps.Marker({
     position: position,
     map: this.map,
     icon: icon,
     title: "My Location"
    });}

  createMarker(cuurentLocation: { lat: number; lng: number; }, icon,labelIndex) {
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var marker = new google.maps.Marker({
      position: cuurentLocation,
      map: this.map,
      label: labels[labelIndex % labels.length],
      icon: icon
    });
    // marker.setMap(null);
  }
 
  show(){
    if(this.isShow){
      this.isShow = false;
      setTimeout(()=>{
        this.isShow = true;
      },20)
    }else{
      this.isShow  = true;
    }
  }

  hide(){
    this.isShow  = false;
  }

}



