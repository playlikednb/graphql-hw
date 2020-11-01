import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export default class CustomQueryParseIntArrayPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (metadata.type === 'query') {
      return value.split(',').map(v => +v)
    }
    return value
  }
}
