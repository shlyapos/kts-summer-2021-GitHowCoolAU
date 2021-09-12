import React from "react";

import Avatar from "@components/Avatar";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { Drawer } from "antd";
import 'antd/dist/antd.css';
import { useParams } from "react-router";

import styles from "./RepoBranchesDrawer.module.scss";

export type RepoBranchesDrawerProps = {
    onClose: () => void
};

type RepoBranchListItem = {
    id: number,
    data: any
};

type RepoOwnerInformation = {
    login: string,
    url: string,
    avatarUrl: string
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
    // States
    const [ownerInfo, setOwner] = React.useState<null | RepoOwnerInformation>(null);
    const [branchList, setBranchList] = React.useState<null | RepoBranchListItem[]>(null);

    // Params
    const { owner, name } = useParams<{ owner: string, name: string }>();

    const fetchRepoOwner = async (owner: string): Promise<void> => {
        const response: ApiResponse<any, any> = await gitHubApp.getUser(owner);

        if (response.success) {
            const userInfo: RepoOwnerInformation = {
                login: response.data.login,
                url: response.data.html_url,
                avatarUrl: response.data.avatar_url
            };

            setOwner(userInfo);
        }
    }

    const fetchRepoBranches = async (owner: string, name: string) => {
        const response: ApiResponse<any, any> = await gitHubApp.getRepoBranches(owner, name);

        if (response.success) {
            const newBranchList: RepoBranchListItem[] = [];
            let key: number = 0;

            for (let branch of response.data) {
                newBranchList.push({
                    id: key++,
                    data: branch
                });
            }

            setBranchList(newBranchList);
        }
    };

    React.useEffect(() => {
        fetchRepoOwner(owner);
        fetchRepoBranches(owner, name);
    }, []);

    return (
        <Drawer title={name} placement="right" onClose={onClose} visible={true}>
            <h2 className={`${styles.text_header}`}>Owner</h2>
            {ownerInfo &&
                <div className={`${styles.drawer_branch_owner}`}>
                    {ownerInfo.avatarUrl ?
                        <Avatar src={ownerInfo.avatarUrl} letter={ownerInfo.login[0]} alt={ownerInfo.login} /> :
                        <Avatar letter={ownerInfo.login[0]} />
                    }
                    <div className={`${styles.org_link}`}>
                        <a className={`${styles.text} ${styles.org_link__item}`} href={ownerInfo.url} target="_blank" rel="noreferrer">{ownerInfo.login}</a>
                    </div>
                </div>
            }

            <h2 className={`${styles.text_header}`}>Branches</h2>
            <div className={`${styles.drawer_branch_list}`}>
                {branchList && branchList.map(item => <p key={item.id}>{item.data.name}</p>)}
            </div>
        </Drawer>
    );
};

export default RepoBranchesDrawer;