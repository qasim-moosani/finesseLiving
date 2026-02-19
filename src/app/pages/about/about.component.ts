import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { NavLightComponent } from '../../components/navbar/nav-light/nav-light.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavLightComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  private initRevealAnimations(): void {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('in');
      });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  }
  ngAfterViewInit(): void {
    this.initRevealAnimations();
  }

}
