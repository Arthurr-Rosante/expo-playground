export type User = {
  id?: string;
  name: string;
  email: string;
  biography: string;
  pfp: string;

  preferences: {
    mapStyle: string;
    pointOfInterestStyle: string;
    avatarOverProfile: boolean;
    avatarStyle: {
      head: string;
      torso: string;
      leg: string;
      bag: string;
      accessory: string;
    };
  };
  unlockedStyles: {
    unlockedMapStyles: string;
    unlockedPointOfInterestStyles: string;
    unlockedHeadStyles: string;
    unlockedTorsoStyles: string;
    unlockedLegStyles: string;
    unlockedBagStyles: string;
    unlockedAcessoryStyles: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
