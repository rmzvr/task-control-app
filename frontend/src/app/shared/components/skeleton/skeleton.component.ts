import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'skeleton-rect',
  host: {
    class: 'pulse',
  },
  template: ``,
  styles: [
    `
      :host {
        display: block;
        width: var(--skeleton-rect-width);
        height: var(--skeleton-rect-height);
        background: rgb(239, 241, 246) no-repeat;
        border-radius: 3px;

        animation: pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        animation-delay: 0.5s;
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class SkeletonComponent implements OnInit {
  width?: string;
  height?: string;
  className?: string;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }

    host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
    host.style.setProperty('--skeleton-rect-height', this.height ?? '105.6px');
  }
}
