export const seuils = {
    'Dietary Fiber': '10.0 g', 
    'Sugars': '100.0 g',
    'Soluble Fiber': '40.0 g', 
    'Monounsaturated Fat': '5 g', 
    'Polyunsaturated Fat': '9 g', 
    'Trans Fat': '10.0 g', 
    'Other Carbohydrate': '120.0 g',
    'Sodium': '0.1 g'
  };

export const seuilsArray = Object.entries(seuils).map(([key, value]) => ({ key, value }));