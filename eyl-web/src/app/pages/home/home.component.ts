import { Component } from '@angular/core';
import { seuilsArray } from 'src/app/classes/seuils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nutritionValues = {
    'Dietary Fiber': '2.0 g', 
    'Sugars': '9.0 g',
    'Soluble Fiber': '1.0 g', 
    'Monounsaturated Fat': '0.5 g', 
    'Polyunsaturated Fat': '0.5 g', 
    'Trans Fat': '0.0 g', 
    'Other Carbohydrate': '11.0 g'
  };

  nutritionArray = Object.entries(this.nutritionValues).map(([key, value]) => ({ key, value }));
  nutritionUnits: number[] = [];
  progressUnits: number[] = [];
  progress = 30;

  constructor() {
    this.nutritionArray.map((item) => {
      this.nutritionUnits.push(parseFloat(item.value))
    })

    seuilsArray.map((item) => {
      this.progressUnits.push(this.nutritionUnits[seuilsArray.indexOf(item)] / parseFloat(item.value) * 100)
    })
  }


}
