import {
  GitHubRepoItemApi,
  GitHubRepoItemModel,
  normalizeGitHubRepoItem,
} from "store/models/GitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
} from "store/models/shared/collection";
import rootStore from "store/RootStore";
import {
  ApiResponse,
  HTTPMethod,
  ResponseError,
} from "store/RootStore/ApiStore";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { GitHubGetRepoParams } from "./types";

type PrivateFields = "_list" | "_meta" | "_isAllLoaded";

export default class ReposListStore implements ILocalStore {
  private _list: CollectionModel<number, GitHubRepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  private _page: number = 1;
  private readonly _perPage: number = 10;
  private _isAllLoaded: boolean = false;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _list: observable.ref,
      _isAllLoaded: observable,
      _meta: observable,

      list: computed,
      isAllLoaded: computed,

      updateList: action,
      reset: action,
    });
  }

  get list(): GitHubRepoItemModel[] {
    return this._list.order.map((id) => this._list.entities[id]);
  }

  get isAllLoaded(): boolean {
    return this._isAllLoaded;
  }

  get meta(): Meta {
    return this._meta;
  }

  async updateList(params: GitHubGetRepoParams): Promise<void> {
    this._meta = Meta.loading;

    const response: ApiResponse<GitHubRepoItemApi[], ResponseError> =
      await rootStore.apiRequest({
        method: HTTPMethod.get,
        endpoint: `users/${params.login}/repos?page=${this._page}&per_page=${this._perPage}`,
        headers: { "Content-Type": "application/json" },
        data: {},
      });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        return;
      }

      if (!response.data.length) {
        this._isAllLoaded = true;
        this._meta = Meta.success;

        return;
      }

      try {
        const tempList = { ...this._list };

        for (const item of response.data) {
          tempList.order.push(item.id);
          tempList.entities[item.id] = normalizeGitHubRepoItem(item);
        }

        this._list = tempList;
        this._page++;
        this._meta = Meta.success;

        return;
      } catch (err) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParams("search"),
    (search) => {
      // console.log(search);
    }
  );

  reset(): void {
    this._list = getInitialCollectionModel();
    this._page = 1;
    this._isAllLoaded = false;

    this._qpReaction();
  }

  destroy(): void {
    this.reset();
  }
}
