import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavLightComponent } from '../../components/navbar/nav-light/nav-light.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavLightComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {

  // activeSection: 'who' | 'philosophy' | 'approach' | 'presence' | 'closing' = 'who';
  activeSection: 'philosophy' | 'approach' | 'positioning' = 'philosophy';

  private io?: IntersectionObserver;
  private sectionIo?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initReveal();
    this.initStaggerCards();
    this.initActiveSection();
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.sectionIo?.disconnect();
  }

  private initReveal(): void {
    const els = Array.from(document.querySelectorAll('.reveal'));
    this.io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('in');
      });
    }, { threshold: 0.12 });
    els.forEach(el => this.io!.observe(el));
  }

  private initStaggerCards(): void {
    const cards = Array.from(document.querySelectorAll('.reveal-stagger'));
    const cardIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        (e.target as HTMLElement).classList.add('in');
      });
    }, { threshold: 0.12 });

    cards.forEach((c, i) => {
      (c as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
      cardIo.observe(c);
    });
  }

  private initActiveSection(): void {
    // const ids = ['who', 'philosophy', 'approach', 'presence', 'closing'];
    const ids = ['philosophy', 'approach', 'positioning'];
    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    this.sectionIo = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => (b.intersectionRatio - a.intersectionRatio))[0];
      if (!visible) return;
      this.activeSection = visible.target.id as any;
    }, { threshold: [0.25, 0.4, 0.6] });

    sections.forEach(s => this.sectionIo!.observe(s));
  }
}