export type CollectionModel<Key extends string | number, Value> = {
    order: Key[],
    entities: Record<Key, Value>
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
    order: [],
    entities: {}
});