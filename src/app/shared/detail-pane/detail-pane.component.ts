import { Component, OnInit, ElementRef, TemplateRef } from "@angular/core";
import { DetailPaneService } from "./detail-pane.service";

@Component({
  selector: "app-detail-pane",
  templateUrl: "./detail-pane.component.html",
  styleUrls: ["./detail-pane.component.scss"]
})
export class DetailPaneComponent implements OnInit {
  panes: { template: TemplateRef<any>; id: any }[] = [];

  constructor(private detailPaneService: DetailPaneService) {}

  open(id: any, template: TemplateRef<any>) {
    if (this.panes.filter(o => o.id === id).length === 0) {
      this.panes.push({ id, template });
    }
  }

  close(id: any) {
    this.panes = this.panes.filter(o => o.id !== id);
  }

  ngOnInit() {
    this.detailPaneService.register(this);
  }
}
