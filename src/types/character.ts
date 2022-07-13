export interface Character {
  id: number;
  name: string;
  species: string;
  status: "alive" | "dead" | "unknown";
  image: string;
}
