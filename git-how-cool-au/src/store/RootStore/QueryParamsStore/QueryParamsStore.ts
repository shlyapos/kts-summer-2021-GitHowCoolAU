import { action, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  private _location: any = {};
  private _history: any = {};

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParams(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setParams(key: string, value: string) {
    const nextParams = { ...this._params, [key]: value };
    const nextSearch = qs.stringify(nextParams);

    this._history.replace({
      ...this._location,
      search: nextSearch,
    });
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setHistory(history: any, location: any) {
    this._history = history;
    this._location = location;
  }
}
