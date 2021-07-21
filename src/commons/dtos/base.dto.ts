import { classToClass, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export abstract class BaseDto {
  public static factory<T, R>(
    ResponseDto: ClassType<T>,
    plainTResponseData: R,
  ): T {
    const updatedResponseData = plainToClass<T, R>(
      ResponseDto,
      plainTResponseData,
      {
        ignoreDecorators: true,
      },
    );

    return classToClass(updatedResponseData, { excludeExtraneousValues: true });
  }
}
