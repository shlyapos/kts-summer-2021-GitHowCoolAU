import React, { useState } from "react";

import ErrorWindow from "@components/ErrorWindow";
import Loader from "@components/Loader";
import LoadIcon from "@components/LoadIcon";
import RepoBranchesStore from "@store/RepoBranchesStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
import 'antd/dist/antd.css';
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

import styles from "./RepoBranchesDrawer.module.scss";
import { RepoBranchesDrawerProps } from "./types";

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ visible, onClose }) => {
    const repoBranchStore = useLocalStore(() => new RepoBranchesStore());

    const [isVisible, setIsVisible] = useState(visible);
    const { owner, name } = useParams<{ owner: string, name: string }>();

    const onCloseDrawer = React.useCallback(() => {
        repoBranchStore.destroy();
        setIsVisible(false);
        onClose();
    }, [onClose, repoBranchStore]);

    React.useEffect(() => {
        if (owner && name) {
            repoBranchStore.updateBranchList({
                owner: owner,
                repo: name
            });

            setIsVisible(true);
        }
    }, [owner, name, repoBranchStore])

    return (
        <div>
            {repoBranchStore.meta === Meta.error ? <ErrorWindow /> :
                <Drawer 
                    title={name} 
                    visible={isVisible} 
                    onClose={onCloseDrawer} 
                    placement={"left"}
                >
                    {repoBranchStore.meta === Meta.loading && <Loader classStyle={styles.loader}><LoadIcon size={24}/></Loader>}
                    
                    <h2 className={styles.text_header}>Branches</h2>
                    <div className={styles.branch_list}>
                        {repoBranchStore.list.map((item, index) => <p key={index}>{item.name}</p>)}
                    </div>
                </Drawer>
            }
        </div>
    );
};

export default observer(RepoBranchesDrawer);