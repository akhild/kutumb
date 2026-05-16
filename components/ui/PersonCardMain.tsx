import { AppColors, Colors } from "@/constants/theme";
import { usePerson } from "@/store/hooks";
import { TPersonId } from "@/types/model";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import RelationCard from "./RelationCard";

const PersonCardMain = ({ id }: { id: TPersonId }) => {
  const person = usePerson(id);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);

  if (!person) return;

  return <View style={styles.item}>
    <View style={styles.parent}><>
      {person.up.map((id) => {
        return <RelationCard callerid={person._id} relationid={id} key={id} />
      })}
    </>
    </View>

    <View style={styles.self}>
      <Text>{person.firstName} {person.lastName}</Text>
    </View>

    <View style={styles.spouse_children}>
      <View style={styles.partner}>
        {person.side.map((id) => {
          return <RelationCard callerid={person._id} relationid={id} key={id} />
        })}
      </View>
      <View style={styles.children}>
        {person.down.map((id) => {
          return <RelationCard callerid={person._id} relationid={id} key={id} />
        })}
      </View>
    </View>
  </View>
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
  },
  parent: {
    flex: 1,
    backgroundColor: colors.pastel_delta,
    width: "25%",
  },
  self: {
    flex: 2,
    backgroundColor: colors.pastel_bg,
    width: "50%",
  },
  spouse_children: {
    flex: 1,
    backgroundColor: colors.pastel_gamma,
    width: "25%",
  },
  partner: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.pastel_female,
  },
  children: {
    backgroundColor: colors.pastel_beta,
  },
});

export default PersonCardMain;