import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-basic-list",
  templateUrl: "./basic-list.component.html",
  styleUrls: ["./basic-list.component.scss"]
})
export class BasicListComponent implements OnInit {
  @Input()
  items: any[];
  @Input()
  columns: any[];
  @Output()
  onRowClick = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
