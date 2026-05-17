import { RootState } from "@/store/store";

export const checkPersonSanity = (person: RootState["newperson"]) => {
  if (person.firstName.length === 0) {
    return "Please enter a valid name";
  }

  if (person.birth.date && person.death.date && person.birth.date > person.death.date) {
    return "Incorrect Death or Birth date";
  }

  return true;
}