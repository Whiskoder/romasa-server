import { ServiceRequest } from 'src/service-requests/domain';
import { Pagination } from 'src/core/interfaces';
import { NullableType } from 'src/core/types';

export abstract class ServiceRequestRepository {
  abstract create(
    data: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ServiceRequest>;

  abstract findAll(
    count: true,
  ): Promise<{ serviceRequests: ServiceRequest[]; total: number }>;
  abstract findAll(count?: false): Promise<ServiceRequest[]>;

  abstract findAll(
    count?: boolean,
  ): Promise<
    ServiceRequest[] | { serviceRequests: ServiceRequest[]; total: number }
  >;

  abstract findAllByRequester(
    pagination?: Pagination<ServiceRequest>,
    count?: boolean,
  ): Promise<ServiceRequest[]>;

  abstract findAllByCreatedBy(count?: boolean): Promise<ServiceRequest[]>;

  abstract findById(
    serviceRequestId: string,
  ): Promise<NullableType<ServiceRequest>>;
}
