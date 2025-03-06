import { SetMetadata } from '@nestjs/common';

export const IsPublicKey = 'isPublic';
export const IsPublic = () => SetMetadata(IsPublicKey, true);
