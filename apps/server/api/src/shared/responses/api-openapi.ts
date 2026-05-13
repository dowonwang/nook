import { z } from 'zod';

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeJsonSchemaForOpenApi30(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeJsonSchemaForOpenApi30);
  }

  if (!isJsonObject(value)) {
    return value;
  }

  const output: JsonObject = {};

  for (const [key, childValue] of Object.entries(value)) {
    if (key === '$schema') {
      continue;
    }

    if (key === 'const') {
      output.enum = [childValue];
      continue;
    }

    if (key === 'type' && childValue === 'null') {
      output.nullable = true;
      continue;
    }

    output[key] = normalizeJsonSchemaForOpenApi30(childValue);
  }

  return output;
}

export function zodToOpenApiSchema(schema: z.ZodType) {
  return normalizeJsonSchemaForOpenApi30(z.toJSONSchema(schema));
}
