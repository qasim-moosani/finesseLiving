declare var L: any;  // Declare L globally


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { FooterTopComponent } from "../../components/footer-top/footer-top.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavLightComponent } from '../../components/navbar/nav-light/nav-light.component';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    NavbarComponent,
    NavLightComponent,
    FooterTopComponent,
    FooterComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  ngOnInit(): void {

    const lat = 25.173234;
    const lng = 55.244124;

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // ✅ Custom company logo icon
    const companyIcon = L.icon({
      iconUrl: 'assets/img/map-icon.png',
      iconSize: [30, 30],      // adjust size
      iconAnchor: [25, 50],    // center bottom
      popupAnchor: [0, -45],
    });

    // ✅ Use logo instead of default marker
    L.marker([lat, lng], { icon: companyIcon })
      .addTo(map)
      .bindPopup('<b>Finnese Living</b><br>Al Quoz')
      .openPopup();

    // Optional highlight circle
    L.circle([lat, lng], {
      color: '#007bff',
      fillColor: '#007bff',
      fillOpacity: 0.2,
      radius: 300
    }).addTo(map);
  }


}
