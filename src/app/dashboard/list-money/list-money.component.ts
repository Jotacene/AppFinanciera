import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadoresService } from '../../services/indicadores.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-list-money',
  templateUrl: './list-money.component.html',
  styleUrls: ['./list-money.component.css']
})
export class ListMoneyComponent implements OnInit {
  highcharts = Highcharts;
  displayedColumns: string[] = ['fecha', 'valor'];
  tipo!: any;
  datosIndicador!: any;
  valorActual: number = 0;
  informacionIndicador!: any;


  chartOptions: Highcharts.Options = {
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Valor en pesos"
      }
    },
    series: [{
      data: [],
      type: 'line'
    }]
  }
  chartOptions1 = {
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Valor en pesos"
      }
    },
    series: [{
      name: 'Valor',
      data: [],
      type: 'line'
    }]
  }

  constructor(private aRouter: ActivatedRoute, private _indicadoresService: IndicadoresService) {
    this.tipo = this.aRouter.snapshot.paramMap.get('tipo')
  }

  ngOnInit(): void {
    this.getIndicador()
  }

  getIndicador() {
    this._indicadoresService.getIndicador(this.tipo).subscribe(data => {
      this.informacionIndicador = data
      this.datosIndicador = data.serie.slice(0,10)
      let datos: any = []
      let fechas: any = []
      this.datosIndicador.forEach((d:any) => {
        datos.push(d.valor)
        fechas.push(d.fecha.split("T")[0])
      })
      this.chartOptions1.title.text = 'Valor actual:' + (this.informacionIndicador.unidad_medida === 'Porcentaje' ?  this.datosIndicador[0].valor.toString() + ' %' : '$' + this.datosIndicador[0].valor.toString())
      this.chartOptions1.yAxis.title.text = 'Valor en ' + this.informacionIndicador.unidad_medida
      this.chartOptions1.xAxis.categories = fechas
      this.chartOptions1.series[0].data = datos
      this.chartOptions = JSON.parse(JSON.stringify(this.chartOptions1));
    })

  }

}
