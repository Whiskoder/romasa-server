/**
        const where: Record<string, any> = {};
    for (const [field, rawValue] of Object.entries(filterFields)) {
      if (!isObject(rawValue)) continue;

      const filterInstance = plainToInstance(FilterOperationDto, rawValue);
      const filterErrors = await validate(filterInstance);

      if (filterErrors.length > 0)
        throw new BadRequestException(
          filterErrors.map((e) => formatValidationError(e)),
        );

      for (const [operator, value] of Object.entries(filterInstance)) {
        if (value === undefined) continue;

        let searchCondition;
        switch (operator) {
          case 'eq':
            searchCondition = Equal(value);
            break;
          case 'like':
            searchCondition = Like(value);
            break;
          case 'ilike':
            searchCondition = ILike(value);
            break;
          case 'gt':
            searchCondition = MoreThan(value);
            break;
          case 'lt':
            searchCondition = LessThan(value);
            break;
          default:
            break;
        }

        if (!searchCondition)
          throw new BadRequestException(`unsupported_operator_in[${field}]`);

        if (where[field])
          throw new BadRequestException(
            'unsupported_multiple_searco_for_same_field',
          );

        where[field] = searchCondition;
      }
    }*/
