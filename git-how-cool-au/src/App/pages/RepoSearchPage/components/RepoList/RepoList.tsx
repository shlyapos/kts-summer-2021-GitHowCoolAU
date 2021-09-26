import React from 'react';

import RepoTile from '@components/RepoTile';
import SearchButton from '@components/SearchButton';
import SearchIcon from '@components/SearchIcon';
import SearchInput from '@components/SearchInput';
import { useRepoListContext } from '@config/contexts/RepoListContext';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './RepoList.module.scss';

type RepoListProps = {
    inputValue: string,
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    searchOnClick: () => void,
    tileOnClick: (ownerLogin: string, repoName: string) => void
};

const RepoList: React.FC<RepoListProps> = ({ inputValue, onChangeInput, searchOnClick, tileOnClick }) => {
    const {repoListStore} = useRepoListContext();

    return(
        <div className={styles.repo_search_list}>
            <SearchInput value={inputValue} placeholder="Введите автора или организацию" onChange={onChangeInput} />

            <SearchButton 
                isDisabled={repoListStore ? repoListStore.meta === 'loading' : true} 
                onClick={searchOnClick}>
                    <SearchIcon />
            </SearchButton>

            {repoListStore && !!repoListStore?.list.length &&
                <InfiniteScroll
                    loader={false}
                    next={searchOnClick}
                    className={styles.repo_list}
                    hasMore={repoListStore && !repoListStore.isAllLoaded}
                    dataLength={repoListStore ? repoListStore.list.length : 0}
                >
                    {repoListStore && repoListStore.list.map(item => 
                        <RepoTile key={item.id} onClick={() => tileOnClick(item.owner.login, item.name)} item={item} />
                    )}
                </InfiniteScroll>
            }
        </div>
    );
};

export default observer(RepoList);