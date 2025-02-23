type DieType = {
  value: number;
};

export default function Die({ value }: DieType) {
  return <button>{value}</button>;
}
