import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
