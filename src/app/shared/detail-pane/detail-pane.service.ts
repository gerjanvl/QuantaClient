import { Injectable, ElementRef, TemplateRef } from '@angular/core';
import { DetailPaneComponent } from './detail-pane.component';



@Injectable()
export class DetailPaneService {
   component: DetailPaneComponent;

    constructor() {

    }

    open(id: string, template: TemplateRef<any>) {
      this.component.open(id, template);
    }

    close(id: string) {
      this.component.close(id);
    }

    register(component: DetailPaneComponent) {
      this.component = component;
    }
}
