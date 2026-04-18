export interface ShipmentParams {
  itemType: string;
  weight: number;
  cargoValue: number;
  sensitivity: number;
  isHazardous: boolean;
  priority: string;
  originCity: string;
  originCountry: string;
  originHub: any;
  destCity: string;
  destCountry: string;
  destHub: any;
  deliveryDeadline: string;
}
