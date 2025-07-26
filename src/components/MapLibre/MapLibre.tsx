import { MapView } from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";

export const MapLibre = () => {
  return <MapView style={styles.map} />;
};

const styles = StyleSheet.create({
  map: { flex: 1 },
});
