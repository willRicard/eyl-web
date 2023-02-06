export const rawDailyNeeds = {
    'Dietary Fiber': '10.0 g', 
    'Sugars': '100.0 g',
    'Protein': '100.0 g',
    'Soluble Fiber': '40.0 g', 
    'Monounsaturated Fat': '5 g', 
    'Polyunsaturated Fat': '9 g', 
    'Trans Fat': '10.0 g', 
    'Other Carbohydrate': '12 g',
    'Carbohydrate': '20 g',
    'Saturated Fat': '16.6 g',
    'Fibres': '25.0 g',
    'Sodium': '2300 mg',
    'Calcium': '1000 mg'
  };

export const arrayDailyNeeds = Object.entries(rawDailyNeeds).map(([key, value]) => ({ key, value }));