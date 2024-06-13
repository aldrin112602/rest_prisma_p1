const validateFields = (fields: Record<string, any>): string | null => {
    for (const [key, value] of Object.entries(fields))
        if (!value) return `${key} is required`;
    return null;
  };

  export default validateFields;