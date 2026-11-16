import { z } from 'zod';

export const MultiLanguageStringSchema = z.object({
  'en': z.string(),
  'ja': z.string(),
});
