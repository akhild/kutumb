// Based on TRelationType, give the names from -> to and to -> from

import { TGender, TRelationDirection, TRelationType } from "@/types/model";

// TRelationSubType needs expansion here
export const relation_name: Record<TRelationType,
  Record<TRelationDirection,
    Record<TGender, string>
  >
> = {
  parent_child: {
    to: { male: "son", female: "daughter", na: "child" },
    from: { male: "father", female: "mother", na: "parent" },
  },
  partner: {
    to: { male: "husband", female: "wife", na: "child" },
    from: { male: "husband", female: "wife", na: "child" },
  }
};