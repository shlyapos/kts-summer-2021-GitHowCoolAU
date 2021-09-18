import React, { useState } from "react";

import Avatar from "@components/Avatar";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { Drawer } from "antd";
import 'antd/dist/antd.css';
import { useParams } from "react-router";

import styles from "./RepoBranchesDrawer.module.scss";
import { RepoOwner, RepoBranchesDrawerProps, ResponseError, RepoBranchesResponseSuccess, RepoBranchListItem } from "./types";

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ visible, onClose }) => {
    // States
    const [isVisible, setIsVisible] = useState(visible);
    const [repoOwner, setOwner] = React.useState<null | RepoOwner>(null);
    const [branchList, setBranchList] = React.useState<null | RepoBranchListItem[]>(null);

    const { owner, name } = useParams<{ owner: string, name: string }>();

    const onCloseHandler = () => {
        setIsVisible(false);
        onClose();
    };

    React.useEffect(() => {
        const fetchOwner = async () => {
            const response: ApiResponse<RepoOwner, ResponseError> = await gitHubApp.getUser(owner);
            if (response.success) {
                setOwner(response.data);
            }
        };

        const fetchBranches = async () => {
            const response: ApiResponse<RepoBranchesResponseSuccess[], ResponseError> = await gitHubApp.getRepoBranches(owner, name);

            if (response.success) {
                const newBranchList: RepoBranchListItem[] = [];
                response.data.map((item, index) => newBranchList.push({ id: index, name: item.name }));

                setBranchList(newBranchList);
            }
            else {
                alert(response.data.message);
            }
        };

        if (owner && name) {
            setIsVisible(true);

            fetchOwner();
            fetchBranches();
        }
        else {
            setIsVisible(false);
        }
    }, [owner, name]);

    return (
        <Drawer title={name} visible={isVisible} onClose={onCloseHandler}>
            <div>
                <h2 className={`${styles.text_header}`}>Owner</h2>
                {repoOwner &&
                    <div className={`${styles.branch_owner}`}>
                        <Avatar src={repoOwner?.avatar_url} letter={repoOwner?.login[0]} alt={owner} />
                        <a className={`${styles.org_link}`} href={repoOwner.html_url} target="_blank" rel="noreferrer">{repoOwner?.login}</a>

                        <h3 className={`${styles.owner_name}`}>{repoOwner?.name}</h3>
                    </div>
                }

                <h2 className={`${styles.text_header}`}>Branches</h2>
                <div className={`${styles.branch_list}`}>
                    {branchList && branchList.map(item => <p key={item.id}>{item.name}</p>)}
                </div>
            </div>
        </Drawer>
    );
};

export default React.memo(RepoBranchesDrawer);