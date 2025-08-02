import { User } from "../@types/entities";

export const MOCK_USER: User = {
  id: "1a2b3c4d",
  email: "arrosante@gmail.com",
  name: "ViaLimao",
  pfp: "https://avatars.githubusercontent.com/u/145076571?s=400&u=c0cef73cd33954081cabdf60f5986bd639b3ec2b&v=4",
  biography: "Lorem ipsum dolor sit amet",
  preferences: {
    avatarOverProfile: true,
    avatarStyle: {
      head: "",
      torso: "",
      leg: "",
      accessory: "",
      bag: "",
    },
    mapStyle: "",
    pointOfInterestStyle: "",
  },
  unlockedStyles: {
    unlockedMapStyles: "",
    unlockedPointOfInterestStyles: "",
    unlockedHeadStyles: "",
    unlockedTorsoStyles: "",
    unlockedLegStyles: "",
    unlockedBagStyles: "",
    unlockedAcessoryStyles: "",
  },
};

export const MOCK_TOKEN = "definitely-a-valid-token";
