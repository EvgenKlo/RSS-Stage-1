import { checkElement } from './check_element';

export function getLevelNubmer (): number {
  const selectLevel = checkElement<HTMLDivElement>('.game-level_active');
  const level = Number(selectLevel.id);
  return level;
}
