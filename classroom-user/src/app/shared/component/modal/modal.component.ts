import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'manager0-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() title: string;
  @Input() size = '40px';
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click', (e: any) => {
      if (e.target.className === 'modal') {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    console.log('llega a open')
    this.element.style.visibility = 'visible';
    this.element.querySelector('.modal_bg').classList.add('modal_vis');
    this.element.querySelector('.modal').classList.add('modal_dis');
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.visibility = 'hidden';
    document.body.classList.remove('modal-open');
    this.element.querySelector('.modal_bg').classList.remove('modal_vis');
    this.element.querySelector('.modal').classList.remove('modal_dis');
  }

}
