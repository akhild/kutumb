import { persons, relations } from "@/constants/dummy";
import { usePersonIds } from "@/store/hooks";
import { setPersons } from "@/store/personslice";
import { setRelations } from "@/store/relationslice";
import { useDispatch } from "@/store/store";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Custom Component to set Redux store on mount.
 * This is the place to handle errors on fetch call
 * or on async store data access
 * 
 * Using Persistacne with AsyncStorage, will load some store
 * If that store is empty, this class is used to make the basic
 * user profile, basically create the logged in user first, and load the view
 * 
 * @param children - Actual component to load on success
 */

const EmptyStoreInitializer = ({ children }: { children: ReactNode }) => {
  // Uses the logic to load stored data, and initialize redux store
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, _setError] = useState<string | null>(null);

  const ids = usePersonIds();

  useEffect(() => {

    if (ids.length === 0) {
      dispatch(setPersons({ byId: persons }));
      dispatch(setRelations({ byId: relations }));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (error) return <View style={styles.home}><Text>Error loading application: {error}</Text></View>;
  if (isLoading) return <View style={styles.home}><Text>Loading application state...</Text></View>;

  return <>{children}</>;
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});


export default EmptyStoreInitializer;