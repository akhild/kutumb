import { AppColors, Colors } from "@/constants/theme";
import { usePerson } from "@/store/hooks";
import { TPersonId } from "@/types/model";
import { StyleSheet, useColorScheme, View } from "react-native";
import AnimatedBackground from "./AnimatedBackground";
import PersonCardMedium from "./PersonCardMedium";
import { TouchableRelationCard } from "./RelationCard";

const PersonCardMain = ({ id, active }: { id: TPersonId, active: boolean }) => {
  const person = usePerson(id);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);

  if (!person) return;

  return <AnimatedBackground active={active} style={styles.item}>
    <View style={styles.parent}><>
      {person.up.map((id) => {
        return <TouchableRelationCard callerid={person._id} relationid={id} key={id} />
      })}
    </>
    </View>

    <View style={styles.self}>
      <PersonCardMedium person={person} buttons={true} />
    </View>

    <View style={styles.spouse_children}>
      <View style={styles.partner}>
        {person.side.map((id) => {
          return <TouchableRelationCard callerid={person._id} relationid={id} key={id} />
        })}
      </View>
      <View style={styles.children}>
        {person.down.map((id) => {
          return <TouchableRelationCard callerid={person._id} relationid={id} key={id} />
        })}
      </View>
    </View>
  </AnimatedBackground>
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "23%",
  },
  self: {
    flex: 2,
    backgroundColor: colors.pastel_bg,
    width: "48%",
  },
  spouse_children: {
    flex: 1,
    flexDirection: "column",
    width: "23%",
  },
  partner: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
  children: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: 'wrap',
  },
});

export default PersonCardMain;