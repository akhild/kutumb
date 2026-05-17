

export type TGender = "male" | "female" | "na";
/**
 * All Date type are stored as numbers for easy redux store serialization
 */
export type TBirthData = {
  date?: number;
  place?: string | null;
};
export type TDeathData = {
  date?: number;
  place?: string;
};
export type TMetadata = {
  createdBy?: string; // _id from Person collection
  updatedBy?: string | null; // _id from Person collection
  auditedBy?: string | null; // _id from Person collection, mostly same as createdBy, or someone with authority
  createdAt: number;
  updatedAt: number;
};
export type TMedia = {
  url: string;
  primary: boolean;
};

export type TPersonId = string;
export type TPerson = {
  _id: TPersonId;
  metadata: TMetadata;

  firstName: string;
  middleName: string;
  lastName: string;

  gender: TGender;
  birth: TBirthData
  death: TDeathData;

  photos: TMedia[];
  bio: string;
  [key: string]: string | TMedia[] | TBirthData | TDeathData | TMetadata; // To Allow dynamic indexing
};

export type TRelationType = "parent_child" | "partner";
export type TRelationSubType = "biological" | "foster" | "guardian" | "adoptive" | "step" | "mentor" | "caregiver" |
  "spouse" | "casual";
export type TRelationDirection = "from" | "to";

export type TRelationId = string;
export type TRelation = {
  _id: TRelationId;
  from: string;
  to: string;

  type: TRelationType;
  roles: TRelationSubType;

  startDate: number | null;   // for a parent: transfer date, partner: marriage/first date
  endDate: number | null;
  status: "active" | "inactive";    // for a spouse: inactive is same as divorced

  notes: string;
  metadata: TMetadata;
};

export type TPersonCompiled = TPerson & {
  up: TRelationId[];     // parents
  down: TRelationId[];   // children
  side: TRelationId[];   // partners
};

export type TPersonCompute = TPersonCompiled & {
  // This type is used to compute DFS
};

export type TPersonMap = Record<TPersonId, TPersonCompiled>;

export type TRelationMap = Record<TRelationId, TRelation>;