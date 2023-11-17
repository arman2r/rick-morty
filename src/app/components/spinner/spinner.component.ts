import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SpinnerComponent {
  @Input() showSpinner = false;
  @Input() position: any;
  @Output() statusEvent = new EventEmitter<boolean>();

  
  @ViewChild('loading', { static: true }) loading!: ElementRef;

  constructor() {
    document.body.style.overflowY = "hidden";
  }

  ngOnInit() {
    console.log(this.loading.nativeElement)
    if(this.showSpinner != false){
      setTimeout(() => {
        this.loading.nativeElement.classList.add('removeSpinner')
        setTimeout(() => {
          this.loading.nativeElement.remove()
          document.body.style.overflowY = "auto";
          this.statusItem(true)
        }, 1200);
      }, 2500);
    }
    
  }

  statusItem(value: boolean) {
    console.log('entro value', value)
    this.statusEvent.closed = value;
    console.log(this.statusEvent)
  }

}
