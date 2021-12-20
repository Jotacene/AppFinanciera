import { Component, OnInit } from '@angular/core';
import { IndicadoresService} from '../services/indicadores.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  indicadores: any[] = []
  fecha!: Date
  loader: boolean = true;
  constructor(private _indicadoresService: IndicadoresService) { }

  ngOnInit(): void {
    this.obtenerIndicadores()
  }
  obtenerIndicadores() {
      
    this._indicadoresService.getIndicadores().subscribe(data => {
      this.fecha = data.fecha.split('T')[0]
      delete data.version
      delete data.autor
      delete data.fecha
      this.indicadores = Object.entries(data)
      this.loader = false
    })
  }
}
