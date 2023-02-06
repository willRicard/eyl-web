import { Component } from '@angular/core';
import { arrayDailyNeeds } from 'src/app/classes/seuils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  nutritionValues = {
    'Dietary Fiber': '0.0 g', 
    'Sugars': '25.0 g',
    'Protein': '1.0 g',
    'Soluble Fiber': '1.0 g', 
    'Monounsaturated Fat': '0.0 g', 
    'Polyunsaturated Fat': '0.0 g', 
    'Trans Fat': '0.0 g' 
  };
  nutritionArray = Object.entries(this.nutritionValues).map(([key, value]) => ({ key, value }));
  nutritionUnits: { [id: string]: number; }[] = [];
  dailyNeeds: { [id: string]: number; }[] = [];
  progressUnits: number[] = [];
  progress = 30;

  constructor() {
    let obj: { [id: string]: number; } = {};

    this.nutritionArray.map((item) => {
      obj = {};
      obj[item.key] = parseFloat(item.value);
      this.nutritionUnits.push(obj);
    })

    arrayDailyNeeds.map((item) => {
      obj = {};
      obj[item.key] = parseFloat(item.value);
      this.dailyNeeds.push(obj);
    })

    this.nutritionUnits.map((item) => {
      let nutriFact = this.dailyNeeds.find((nutriFact) => Object.keys(nutriFact)[0] == Object.keys(item)[0]);
      if (nutriFact)
        this.progressUnits.push(Object.values(item)[0] / Object.values(nutriFact)[0] * 100)
    })
  }

  replaceNutriFacts(facts: any) {
    this.nutritionValues = JSON.parse(facts);
    console.log(this.nutritionValues);
    this.nutritionArray = Object.entries(this.nutritionValues).map(([key, value]) => ({ key, value }));
    console.log('Array: ', this.nutritionArray);
    this.progressUnits = [];
    this.nutritionArray.map((item) => {
      let nutriFact = this.dailyNeeds.find((nutriFact) => Object.keys(nutriFact)[0] == item.key);
      if (nutriFact && item) {
        this.progressUnits.push((parseFloat(item.value) / Object.values(nutriFact)[0] * 100));
      };
      console.log('Item: ', parseFloat(item.value))
      console.log('nutriFact: ', nutriFact)
      if (nutriFact)
        console.log('nutriFact Value: ', Object.values(nutriFact)[0])
    })
    this.progress = this.average(this.progressUnits, this.progressUnits.length);
    console.log(this.nutritionArray)
  }

  average(a: number[], n: number): number
  {
    // Find sum of array element
    let sum = 0;
    for (let i=0; i<n; i++)
       sum += a[i];
 
    return sum/n;
  }

}


