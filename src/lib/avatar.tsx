import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface AvatarProps {
  seed: string;
  variant: "botttsneutral" | "initials";
}

export const generateAvatarUri = ({ seed, variant }: AvatarProps) => {
  let avatar;

  if (variant === "botttsneutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
  }

  return avatar.toDataUri();
};
