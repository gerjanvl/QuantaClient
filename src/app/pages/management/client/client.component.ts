import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  deviceId: string;

  constructor(private route: ActivatedRoute, private router: Router) {

   }

   handleError(error) {
      alert(JSON.stringify(error));
      this.router.navigate(['/']);
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deviceId = params["id"];
    })
  }

}
