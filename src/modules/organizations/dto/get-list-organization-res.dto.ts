import { Organization } from '@/entities';

export class GetListOrganizationResDto {
  data: Organization[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
