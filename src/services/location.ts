import { type User } from "@/models/user";
import { type Location } from "@/types/geolocation";

const defaultLocation = {
  ip: "",
  location: {
    flag: "🇨🇴",
    country: "Colombia",
    city: "",
  },
};

/* Get location of user using `geolocation microlink` it uses the public ip */
export const getLocationData = async (): Promise<Pick<User, "ip" | "location">> => {
  try {
    const location = await fetch("https://geolocation.microlink.io/");
    const response: Location = await location.json();

    return {
      ip: response.ip.address,
      location: {
        flag: response.country.flag,
        country: response.country.name,
        city: response.city.name,
      },
    };
  } catch (error) {
    console.error(error);

    return defaultLocation;
  }
};
