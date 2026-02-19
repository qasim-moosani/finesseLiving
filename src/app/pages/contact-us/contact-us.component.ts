declare var L: any;

import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NavLightComponent } from '../../components/navbar/nav-light/nav-light.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavLightComponent, FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})

export class ContactUsComponent {


  submitting = false;
  contactForm!: FormGroup;


  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      inquiryType: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }



  ngAfterViewInit(): void {
    this.initRevealAnimations();
    this.initMap();
  }

  submit(): void {
    if (this.contactForm.invalid) return;

    this.submitting = true;

    // TODO: connect to backend / email service
    console.log('Form payload:', this.contactForm.value);

    setTimeout(() => {
      this.submitting = false;
      this.contactForm.reset();
      // Optional: toast/snackbar
      alert('Thank you. Our advisory team will reach out within 24 hours.');
    }, 900);
  }

  private initMap(): void {
    const lat = 25.173234;
    const lng = 55.244124;

    const map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const companyIcon = L.icon({
      iconUrl: 'assets/img/map-icon.png',
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -30],
    });

    L.marker([lat, lng], { icon: companyIcon })
      .addTo(map)
      .bindPopup('<b>Finesse Living</b><br>Al Quoz, Dubai');

    L.circle([lat, lng], {
      color: '#b08a3b',
      fillColor: '#b08a3b',
      fillOpacity: 0.12,
      radius: 380
    }).addTo(map);
  }

  private initRevealAnimations(): void {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('in');
      }
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  }

}
