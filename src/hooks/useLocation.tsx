import { useEffect, useState } from "react";
import { Coordinates } from "../@types/utils";
import * as Location from "expo-location";
import {
  DEFAULT_ACCURACY,
  DEFAULT_DISTANCE_INTERVAL,
  DEFAULT_TIME_INTERVAL,
} from "../constants/map";

const useLocation = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);

  // === TRIGGER USER FOREGROUND PERMISSION ================================= //
  useEffect(() => {
    (async () => {
      let { status: permission } =
        await Location.requestForegroundPermissionsAsync();

      if (permission !== "granted") {
        setError("Permissão Negada");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });
      setCoords(coords);
    })();
  }, []);

  // === WATCHES USER POSITION ============================================== //
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const watchUserLocation = async () => {
      try {
        setError(null);

        // PEGANDO POSIÇÃO INICIAL ANTES DE ASSISTIR
        const { coords: initialCoords } =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy[DEFAULT_ACCURACY],
          });
        setCoords(initialCoords);

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy[DEFAULT_ACCURACY],
            timeInterval: DEFAULT_TIME_INTERVAL,
            distanceInterval: DEFAULT_DISTANCE_INTERVAL,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setCoords({ latitude, longitude });
          }
        );
      } catch (error) {
        console.error("WatchPosition Error: ", error);
        setError(error as string);
      }
    };
    watchUserLocation();

    return () => {
      subscription?.remove();
    };
  }, [status]);

  return { status, coords };
};

export default useLocation;
