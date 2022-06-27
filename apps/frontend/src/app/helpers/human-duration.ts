import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts';

const service = new HumanizeDuration(new HumanizeDurationLanguage());

export function readableDuration(ms: number) {
  return service.humanize(ms);
}
