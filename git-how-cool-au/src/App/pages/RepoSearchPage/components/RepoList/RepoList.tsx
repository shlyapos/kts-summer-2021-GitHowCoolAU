import React from 'react';

import RepoTile from '@components/RepoTile';
import SearchButton from '@components/SearchButton';
import SearchIcon from '@components/SearchIcon';
import SearchInput from '@components/SearchInput';
import { useRepoListContext } from '@config/contexts/RepoListContext';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './RepoList.module.scss';

type RepoListProps = {
    inputValue: string,
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    tileOnClick: (ownerLogin: string, repoName: string) => void
};

const RepoList: React.FC<RepoListProps> = ({ inputValue, onChangeInput, tileOnClick }) => {
    const repoListContext = useRepoListContext();

    return (
        <div className={styles.repo_search_list}>
            <SearchInput value={inputValue} placeholder="Введите автора или организацию" onChange={onChangeInput} />
            <SearchButton isDisabled={repoListContext.isLoading} onClick={() => repoListContext.load(inputValue)}><SearchIcon /></SearchButton>

            {repoListContext.list && repoListContext.list?.length !== 0 &&
                <InfiniteScroll
                    dataLength={repoListContext.list?.length}
                    className={styles.repo_list}
                    next={() => repoListContext.load(inputValue)}
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