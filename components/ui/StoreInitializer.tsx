import { persons, relations } from "@/constants/dummy";
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
 * @param children - Actual component to load on success
 */

const StoreInitializer = ({ children }: { children: ReactNode }) => {
  // Uses the logic to load stored data, and initialize redux store
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, _setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setPersons({ byId: persons }));
    dispatch(setRelations({ byId: relations }));
    setIsLoading(false);
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


export default StoreInitializer;