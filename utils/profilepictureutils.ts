import { usePersons } from "@/store/hooks";
import { TPerson } from "@/types/model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const saveBase64 = async (uri: string, base64: string | undefined) => {
  if (base64 === undefined) return;

  const fileName = uri.split('/').pop();
  if (fileName === undefined) return;

  try {
    await AsyncStorage.setItem(`@profile:${fileName}`, base64);
  } catch (e) {
    console.error("Could not save base64 image for", fileName);
  }
}

export const removeBase64 = async (uri: string, normalized: boolean) => {
  const fileName = uri.split('/').pop();
  if (fileName === undefined) return;

  try {
    const key = normalized ? fileName : `@profile:${fileName}`;
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Could not remove base64 image for", fileName);
  }
}

/**
 * Hook, to do base64 cleanup before close
 */
export const Cleanup = () => {
  const persons = usePersons();

  const localcleanup = async (all_persons: TPerson[]) => {
    // check all person, and remove profile pictures that arent in use

    // create a local set of all images
    const existing_files = new Set(all_persons.map((p) =>
      p.photos.map((pp) =>
        pp.url)).flat().map((n) =>
          n.split('/').pop()).filter(v => v !== undefined).map(key => `@profile:${key}`));

    AsyncStorage.getAllKeys((error, result) => {
      if (!result) return;
      const removables = result.filter((key) => key.startsWith('@profile:')).filter(key => !existing_files.has(key));

      console.debug("Running Cleanup", removables.join("\n"));
      removables.forEach(key => removeBase64(key, true));
    });
  }

  useEffect(() => {
    return () => {
      // cleanup on exit
      localcleanup(Object.values(persons));
    }
  }, [persons]);
}