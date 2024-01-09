export interface Location {
  ip: Ip;
  city: City;
  country: Country;
  continent: Continent;
  capitals: any[][];
  languages: any[][];
  tlds: string[];
  airport: Airport;
  coordinates: Coordinates;
  timezone: string;
}

export interface Ip {
  address: string;
  v4: string;
  v6: string;
}

export interface City {
  name: string;
  postalCode: string;
  metroCode: any;
  alpha2: any;
  alpha3: any;
  numeric: any;
}

export interface Country {
  name: string;
  flag: string;
  phones: any[];
  alpha2: string;
  alpha3: string;
  numeric: string;
  currencies: any[];
  eeaMember: boolean;
  euMember: boolean;
}

export interface Continent {
  name: string;
}

export interface Airport {
  iata: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}
