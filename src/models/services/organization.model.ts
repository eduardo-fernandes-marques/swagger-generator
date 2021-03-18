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
