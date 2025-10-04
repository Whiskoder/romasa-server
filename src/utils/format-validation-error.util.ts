import { ValidationError } from 'class-validator';

function formatValidationError(error: ValidationError): string[] {
  const messages: string[] = [];

  if (error.constraints) messages.push(...Object.values(error.constraints));

  if (error.children && error.children.length > 0)
    error.children.forEach((childError) => {
      messages.push(...formatValidationError(childError));
    });

  return messages;
}

export default formatValidationError;
