import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(private service:TodoService){}

ngOnInit()
{

}
}
