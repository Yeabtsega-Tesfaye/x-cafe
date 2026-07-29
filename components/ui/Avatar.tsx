import Image from "next/image";

type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
};

export default function Avatar({
  src,
  alt = "Avatar",
  name = "User",
  size = "md",
}: AvatarProps) {
  const sizeClass = {
    sm: "avatar-sm",
    md: "avatar-md",
    lg: "avatar-lg",
  };

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`avatar ${sizeClass[size]}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="avatar-image"
        />
      ) : (
        initials
      )}
    </div>
  );
}