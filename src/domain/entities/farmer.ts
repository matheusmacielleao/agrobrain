export interface Farmer {
  documentNumber: string;
  name: string;
  ruralProperty: Farm[];
}

export interface Farm {
  id: number;
  name: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  utilAreaHectares: number;
  vegetationAreaHectares: number;
  harvests: Harvest[];
}

export interface Harvest {
  year: number;
  farmAreaHectares: number;
  crops: HarvestCrop[];
}

export interface HarvestCrop {
  crop: string;
  plantedAreaHectares: number;
}
