import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../chat.service';



@Component({
  selector: 'app-dialog',
  template: `
  <div class="modal-header">
  <h4 class="modal-title"> Chat !</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <input class="form-control" id="ex3" type="text" placeholder="Put Name" [(ngModel)]="name">
   </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click'); senduser()">Join</button>

  </div>
  `
})

// tslint:disable-next-line:component-class-suffix
export class NgbdModalContent {
  @Input() name = '';
  constructor(public activeModal: NgbActiveModal, private chatService: ChatService) { }
 senduser() {
     this.chatService.nickname.next(this.name);
  }
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html'
})
export class PopupComponent implements OnInit, AfterViewInit {
  pseudo: String;
  modalRef;
  constructor(private modalService: NgbModal, private chatService: ChatService) { }
  open() {
    this.modalRef = this.modalService.open(NgbdModalContent);
    // modalRef.componentInstance.name = 'World';
  }
  ngOnInit() {
   /*this.chatService.nickname.subscribe(val => console.log(val));*/
  }

  ngAfterViewInit() {

    this.open();
  }
}
