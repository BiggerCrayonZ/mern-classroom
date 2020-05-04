import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    console.log([...this.modals]);
    console.log({ id });
    let modal: any = this.modals.filter(x => x.id === id)[0];
    console.log({ modal })
    modal.open();
  }

  close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
