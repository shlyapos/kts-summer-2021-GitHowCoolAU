import React from "react";

import "./RepoBranchesDrawer.css";

import Avatar from "@components/Avatar";
import { RepoItemProps } from "@components/RepoItem";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { Drawer } from "antd";
import 'antd/dist/antd.css';

export type RepoBranchesDrawerProps = {
    selectedRepo: RepoItemProps,
    onClose: () => void
};

type RepoBranchListItem = {
    id: number,
    data: any
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ selectedRepo, onClose }) => {
    const [branchList, setBranchList] = React.useState<null | RepoBranchListItem[]>(null);

    const getFetchBranches = async () => {
        const response: ApiResponse<any, any> = await gitHubApp.getRepoBranches(selectedRepo.author, selectedRepo.name);

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
        getFetchBranches();
    }, []);

    return (
        <Drawer title={selectedRepo.name} placement="right" onClose={onClose} visible={true}>
            <h2 className="text-header">Owner</h2>
            <div className="drawer-branch-owner">
                {selectedRepo.avatarUrl ?
                    <Avatar src={selectedRepo.avatarUrl} letter={selectedRepo.author[0]} alt={selectedRepo.author} /> :
                    <Avatar letter={selectedRepo.author[0]} />
                }
                <h3>{selectedRepo.author}</h3>
            </div>

            <h2 className="text-header">Branches</h2>
            <div className="drawer-branch-list">
                {branchList && branchList.map(item => <p key={item.id}>{item.data.name}</p>)}
            </div>
        </Drawer>
    );
};

export default RepoBranchesDrawer;