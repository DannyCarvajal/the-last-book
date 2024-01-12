import { DIMINUTIVE_NAMES } from "./diminutiveNames.min";
import { ES_FEMALE_NAMES } from "./femaleNamesEs.min";
import { ES_MALE_NAMES } from "./maleNamesEs";
import { US_NAMES } from "./usNames.min";

export const NAMES = US_NAMES.concat(ES_FEMALE_NAMES).concat(ES_MALE_NAMES).concat(DIMINUTIVE_NAMES);
