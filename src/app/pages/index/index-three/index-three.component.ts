import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavLightComponent } from "../../../components/navbar/nav-light/nav-light.component";
import { FormTwoComponent } from "../../../components/form/form-two/form-two.component";
import { RouterLink } from '@angular/router';
import { BestLoctionsComponent } from "../../../components/best-loctions/best-loctions.component";
import { GridOneComponent } from "../../../components/property/grid-one/grid-one.component";
import { HowItsWorkComponent } from "../../../components/how-its-work/how-its-work.component";
import { BlogComponent } from "../../../components/blog/blog.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-index-three',
  imports: [
    CommonModule,
    RouterLink,
    NavLightComponent,
    FormTwoComponent,
    BestLoctionsComponent,
    GridOneComponent,
    HowItsWorkComponent,
    BlogComponent,
    FooterTopComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './index-three.component.html',
  styleUrl: './index-three.component.css'
})
export class IndexThreeComponent implements AfterViewInit {

  submitting = false;
  contactForm!: FormGroup;
  constructor(private contactService: ContactService, private fb: FormBuilder) {

    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      inquiryType: ['Select', [Validators.required]],
      message: [''],
    });
  }

  @ViewChild('bgVideo') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.volume = 1;
  }

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.contactService.sendInquiry(this.contactForm.value).subscribe({
      next: (response) => {
        this.submitting = false;
        alert(response.message || 'Thank you. Our advisory team will reach out within 24 hours');
        this.contactForm.reset();
      },
      error: (error) => {
        this.submitting = false;
        console.error('Submit error:', error);
        alert('Failed to send inquiry');
      }
    });
  }
}
