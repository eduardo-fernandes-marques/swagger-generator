import { Entity as EntityService } from "./services/organization.model";

export type Entity = {
  id: string;
  code: string;
  type: string;
  parentId: string;
  child: Child[];
};

export type Child = {
  id: string;
  name: string;
};

export const mapServiceToDomain = (entityService: EntityService): Entity => ({
  id: entityService.id,
  code: entityService.code,
  type: entityService.type,
  parentId: entityService.parentId,
  child: entityService.child.map((child) => ({
    id: child.id,
    name: child.name,
  })),
});
