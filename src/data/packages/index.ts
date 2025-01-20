import { worldwidePackages } from './worldwide';
import { usaPackages } from './geo/usa';
import { ukPackages } from './geo/uk';
import { australiaPackages } from './geo/australia';
import { brazilPackages } from './geo/brazil';
import { francePackages } from './geo/france';
import { germanyPackages } from './geo/germany';
import { indiaPackages } from './geo/india';
import { italyPackages } from './geo/italy';
import { japanPackages } from './geo/japan';
import { netherlandsPackages } from './geo/netherlands';
import { polandPackages } from './geo/poland';
import { turkeyPackages } from './geo/turkey';
import { spainPackages } from './geo/spain';
import { southAfricaPackages } from './geo/south-africa';

export const allPackages = [
  ...worldwidePackages,
  ...usaPackages,
  ...ukPackages,
  ...australiaPackages,
  ...brazilPackages,
  ...francePackages,
  ...germanyPackages,
  ...indiaPackages,
  ...italyPackages,
  ...japanPackages,
  ...netherlandsPackages,
  ...polandPackages,
  ...turkeyPackages,
  ...spainPackages,
  ...southAfricaPackages
];
