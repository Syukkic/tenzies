import { DieType } from './dice.types';

interface Props extends DieType {
  click: () => void;
}

export default function Die({ value, isHeld, click }: Props) {
  const style = { backgroundColor: isHeld ? '#59E391' : 'white' };

  return (
    <button style={style} onClick={click}>
      {value}
    </button>
  );
}
