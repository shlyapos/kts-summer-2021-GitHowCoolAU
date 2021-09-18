import React from "react";

import "./RepoBranchesDrawer.css";

import Avatar from "@components/Avatar";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { Drawer } from "antd";

import 'antd/dist/antd.css';
import { RepoBranchesDrawerProps, RepoBranchesResponseError, RepoBranchesResponseSuccess, RepoBranchListItem } from "./types";

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ visible, chosenRepo, onClose }) => {
    const [branchList, setBranchList] = React.useState<null | RepoBranchListItem[]>(null);

    React.useEffect(() => {
        const fetchBranches = async (owner: string, repo: string) => {
            if (chosenRepo !== null) {
                const response: ApiResponse<RepoBranchesResponseSuccess[], RepoBranchesResponseError> = await gitHubApp.getRepoBranches(owner, repo);
    
                if (response.success) {
                    const newBranchList: RepoBranchListItem[] = [];
    
                    response.data.map((item, index) => newBranchList.push({ id: index, name: item.name}))
                    setBranchList(newBranchList);
                }
            }
        };

        chosenRepo !== null && fetchBranches(chosenRepo?.owner, chosenRepo?.name);
    }, [chosenRepo]);

    return (
        <Drawer title={chosenRepo?.name} placement="right" onClose={onClose} visible={visible}>
            {chosenRepo !== null && <div>
                <h2 className="text-header">Owner</h2>
                <div className="drawer-branch-owner">
                    <Avatar src={chosenRepo?.avatarUrl} letter={(chosenRepo?.owner[0]) && chosenRepo?.owner[0]} alt={chosenRepo?.owner} />
                    <h3>{chosenRepo?.owner}</h3>
                </div>
                
                <h2 className="text-header">Branches</h2>
                <div className="drawer-branch-list">
                    {branchList && branchList.map(item => <p key={item.id}>{item.name}</p>)}
                </div>
            </div>}
        </Drawer>
    );
};

export default React.memo(RepoBranchesDrawer);