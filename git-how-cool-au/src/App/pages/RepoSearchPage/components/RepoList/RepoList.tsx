import React from 'react';

import RepoTile from '@components/RepoTile';
import SearchButton from '@components/SearchButton';
import SearchIcon from '@components/SearchIcon';
import SearchInput from '@components/SearchInput';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useRepoListContext } from '../../RepoSearchPage';
import styles from './RepoList.module.scss';

type RepoListProps = {
    inputValue: string,
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    searchOnClick: (e: React.MouseEvent) => void,
    onScroll: () => void,
    tileOnClick: (ownerLogin: string, repoName: string) => void
};

const RepoList: React.FC<RepoListProps> = ({ inputValue, onChangeInput, searchOnClick, onScroll, tileOnClick }) => {
    const repoListContext = useRepoListContext();

    return (
        <div className={`${styles.repo_search_list}`}>
            <SearchInput value={inputValue} placeholder="Введите автора или организацию" onChange={onChangeInput} />
            <SearchButton isDisabled={repoListContext.isLoading} onClick={searchOnClick}><SearchIcon /></SearchButton>

            {repoListContext.list && repoListContext.list?.length !== 0 &&
                <InfiniteScroll
                    dataLength={repoListContext.list?.length}
                    className={`${styles.repo_list}`}
                    next={onScroll}
                    hasMore={!repoListContext.isAllLoad}
                    loader={false}
                >
                    {repoListContext.list?.map(item =>
                        <RepoTile key={item.id} onClick={(e: React.MouseEvent) => tileOnClick(item.props.owner, item.props.name)} item={item.props} />
                    )}
                </InfiniteScroll>
            }
        </div>
    );
};

export default RepoList;