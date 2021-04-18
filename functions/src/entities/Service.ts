import {
  FirebaseDocumentDataType,
  FirebaseFirestoreTimestampType,
} from "../libs/Types";
import { NullablePartial } from "../libs/Util";

export const ServiceUnitEnum = {
  Year: "YEAR",
  Month: "MONTH",
  Day: "DAY",
} as const;

export const ServiceUnitDaysEnum = {
  Year: 365,
  Month: 30,
  Day: 1,
} as const;

export type ServiceUnitType = typeof ServiceUnitEnum[keyof typeof ServiceUnitEnum];

type ServiceBase = {
  id: string;
  userID: string;
  serviceName: string;
  planName: string;
  detail: string;
  categoryName: string[];
  unit: ServiceUnitType;
  // costPerUnitTerm: number
  costPerDay: number;
  unitTerm: number;
  currency: string;
  paymentMethod: string;
  isArchived: boolean;
  createdAt: FirebaseFirestoreTimestampType;
  updatedAt: FirebaseFirestoreTimestampType;
};

export type Service = NullablePartial<ServiceBase>;

export const buildService = (id: string, data: FirebaseDocumentDataType) => {
  const user: Service = {
    id,
    ...data,
  };

  return user;
};
